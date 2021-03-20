import { render } from 'react-nil';
import React, { createElement, createContext, useContext, useEffect, useState, useCallback, useRef, useMemo, useLayoutEffect } from 'react';
import { MathUtils, Object3D, Quaternion } from 'three';
import create from 'zustand';
import { Box, Circle, World } from 'planck-js';
import { useFrame } from 'react-three-fiber';
import { Body, Box as Box$1, Vec3, Sphere, World as World$1 } from 'cannon-es';
import { RigidBodyDesc, ColliderDesc, Vector3, World as World$2, init } from '@dimforge/rapier3d-compat/rapier.js';

var createWorkerApp = function createWorkerApp(app) {
  render(createElement(app, {
    worker: self
  }), null);
};

var Context = /*#__PURE__*/createContext(null);

var createNewPhysicsLoopWebWorker = function createNewPhysicsLoopWebWorker(stepRate) {
  return new Worker('data:application/javascript,' + encodeURIComponent("\n            \n            var start = performance.now();\n            var updateRate = " + stepRate + ";\n            var maxAccumulator = updateRate;\n            \n            function getNow() {\n                return start + performance.now();\n            }\n            \n            var accumulator = 0;\n            var lastAccumulation = getNow();\n            var now = getNow();\n            var numberOfUpdates = 0;\n            \n            function accumulate() {\n                now = getNow();\n                accumulator += now - lastAccumulation;\n                lastAccumulation = now;\n                while (accumulator <= maxAccumulator) {\n                    now = getNow();\n                    accumulator += now - lastAccumulation;\n                    lastAccumulation = now;\n                }\n                numberOfUpdates = Math.floor(accumulator / maxAccumulator);\n                for (var i = 0; i < numberOfUpdates; i++) {\n                    self.postMessage('step');\n                    accumulator -= maxAccumulator;\n                }\n            }\n        \n            function step() {\n                \n                accumulate();\n                \n                setTimeout(step, updateRate - 2 - accumulator);\n                \n            }\n            \n            step()\n            \n        "));
};

var start = /*#__PURE__*/Date.now();
var getNow = function getNow() {
  return start + performance.now();
};

var WorkerMessageType;

(function (WorkerMessageType) {
  WorkerMessageType[WorkerMessageType["PHYSICS_UPDATE"] = 0] = "PHYSICS_UPDATE";
  WorkerMessageType[WorkerMessageType["PHYSICS_PROCESSED"] = 1] = "PHYSICS_PROCESSED";
  WorkerMessageType[WorkerMessageType["PHYSICS_READY"] = 2] = "PHYSICS_READY";
  WorkerMessageType[WorkerMessageType["PHYSICS_SET_PAUSED"] = 3] = "PHYSICS_SET_PAUSED";
  WorkerMessageType[WorkerMessageType["PHYSICS_ACKNOWLEDGED"] = 4] = "PHYSICS_ACKNOWLEDGED";
  WorkerMessageType[WorkerMessageType["ADD_BODY"] = 5] = "ADD_BODY";
  WorkerMessageType[WorkerMessageType["REMOVE_BODY"] = 6] = "REMOVE_BODY";
  WorkerMessageType[WorkerMessageType["MODIFY_BODY"] = 7] = "MODIFY_BODY";
  WorkerMessageType[WorkerMessageType["CUSTOM"] = 8] = "CUSTOM";
})(WorkerMessageType || (WorkerMessageType = {}));

var DEFAULT_STEP_RATE = 1000 / 60;

var Context$1 = /*#__PURE__*/createContext(null);
var usePhysicsConsumerContext = function usePhysicsConsumerContext() {
  return useContext(Context$1);
};

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var generateUUID = MathUtils.generateUUID;

var useTransferKeyEvents = function useTransferKeyEvents(worker) {
  useEffect(function () {
    var onKeyDown = function onKeyDown(event) {
      if (event.repeat) return;
      var code = event.code,
          key = event.key,
          keyCode = event.keyCode;
      worker.postMessage({
        type: 'KEYDOWN',
        data: {
          code: code,
          key: key,
          keyCode: keyCode
        }
      });
    };

    var onKeyUp = function onKeyUp(event) {
      var code = event.code,
          key = event.key,
          keyCode = event.keyCode;
      worker.postMessage({
        type: 'KEYUP',
        data: {
          code: code,
          key: key,
          keyCode: keyCode
        }
      });
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return function () {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);
};
var useActiveKeys = /*#__PURE__*/create(function () {
  return {
    activeKeys: {}
  };
});
var rawActiveKeys = {};

var setActiveKey = function setActiveKey(code, active) {
  rawActiveKeys[code] = active;
  return useActiveKeys.setState(function (state) {
    var _extends2;

    return {
      activeKeys: _extends({}, state.activeKeys, (_extends2 = {}, _extends2[code] = active, _extends2))
    };
  });
};

var useHandleKeyEvents = function useHandleKeyEvents(worker) {
  useEffect(function () {
    var previousOnMessage = worker.onmessage;

    worker.onmessage = function (event) {
      if (previousOnMessage) {
        previousOnMessage(event);
      }

      var data = event.data;

      switch (data.type) {
        case 'KEYUP':
          setActiveKey(data.data.keyCode, false);
          break;

        case 'KEYDOWN':
          setActiveKey(data.data.keyCode, true);
          break;
      }
    };

    return function () {
      worker.onmessage = previousOnMessage;
    };
  }, [worker]);
};

var MessageType;

(function (MessageType) {
  MessageType["mounted"] = "mounted";
  MessageType["unmounted"] = "unmounted";
  MessageType["propUpdate"] = "propUpdate";
  MessageType["propRemoved"] = "propRemoved";
})(MessageType || (MessageType = {}));

var useSyncComponent = function useSyncComponent(type, id, props, sendMessage) {
  useEffect(function () {
    sendMessage({
      message: MessageType.mounted,
      id: id,
      type: type,
      value: props
    });
    return function () {
      sendMessage({
        message: MessageType.unmounted,
        id: id
      });
    };
  }, [type, id, sendMessage]);
};

var SyncedComponentProp = function SyncedComponentProp(_ref) {
  var propKey = _ref.propKey,
      id = _ref.id,
      value = _ref.value,
      sendMessage = _ref.sendMessage;
  var firstUpdateRef = useRef(true);
  useEffect(function () {
    if (firstUpdateRef.current) {
      firstUpdateRef.current = false;
      return;
    }

    sendMessage({
      message: MessageType.propUpdate,
      id: id,
      value: value,
      propKey: propKey
    });
  }, [value, id, propKey]);
  useEffect(function () {
    return function () {
      sendMessage({
        message: MessageType.propRemoved,
        id: id,
        propKey: propKey
      });
    };
  }, [id, propKey]);
  return null;
};

var SyncedComponent = function SyncedComponent(_ref2) {
  var type = _ref2.type,
      passedId = _ref2.id,
      props = _objectWithoutPropertiesLoose(_ref2, ["type", "id"]);

  var sendMessage = useWorkerSendMessage();

  var _useState = useState(function () {
    return passedId != null ? passedId : generateUUID();
  }),
      id = _useState[0];

  useSyncComponent(type, id, props, sendMessage);
  return React.createElement(React.Fragment, null, Object.entries(props).map(function (_ref3) {
    var key = _ref3[0],
        value = _ref3[1];
    return React.createElement(SyncedComponentProp, {
      key: key,
      id: id,
      propKey: key,
      value: value,
      sendMessage: sendMessage
    });
  }));
};
var Context$2 = /*#__PURE__*/createContext(null);
var useWorkerSendMessage = function useWorkerSendMessage() {
  return useContext(Context$2).sendMessage;
};
var useWorker = function useWorker() {
  return useContext(Context$2).worker;
};
var WorkerMessaging = function WorkerMessaging(_ref4) {
  var worker = _ref4.worker,
      children = _ref4.children;
  var sendMessage = useCallback(function (message) {
    worker.postMessage({
      type: WorkerMessageType.CUSTOM,
      message: message
    });
  }, [worker]);
  useHandleKeyEvents(worker);
  return React.createElement(Context$2.Provider, {
    value: {
      sendMessage: sendMessage,
      worker: worker
    }
  }, children);
};
var SyncComponents = function SyncComponents(_ref5) {
  var components = _ref5.components;
  var worker = useWorker();

  var _useState2 = useState({}),
      storedComponents = _useState2[0],
      setComponents = _useState2[1];

  var handleCustomMessage = useCallback(function (message) {
    var id = message.id,
        type = message.type,
        value = message.value,
        propKey = message.propKey;

    switch (message.message) {
      case MessageType.mounted:
        setComponents(function (state) {
          var _extends2;

          return _extends({}, state, (_extends2 = {}, _extends2[id] = {
            id: id,
            type: type,
            props: value
          }, _extends2));
        });
        break;

      case MessageType.unmounted:
        setComponents(function (state) {
          var updated = _extends({}, state);

          delete updated[id];
          return updated;
        });
        break;

      case MessageType.propUpdate:
        setComponents(function (state) {
          var _state$id, _extends3, _extends4;

          var existing = (_state$id = state[id]) != null ? _state$id : {
            props: {}
          };
          return _extends({}, state, (_extends4 = {}, _extends4[id] = _extends({}, existing, {
            props: _extends({}, existing.props, (_extends3 = {}, _extends3[propKey] = value, _extends3))
          }), _extends4));
        });
        break;

      case MessageType.propRemoved:
        setComponents(function (state) {
          var _state$id2, _extends5;

          var existing = (_state$id2 = state[id]) != null ? _state$id2 : {
            props: {}
          };

          var updatedProps = _extends({}, existing.props);

          delete updatedProps[propKey];
          return _extends({}, state, (_extends5 = {}, _extends5[id] = _extends({}, existing, {
            props: updatedProps
          }), _extends5));
        });
        break;
    }
  }, []);
  useEffect(function () {
    var previousOnMessage = worker.onmessage;

    worker.onmessage = function (event) {
      if (previousOnMessage) {
        // @ts-ignore
        previousOnMessage(event);
      }

      var message = event.data;

      if (message.type === WorkerMessageType.CUSTOM) {
        handleCustomMessage(message.message);
      }
    };

    return function () {
      worker.onmessage = previousOnMessage;
    };
  }, []);
  return React.createElement(React.Fragment, null, Object.entries(storedComponents).map(function (_ref6) {
    var key = _ref6[0],
        component = _ref6[1];
    var Component = components[component.type];
    if (!Component) return null;
    return React.createElement(Component, Object.assign({
      id: key
    }, component.props, {
      key: key
    }));
  }));
};

var FixedUpdateContext = /*#__PURE__*/createContext(null);
var useFixedUpdateContext = function useFixedUpdateContext() {
  return useContext(FixedUpdateContext);
};
var OnFixedUpdateProvider = function OnFixedUpdateProvider(_ref) {
  var children = _ref.children;
  var localStateRef = useRef({
    subscriptionsIterator: 0
  });
  var onFixedUpdateSubscriptions = useRef({});

  var _useMemo = useMemo(function () {
    return {
      subscribeToOnPhysicsUpdate: function subscribeToOnPhysicsUpdate(callback) {
        var id = localStateRef.current.subscriptionsIterator.toString();
        localStateRef.current.subscriptionsIterator += 1;
        onFixedUpdateSubscriptions.current[id] = callback;
        return function () {
          delete onFixedUpdateSubscriptions.current[id];
        };
      },
      updateSubscriptions: function updateSubscriptions(delta) {
        Object.values(onFixedUpdateSubscriptions.current).forEach(function (callback) {
          return callback.current(delta);
        });
      }
    };
  }, []),
      subscribeToOnPhysicsUpdate = _useMemo.subscribeToOnPhysicsUpdate,
      updateSubscriptions = _useMemo.updateSubscriptions;

  return React.createElement(FixedUpdateContext.Provider, {
    value: {
      onFixedUpdateSubscriptions: onFixedUpdateSubscriptions,
      subscribeToOnPhysicsUpdate: subscribeToOnPhysicsUpdate,
      updateSubscriptions: updateSubscriptions
    }
  }, children);
};

var PhysicsConsumer = function PhysicsConsumer(_ref2) {
  var _ref2$paused = _ref2.paused,
      paused = _ref2$paused === void 0 ? false : _ref2$paused,
      updateBodyData = _ref2.updateBodyData,
      worker = _ref2.worker,
      children = _ref2.children,
      _ref2$stepRate = _ref2.stepRate,
      stepRate = _ref2$stepRate === void 0 ? DEFAULT_STEP_RATE : _ref2$stepRate,
      lerpBody = _ref2.lerpBody;

  var _useState = useState(false),
      connected = _useState[0],
      setConnected = _useState[1];

  var _useState2 = useState({}),
      bodiesData = _useState2[0];

  var localStateRef = useRef({
    lastUpdate: getNow(),
    subscriptionsIterator: 0,
    bodies: []
  });

  var _useFixedUpdateContex = useFixedUpdateContext(),
      updateSubscriptions = _useFixedUpdateContex.updateSubscriptions;

  var onFrameCallbacks = useRef({});
  var lerpMesh = useCallback(function (body, ref) {
    if (!ref.current) return;
    var object = ref.current;
    lerpBody(body, object, stepRate);
  }, []);
  var onUpdate = useCallback(function (updateTime, positions, angles, bodies) {
    if (bodies) {
      localStateRef.current.bodies = bodies;
    }

    Object.entries(bodiesData).forEach(function (_ref3) {
      var id = _ref3[0],
          bodyData = _ref3[1];

      if (bodies) {
        bodyData.index = bodies.indexOf(id);
      }

      if (bodyData.index >= 0) {
        updateBodyData(bodyData, positions, angles);
        bodyData.lastUpdate = updateTime;
      }
    });
    var now = updateTime;
    var delta = (now - localStateRef.current.lastUpdate) / 1000;
    localStateRef.current.lastUpdate = now;
    updateSubscriptions(delta);
  }, [updateSubscriptions]);
  useEffect(function () {
    if (connected) return;
    var interval = setInterval(function () {
      worker.postMessage({
        type: WorkerMessageType.PHYSICS_READY,
        paused: paused
      });
    }, 200);
    return function () {
      clearInterval(interval);
    };
  }, [connected, paused]);
  useEffect(function () {
    worker.postMessage({
      type: WorkerMessageType.PHYSICS_SET_PAUSED,
      paused: paused
    });
  }, [paused]);
  useEffect(function () {
    var previousOnMessage = worker.onmessage;

    worker.onmessage = function (event) {
      var message = event.data;

      switch (message.type) {
        case WorkerMessageType.PHYSICS_ACKNOWLEDGED:
          setConnected(true);
          break;

        case WorkerMessageType.PHYSICS_UPDATE:
          onUpdate(message.updateTime, message.positions, message.angles, message.bodies);
          worker.postMessage({
            type: WorkerMessageType.PHYSICS_PROCESSED,
            positions: message.positions,
            angles: message.angles
          }, [message.positions.buffer, message.angles.buffer]);
          break;
      }

      if (previousOnMessage) {
        previousOnMessage(event);
      }
    };
  }, []);

  var _useMemo2 = useMemo(function () {
    return {
      syncBody: function syncBody(id, ref, applyRotation) {
        if (applyRotation === void 0) {
          applyRotation = true;
        }

        localStateRef.current.subscriptionsIterator += 1;
        var body = {
          ref: ref,
          index: localStateRef.current.bodies.indexOf(id),
          lastUpdate: getNow(),
          lastRender: getNow(),
          previous: {},
          applyRotation: applyRotation
        };
        bodiesData[id] = body;

        onFrameCallbacks.current[id] = function () {
          return lerpMesh(body, ref);
        };

        return function () {
          delete onFrameCallbacks.current[id];
          delete bodiesData[id];
        };
      }
    };
  }, []),
      syncBody = _useMemo2.syncBody;

  var syncMeshes = useCallback(function () {
    Object.values(onFrameCallbacks.current).forEach(function (callback) {
      return callback();
    });
  }, []);
  var sendMessage = useCallback(function (message) {
    worker.postMessage(message);
  }, []);
  useTransferKeyEvents(worker);
  if (!connected) return null;
  return React.createElement(WorkerMessaging, {
    worker: worker
  }, React.createElement(Context$1.Provider, {
    value: {
      syncBody: syncBody,
      syncMeshes: syncMeshes,
      sendMessage: sendMessage
    }
  }, React.createElement(PhysicsConsumerSyncMeshes, {
    useRAF: true
  }), children));
};

var Wrapper = function Wrapper(props) {
  return React.createElement(OnFixedUpdateProvider, null, React.createElement(PhysicsConsumer, Object.assign({}, props)));
};

var now = 0;
var delta = 0;

var usePhysicsWorldStepHandler = function usePhysicsWorldStepHandler(onWorldStep, stepRate, paused) {
  var localStateRef = useRef({
    lastUpdate: getNow()
  });

  var _useFixedUpdateContex = useFixedUpdateContext(),
      updateSubscriptions = _useFixedUpdateContex.updateSubscriptions;

  var _useMemo = useMemo(function () {
    return {
      stepWorld: function stepWorld() {
        now = getNow();
        delta = now - localStateRef.current.lastUpdate;
        localStateRef.current.lastUpdate = now;
        if (paused) return;
        onWorldStep(delta);
        updateSubscriptions(delta / 1000);
      }
    };
  }, [paused, onWorldStep, updateSubscriptions]),
      stepWorld = _useMemo.stepWorld;

  var stepWorldRef = useRef(stepWorld);
  useEffect(function () {
    stepWorldRef.current = stepWorld;
  }, [stepWorld]);
  useEffect(function () {
    var worker = createNewPhysicsLoopWebWorker(stepRate); // let lastStep = getNow()

    worker.onmessage = function (event) {
      if (event.data === 'step') {
        // now = getNow()
        // delta = now - lastStep
        // lastStep = now
        // console.log('delta', delta)
        stepWorldRef.current();
      }
    };
  }, [stepWorldRef]);
  return null;
};

var PhysicsProvider = function PhysicsProvider(_ref) {
  var children = _ref.children,
      onWorldStep = _ref.onWorldStep,
      stepRate = _ref.stepRate;
  var paused = false;
  usePhysicsWorldStepHandler(onWorldStep, stepRate, paused);
  return React.createElement(Context.Provider, {
    value: {}
  }, children);
};

var Physics = function Physics(_ref) {
  var children = _ref.children,
      onWorldStep = _ref.onWorldStep,
      _ref$stepRate = _ref.stepRate,
      stepRate = _ref$stepRate === void 0 ? DEFAULT_STEP_RATE : _ref$stepRate;
  return React.createElement(OnFixedUpdateProvider, null, React.createElement(PhysicsProvider, {
    onWorldStep: onWorldStep,
    stepRate: stepRate
  }, children));
};

var Context$3 = /*#__PURE__*/createContext(null);
var usePlanckPhysicsHandlerContext = function usePlanckPhysicsHandlerContext() {
  return useContext(Context$3);
};

var Context$4 = /*#__PURE__*/createContext(null);
var usePlanckAppContext = function usePlanckAppContext() {
  return useContext(Context$4);
};

var WorkerSubscription = function WorkerSubscription(_ref) {
  var worker = _ref.worker,
      subscribe = _ref.subscribe,
      applyBufferData = _ref.applyBufferData,
      generateBuffers = _ref.generateBuffers,
      setPaused = _ref.setPaused;

  var _usePlanckPhysicsHand = usePlanckPhysicsHandlerContext(),
      getPendingSyncedBodiesIteration = _usePlanckPhysicsHand.getPendingSyncedBodiesIteration,
      syncedBodies = _usePlanckPhysicsHand.syncedBodies,
      syncedBodiesOrder = _usePlanckPhysicsHand.syncedBodiesOrder,
      maxNumberOfSyncedBodies = _usePlanckPhysicsHand.maxNumberOfSyncedBodies;

  var _useState = useState(function () {
    return generateBuffers(maxNumberOfSyncedBodies);
  }),
      buffers = _useState[0];

  var localStateRef = useRef({
    lastUpdate: -1,
    bodiesIteration: -1
  });

  var _useState2 = useState(false),
      buffersAvailable = _useState2[0],
      setBuffersAvailable = _useState2[1];

  var _useState3 = useState(0),
      updateCount = _useState3[0],
      setUpdateCount = _useState3[1];

  var updateWorker = useCallback(function (update) {
    localStateRef.current.lastUpdate = update;
    setBuffersAvailable(false);
    var bodiesIteration = getPendingSyncedBodiesIteration();
    var shouldSyncBodies = bodiesIteration !== localStateRef.current.bodiesIteration;
    applyBufferData(buffers, syncedBodies, syncedBodiesOrder);
    var positions = buffers.positions,
        angles = buffers.angles;
    var message = {
      type: WorkerMessageType.PHYSICS_UPDATE,
      updateTime: getNow(),
      positions: positions,
      angles: angles
    };

    if (shouldSyncBodies) {
      message.bodies = syncedBodiesOrder;
      localStateRef.current.bodiesIteration = bodiesIteration;
    }

    worker.postMessage(message, [positions.buffer, angles.buffer]); // process local fixed updates
  }, [getPendingSyncedBodiesIteration, syncedBodies, syncedBodiesOrder]);
  var updateWorkerRef = useRef(updateWorker);
  useEffect(function () {
    updateWorkerRef.current = updateWorker;
  }, [updateWorker]);
  useEffect(function () {
    if (!buffersAvailable) return;
    if (updateCount <= localStateRef.current.lastUpdate) return;
    updateWorkerRef.current(updateCount);
  }, [updateCount, buffersAvailable]);
  var onUpdate = useCallback(function () {
    setUpdateCount(function (state) {
      return state + 1;
    });
  }, []);
  var onUpdateRef = useRef(onUpdate);
  useEffect(function () {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);
  useEffect(function () {
    return subscribe(function () {
      return onUpdateRef.current();
    });
  }, []);
  useEffect(function () {
    var previousOnMessage = worker.onmessage;

    worker.onmessage = function (event) {
      var message = event.data;

      switch (message.type) {
        case WorkerMessageType.PHYSICS_PROCESSED:
          buffers.positions = message.positions;
          buffers.angles = message.angles;
          setBuffersAvailable(true);
          break;

        case WorkerMessageType.PHYSICS_SET_PAUSED:
          if (setPaused) {
            var _message$paused;

            setPaused((_message$paused = message.paused) != null ? _message$paused : false);
          }

          break;

        case WorkerMessageType.PHYSICS_READY:
          if (setPaused) {
            var _message$paused2;

            setPaused((_message$paused2 = message.paused) != null ? _message$paused2 : false);
          }

          setBuffersAvailable(true);
          worker.postMessage({
            type: WorkerMessageType.PHYSICS_ACKNOWLEDGED
          });
          break;
      }

      if (previousOnMessage) {
        previousOnMessage(event);
      }
    };
  }, []);
  return null;
};

var FixtureShape;

(function (FixtureShape) {
  FixtureShape["Circle"] = "Circle";
  FixtureShape["Box"] = "Box";
})(FixtureShape || (FixtureShape = {}));

var createFixtureShape = function createFixtureShape(shape, args) {
  switch (shape) {
    case FixtureShape.Circle:
      return Circle.apply(void 0, args);

    case FixtureShape.Box:
      // @ts-ignore
      return Box.apply(void 0, args);
  }

  return null;
};

var createBody = function createBody(world, bodyDef, fixtures) {
  var body = world.createBody(bodyDef);
  fixtures.forEach(function (_ref) {
    var shape = _ref.shape,
        args = _ref.args,
        fixtureOptions = _ref.fixtureOptions;
    var fixtureShape = createFixtureShape(shape, args);

    if (fixtureShape) {
      body.createFixture(fixtureShape, fixtureOptions);
    }
  });
  return body;
};

var PlanckPhysicsWorkerMessagesHandler = function PlanckPhysicsWorkerMessagesHandler(_ref) {
  var world = _ref.world,
      worker = _ref.worker;

  var _usePlanckAppContext = usePlanckAppContext(),
      addBody = _usePlanckAppContext.addBody,
      bodies = _usePlanckAppContext.bodies;

  var _useMemo = useMemo(function () {
    return {
      handleModifyBody: function handleModifyBody(_ref2) {
        var id = _ref2.id,
            method = _ref2.method,
            args = _ref2.args;
        var body = bodies[id];

        if (!body) {
          console.warn("No body found matching " + id);
          return;
        }

        body[method].apply(body, args);
      },
      handleAddBody: function handleAddBody(_ref3) {
        var id = _ref3.id,
            props = _ref3.props,
            synced = _ref3.synced;
        var body = createBody(world, props.body, props.fixtures);
        addBody(id, body, synced);
      }
    };
  }, []),
      handleAddBody = _useMemo.handleAddBody,
      handleModifyBody = _useMemo.handleModifyBody;

  useEffect(function () {
    var previousOnMessage = worker.onmessage;

    worker.onmessage = function (event) {
      var message = event.data;

      switch (message.type) {
        case WorkerMessageType.ADD_BODY:
          handleAddBody(message.data);
          break;

        case WorkerMessageType.MODIFY_BODY:
          handleModifyBody(message.data);
          break;
      }

      if (previousOnMessage) {
        previousOnMessage(event);
      }
    };
  }, []);
  return null;
};

var lerp = MathUtils.lerp;

var lerpBody = function lerpBody(body, object, stepRate) {
  var position = body.position,
      angle = body.angle,
      lastUpdate = body.lastUpdate,
      previous = body.previous,
      _body$applyRotation = body.applyRotation,
      applyRotation = _body$applyRotation === void 0 ? true : _body$applyRotation;

  if (!position || angle == undefined) {
    return;
  }

  if (!previous.position || !previous.angle) {
    object.position.x = position[0];
    object.position.z = position[1];

    if (applyRotation) {
      object.rotation.z = angle;
    }

    return;
  }

  var now = getNow();
  var nextExpectedUpdate = lastUpdate + stepRate + 1;
  var min = lastUpdate;
  var max = nextExpectedUpdate;
  var normalised = (now - min) / (max - min);
  normalised = normalised < 0 ? 0 : normalised > 1 ? 1 : normalised;
  var physicsRemainingRatio = normalised;
  object.position.x = lerp(previous.position[0], position[0], physicsRemainingRatio);
  object.position.y = lerp(previous.position[1], position[1], physicsRemainingRatio);

  if (applyRotation) {
    object.rotation.z = angle; // todo - lerp
  }
};

var getPositionAndAngle = function getPositionAndAngle(buffers, index) {
  if (index !== undefined && buffers.positions.length && buffers.angles.length) {
    var start = index * 2;
    var position = buffers.positions.slice(start, start + 2);
    return {
      position: position,
      angle: buffers.angles[index]
    };
  } else {
    return null;
  }
};

var updateBodyData = function updateBodyData(bodyData, positions, angles) {
  bodyData.previous.position = bodyData.position;
  bodyData.previous.angle = bodyData.angle;
  var update = getPositionAndAngle({
    positions: positions,
    angles: angles
  }, bodyData.index);

  if (update) {
    bodyData.position = update.position;
    bodyData.angle = update.angle;
  }
};
var applyBufferData = function applyBufferData(buffers, syncedBodies, syncedBodiesOrder) {
  var positions = buffers.positions,
      angles = buffers.angles;
  syncedBodiesOrder.forEach(function (id, index) {
    var body = syncedBodies[id];
    if (!body) return;
    var position = body.getPosition();
    var angle = body.getAngle();
    positions[2 * index + 0] = position.x;
    positions[2 * index + 1] = position.y;
    angles[index] = angle;
  });
};
var prepareObject = function prepareObject(object, props) {
  if (props.body.position) {
    object.position.x = props.body.position.x;
    object.position.z = props.body.position.y;
  }

  if (props.body.angle) {
    object.rotation.z = props.body.angle;
  }
};

var generateBuffers = function generateBuffers(maxNumberOfPhysicsObjects) {
  return {
    positions: new Float32Array(maxNumberOfPhysicsObjects * 2),
    angles: new Float32Array(maxNumberOfPhysicsObjects)
  };
};

var usePhysicsBodies = function usePhysicsBodies(removeBody) {
  var _useState = useState({}),
      bodies = _useState[0];

  var _useState2 = useState({}),
      syncedBodies = _useState2[0];

  var _useState3 = useState([]),
      syncedBodiesOrder = _useState3[0];

  var hasPendingSyncedBodiesRef = useRef(0);
  var getPendingSyncedBodiesIteration = useCallback(function () {
    return hasPendingSyncedBodiesRef.current;
  }, []);
  var addSyncedBody = useCallback(function (uid, body) {
    syncedBodiesOrder.push(uid);
    syncedBodies[uid] = body;
    hasPendingSyncedBodiesRef.current += 1;
    return function () {
      var index = syncedBodiesOrder.indexOf(uid);
      syncedBodiesOrder.splice(index, 1);
      delete syncedBodies[uid];
      hasPendingSyncedBodiesRef.current += 1;
    };
  }, []);
  var removeSyncedBody = useCallback(function (uid) {
    var index = syncedBodiesOrder.indexOf(uid);
    syncedBodiesOrder.splice(index, 1);
    delete syncedBodies[uid];
    hasPendingSyncedBodiesRef.current += 1;
  }, []);
  var addBody = useCallback(function (uid, body, synced) {
    if (synced === void 0) {
      synced = false;
    }

    bodies[uid] = body;
    var syncedUnsub;

    if (synced) {
      syncedUnsub = addSyncedBody(uid, body);
    }

    return function () {
      delete bodies[uid];

      if (syncedUnsub) {
        syncedUnsub();
      }

      if (removeBody) {
        removeBody(body);
      }
    };
  }, []);
  return {
    addSyncedBody: addSyncedBody,
    removeSyncedBody: removeSyncedBody,
    getPendingSyncedBodiesIteration: getPendingSyncedBodiesIteration,
    syncedBodiesOrder: syncedBodiesOrder,
    syncedBodies: syncedBodies,
    addBody: addBody,
    bodies: bodies
  };
};
var usePhysicsUpdate = function usePhysicsUpdate() {
  var countRef = useRef(0);
  var workerSubscriptionsRef = useRef({});
  var subscribeToPhysicsUpdates = useCallback(function (callback) {
    var id = countRef.current.toString();
    countRef.current += 1;
    workerSubscriptionsRef.current[id] = callback;
    return function () {
      delete workerSubscriptionsRef.current[id];
    };
  }, []);
  var onUpdate = useCallback(function () {
    Object.values(workerSubscriptionsRef.current).forEach(function (callback) {
      return callback();
    });
  }, []);
  return {
    onUpdate: onUpdate,
    subscribeToPhysicsUpdates: subscribeToPhysicsUpdates
  };
};
var usePhysics = function usePhysics(removeBody) {
  if (removeBody === void 0) {
    removeBody = function removeBody() {};
  }

  var _usePhysicsBodies = usePhysicsBodies(removeBody),
      addSyncedBody = _usePhysicsBodies.addSyncedBody,
      removeSyncedBody = _usePhysicsBodies.removeSyncedBody,
      getPendingSyncedBodiesIteration = _usePhysicsBodies.getPendingSyncedBodiesIteration,
      syncedBodies = _usePhysicsBodies.syncedBodies,
      syncedBodiesOrder = _usePhysicsBodies.syncedBodiesOrder,
      addBody = _usePhysicsBodies.addBody,
      bodies = _usePhysicsBodies.bodies;

  var _usePhysicsUpdate = usePhysicsUpdate(),
      onUpdate = _usePhysicsUpdate.onUpdate,
      subscribeToPhysicsUpdates = _usePhysicsUpdate.subscribeToPhysicsUpdates;

  return {
    subscribeToPhysicsUpdates: subscribeToPhysicsUpdates,
    getPendingSyncedBodiesIteration: getPendingSyncedBodiesIteration,
    syncedBodies: syncedBodies,
    syncedBodiesOrder: syncedBodiesOrder,
    addSyncedBody: addSyncedBody,
    removeSyncedBody: removeSyncedBody,
    addBody: addBody,
    bodies: bodies,
    onUpdate: onUpdate
  };
};

var PlanckPhysicsHandler = function PlanckPhysicsHandler(_ref) {
  var children = _ref.children,
      world = _ref.world,
      worker = _ref.worker,
      stepRate = _ref.stepRate,
      maxNumberOfSyncedBodies = _ref.maxNumberOfSyncedBodies;
  var removeBody = useCallback(function (body) {
    world.destroyBody(body);
  }, []);

  var _usePhysics = usePhysics(removeBody),
      subscribeToPhysicsUpdates = _usePhysics.subscribeToPhysicsUpdates,
      getPendingSyncedBodiesIteration = _usePhysics.getPendingSyncedBodiesIteration,
      syncedBodies = _usePhysics.syncedBodies,
      syncedBodiesOrder = _usePhysics.syncedBodiesOrder,
      addSyncedBody = _usePhysics.addSyncedBody,
      removeSyncedBody = _usePhysics.removeSyncedBody,
      addBody = _usePhysics.addBody,
      bodies = _usePhysics.bodies,
      onUpdate = _usePhysics.onUpdate;

  var _useMemo = useMemo(function () {
    return {
      onWorldStep: function onWorldStep() {
        world.step(stepRate / 1000);
        world.clearForces();
        onUpdate();
      }
    };
  }, []),
      onWorldStep = _useMemo.onWorldStep;

  return React.createElement(Context$3.Provider, {
    value: {
      getPendingSyncedBodiesIteration: getPendingSyncedBodiesIteration,
      syncedBodies: syncedBodies,
      syncedBodiesOrder: syncedBodiesOrder,
      maxNumberOfSyncedBodies: maxNumberOfSyncedBodies
    }
  }, React.createElement(WorkerSubscription, {
    applyBufferData: applyBufferData,
    generateBuffers: generateBuffers,
    worker: worker,
    subscribe: subscribeToPhysicsUpdates
  }), React.createElement(Context$4.Provider, {
    value: {
      world: world,
      addSyncedBody: addSyncedBody,
      removeSyncedBody: removeSyncedBody,
      addBody: addBody,
      bodies: bodies
    }
  }, React.createElement(PlanckPhysicsWorkerMessagesHandler, {
    world: world,
    worker: worker
  }), React.createElement(Physics, {
    onWorldStep: onWorldStep,
    stepRate: stepRate
  }, children)));
};

var usePlanckPhysics = function usePlanckPhysics() {
  var _useState = useState(null),
      world = _useState[0],
      setWorld = _useState[1];

  useEffect(function () {
    var planckWorld = new World({
      allowSleep: false
    });
    setWorld(planckWorld);
  }, []);
  return {
    world: world
  };
};

var PlanckApp = function PlanckApp(_ref) {
  var children = _ref.children,
      _ref$stepRate = _ref.stepRate,
      stepRate = _ref$stepRate === void 0 ? DEFAULT_STEP_RATE : _ref$stepRate,
      _ref$maxNumberOfSynce = _ref.maxNumberOfSyncedBodies,
      maxNumberOfSyncedBodies = _ref$maxNumberOfSynce === void 0 ? 100 : _ref$maxNumberOfSynce,
      worker = _ref.worker;

  var _usePlanckPhysics = usePlanckPhysics(),
      world = _usePlanckPhysics.world;

  if (!world) return null;
  return React.createElement(WorkerMessaging, {
    worker: worker
  }, React.createElement(PlanckPhysicsHandler, {
    world: world,
    worker: worker,
    stepRate: stepRate,
    maxNumberOfSyncedBodies: maxNumberOfSyncedBodies
  }, children));
};

var RAFSync = function RAFSync() {
  var _usePhysicsConsumerCo = usePhysicsConsumerContext(),
      syncMeshes = _usePhysicsConsumerCo.syncMeshes;

  useFrame(syncMeshes);
  return null;
};

var IntervalSync = function IntervalSync() {
  var _usePhysicsConsumerCo2 = usePhysicsConsumerContext(),
      syncMeshes = _usePhysicsConsumerCo2.syncMeshes;

  useEffect(function () {
    var interval = setInterval(function () {
      syncMeshes();
    }, 1000 / 30);
    return function () {
      clearInterval(interval);
    };
  }, []);
  return null;
};

var PhysicsConsumerSyncMeshes = function PhysicsConsumerSyncMeshes(_ref) {
  var _ref$useRAF = _ref.useRAF,
      useRAF = _ref$useRAF === void 0 ? false : _ref$useRAF;
  if (useRAF) return React.createElement(RAFSync, null);
  return React.createElement(IntervalSync, null);
};

var Context$5 = /*#__PURE__*/createContext(null);
var usePhysicsConsumerHelpers = function usePhysicsConsumerHelpers() {
  return useContext(Context$5);
};

var PhysicsConsumerHelpers = function PhysicsConsumerHelpers(_ref) {
  var children = _ref.children,
      prepareObject = _ref.prepareObject;
  return React.createElement(Context$5.Provider, {
    value: {
      prepareObject: prepareObject
    }
  }, children);
};

var useOnFixedUpdate = function useOnFixedUpdate(callback) {
  var _useFixedUpdateContex = useFixedUpdateContext(),
      subscribeToOnPhysicsUpdate = _useFixedUpdateContex.subscribeToOnPhysicsUpdate;

  var callbackRef = useRef(callback);
  useEffect(function () {
    callbackRef.current = callback;
  }, [callback]);
  useEffect(function () {
    return subscribeToOnPhysicsUpdate(callbackRef);
  }, []);
};
var useBodyApi = function useBodyApi(id) {
  var _usePhysicsConsumerCo = usePhysicsConsumerContext(),
      sendMessage = _usePhysicsConsumerCo.sendMessage;

  return useCallback(function (method, args) {
    sendMessage({
      type: WorkerMessageType.MODIFY_BODY,
      data: {
        id: id,
        method: method,
        args: args
      }
    });
  }, []);
};
var useSyncBody = function useSyncBody(id, ref, options) {
  var _ref = options != null ? options : {},
      _ref$applyRotation = _ref.applyRotation,
      applyRotation = _ref$applyRotation === void 0 ? true : _ref$applyRotation;

  var _usePhysicsConsumerCo2 = usePhysicsConsumerContext(),
      syncBody = _usePhysicsConsumerCo2.syncBody; // @ts-ignore


  useLayoutEffect(function () {
    if (!ref) return;

    if (!ref.current) {
      ref.current = new Object3D();
    }

    return syncBody(id, ref, applyRotation);
  }, [ref]);
};
var useBody = function useBody(propsFn, options, addToMessage) {
  if (options === void 0) {
    options = {};
  }

  var _usePhysicsConsumerCo3 = usePhysicsConsumerContext(),
      sendMessage = _usePhysicsConsumerCo3.sendMessage;

  var _useState = useState(function () {
    var _options$id;

    return (_options$id = options.id) != null ? _options$id : generateUUID();
  }),
      id = _useState[0];

  var localRef = useRef(null);

  var _ref2 = usePhysicsConsumerHelpers() || {},
      prepareObject = _ref2.prepareObject;

  var _useState2 = useState(function () {
    return options.ref || localRef;
  }),
      ref = _useState2[0];

  useSyncBody(id, ref);
  useLayoutEffect(function () {
    var _options$synced;

    var props = propsFn();
    var object = ref.current;

    if (prepareObject) {
      prepareObject(object, props);
    }

    sendMessage({
      type: WorkerMessageType.ADD_BODY,
      data: _extends({
        id: id,
        props: props,
        synced: (_options$synced = options.synced) != null ? _options$synced : true
      }, addToMessage ? addToMessage(props, options) : {})
    });
    return function () {
      sendMessage({
        type: WorkerMessageType.REMOVE_BODY,
        data: {
          id: id
        }
      });
    };
  }, []);
  return [ref, id];
};
var usePlanckBody = function usePlanckBody(propsFn, options) {
  if (options === void 0) {
    options = {};
  }

  return useBody(propsFn, options);
};

var createBody$1 = function createBody(world, bodyDef) {
  var body = new Body(bodyDef.body);
  bodyDef.shapes.forEach(function (_ref) {
    var type = _ref.type,
        args = _ref.args;

    switch (type) {
      case 'Box':
        // @ts-ignore
        var box = new Box$1(_construct(Vec3, args.map(function (v) {
          return v / 2;
        })));
        body.addShape(box);
        break;

      case 'Sphere':
        // @ts-ignore
        var sphere = _construct(Sphere, args);

        body.addShape(sphere);
        break;
    }
  });
  world.addBody(body);
  return body;
};

var CannonPhysicsWorkerMessagesHandler = function CannonPhysicsWorkerMessagesHandler(_ref) {
  var world = _ref.world,
      worker = _ref.worker;

  var _usePlanckAppContext = usePlanckAppContext(),
      addBody = _usePlanckAppContext.addBody,
      bodies = _usePlanckAppContext.bodies;

  var _useMemo = useMemo(function () {
    return {
      handleModifyBody: function handleModifyBody(_ref2) {
        var id = _ref2.id,
            method = _ref2.method,
            args = _ref2.args;
        var body = bodies[id];

        if (!body) {
          console.warn("No body found matching " + id);
          return;
        }

        body[method].apply(body, args);
      },
      handleAddBody: function handleAddBody(_ref3) {
        var _props$userData;

        var id = _ref3.id,
            props = _ref3.props,
            synced = _ref3.synced,
            listenForCollisions = _ref3.listenForCollisions;
        var body = createBody$1(world, props); // @ts-ignore

        body.userData = _extends({
          id: id
        }, (_props$userData = props.userData) != null ? _props$userData : {});
        addBody(id, body, synced);

        if (listenForCollisions) {
          console.log('listenForCollisions');
        }
      }
    };
  }, []),
      handleAddBody = _useMemo.handleAddBody,
      handleModifyBody = _useMemo.handleModifyBody;

  useEffect(function () {
    var previousOnMessage = worker.onmessage;

    worker.onmessage = function (event) {
      var message = event.data;

      switch (message.type) {
        case WorkerMessageType.ADD_BODY:
          handleAddBody(message.data);
          break;

        case WorkerMessageType.MODIFY_BODY:
          handleModifyBody(message.data);
          break;
      }

      if (previousOnMessage) {
        previousOnMessage(event);
      }
    };
  }, []);
  return null;
};

var applyBufferData$1 = function applyBufferData(buffers, syncedBodies, syncedBodiesOrder) {
  var positions = buffers.positions,
      angles = buffers.angles;
  syncedBodiesOrder.forEach(function (id, index) {
    var body = syncedBodies[id];
    if (!body) return;
    var position = body.position;
    var quaternion = body.quaternion;
    positions[3 * index + 0] = position.x;
    positions[3 * index + 1] = position.y;
    positions[3 * index + 2] = position.z;
    angles[4 * index + 0] = quaternion.x;
    angles[4 * index + 1] = quaternion.y;
    angles[4 * index + 2] = quaternion.z;
    angles[4 * index + 3] = quaternion.w;
  });
};
var quat = /*#__PURE__*/new Quaternion();
var lerpBody$1 = function lerpBody(body, object, stepRate) {
  var position = body.position,
      angle = body.angle,
      lastUpdate = body.lastUpdate,
      previous = body.previous;
  if (!position || !angle) return;

  if (!previous.position || !previous.angle) {
    var _object$position, _object$quaternion;

    (_object$position = object.position).set.apply(_object$position, position);

    (_object$quaternion = object.quaternion).set.apply(_object$quaternion, angle);

    return;
  }

  var now = getNow();
  var nextExpectedUpdate = lastUpdate + stepRate + 1;
  var min = lastUpdate;
  var max = nextExpectedUpdate;
  var normalised = (now - min) / (max - min);
  normalised = normalised < 0 ? 0 : normalised > 1 ? 1 : normalised;
  var physicsRemainingRatio = normalised;
  object.position.x = lerp(previous.position[0], position[0], physicsRemainingRatio);
  object.position.y = lerp(previous.position[1], position[1], physicsRemainingRatio);
  object.position.z = lerp(previous.position[2], position[2], physicsRemainingRatio);
  object.quaternion.fromArray(previous.angle);
  quat.fromArray(angle);
  object.quaternion.slerp(quat, physicsRemainingRatio);
};

var getPositionAndAngle$1 = function getPositionAndAngle(buffers, index) {
  if (index !== undefined && buffers.positions.length && buffers.angles.length) {
    var start = index * 3;
    var position = buffers.positions.slice(start, start + 3);
    var angleStart = index * 4;
    var angle = buffers.angles.slice(angleStart, angleStart + 4);
    return {
      position: position,
      angle: angle
    };
  } else {
    return null;
  }
};

var updateBodyData$1 = function updateBodyData(bodyData, positions, angles) {
  bodyData.previous.position = bodyData.position;
  bodyData.previous.angle = bodyData.angle;
  var update = getPositionAndAngle$1({
    positions: positions,
    angles: angles
  }, bodyData.index);

  if (update) {
    bodyData.position = update.position;
    bodyData.angle = update.angle;
  }
};
var prepareObject$1 = function prepareObject(object, props) {
  if (props.body.position) {
    var _object$position2;

    (_object$position2 = object.position).set.apply(_object$position2, props.body.position.toArray());
  }

  if (props.body.quaternion) {
    var _object$quaternion2;

    (_object$quaternion2 = object.quaternion).set.apply(_object$quaternion2, props.body.quaternion.toArray());
  }
};

var generateBuffers$1 = function generateBuffers(maxNumberOfPhysicsObjects) {
  return {
    positions: new Float32Array(maxNumberOfPhysicsObjects * 3),
    angles: new Float32Array(maxNumberOfPhysicsObjects * 4)
  };
};

var CannonPhysicsHandler = function CannonPhysicsHandler(_ref) {
  var children = _ref.children,
      world = _ref.world,
      stepRate = _ref.stepRate,
      worker = _ref.worker,
      maxNumberOfSyncedBodies = _ref.maxNumberOfSyncedBodies;
  var removeBody = useCallback(function (body) {
    world.removeBody(body);
  }, []);

  var _usePhysics = usePhysics(removeBody),
      subscribeToPhysicsUpdates = _usePhysics.subscribeToPhysicsUpdates,
      getPendingSyncedBodiesIteration = _usePhysics.getPendingSyncedBodiesIteration,
      syncedBodies = _usePhysics.syncedBodies,
      syncedBodiesOrder = _usePhysics.syncedBodiesOrder,
      addSyncedBody = _usePhysics.addSyncedBody,
      removeSyncedBody = _usePhysics.removeSyncedBody,
      addBody = _usePhysics.addBody,
      bodies = _usePhysics.bodies,
      onUpdate = _usePhysics.onUpdate;

  var localStateRef = useRef({
    lastUpdate: getNow()
  });

  var _useMemo = useMemo(function () {
    return {
      onWorldStep: function onWorldStep() {
        var now = getNow();
        var delta = (now - localStateRef.current.lastUpdate) / 1000;
        localStateRef.current.lastUpdate = now;
        world.step(stepRate / 1000, delta);
        onUpdate();
      }
    };
  }, []),
      onWorldStep = _useMemo.onWorldStep;

  return React.createElement(Context$3.Provider, {
    value: {
      getPendingSyncedBodiesIteration: getPendingSyncedBodiesIteration,
      syncedBodies: syncedBodies,
      syncedBodiesOrder: syncedBodiesOrder,
      maxNumberOfSyncedBodies: maxNumberOfSyncedBodies
    }
  }, React.createElement(WorkerSubscription, {
    applyBufferData: applyBufferData$1,
    generateBuffers: generateBuffers$1,
    worker: worker,
    subscribe: subscribeToPhysicsUpdates
  }), React.createElement(Context$4.Provider, {
    value: {
      world: world,
      addSyncedBody: addSyncedBody,
      removeSyncedBody: removeSyncedBody,
      addBody: addBody,
      bodies: bodies
    }
  }, React.createElement(CannonPhysicsWorkerMessagesHandler, {
    world: world,
    worker: worker
  }), React.createElement(Physics, {
    onWorldStep: onWorldStep,
    stepRate: stepRate
  }, children)));
};

var useCannonPhysics = function useCannonPhysics() {
  var _useState = useState(null),
      world = _useState[0],
      setWorld = _useState[1];

  useEffect(function () {
    var cannonWorld = new World$1();
    cannonWorld.gravity.set(0, -9.81, 0);
    setWorld(cannonWorld);
    cannonWorld.addEventListener('beginContact', function () {// todo
    });
    cannonWorld.addEventListener('endContact', function () {// todo
    });
  }, []);
  return {
    world: world
  };
};

var CannonApp = function CannonApp(_ref) {
  var children = _ref.children,
      _ref$stepRate = _ref.stepRate,
      stepRate = _ref$stepRate === void 0 ? DEFAULT_STEP_RATE : _ref$stepRate,
      _ref$maxNumberOfSynce = _ref.maxNumberOfSyncedBodies,
      maxNumberOfSyncedBodies = _ref$maxNumberOfSynce === void 0 ? 100 : _ref$maxNumberOfSynce,
      worker = _ref.worker;

  var _useCannonPhysics = useCannonPhysics(),
      world = _useCannonPhysics.world;

  if (!world) return null;
  return React.createElement(WorkerMessaging, {
    worker: worker
  }, React.createElement(CannonPhysicsHandler, {
    world: world,
    worker: worker,
    stepRate: stepRate,
    maxNumberOfSyncedBodies: maxNumberOfSyncedBodies
  }, children));
};

var PlanckPhysicsConsumer = function PlanckPhysicsConsumer(_ref) {
  var worker = _ref.worker,
      stepRate = _ref.stepRate,
      children = _ref.children;
  return React.createElement(Wrapper, {
    updateBodyData: updateBodyData,
    lerpBody: lerpBody,
    worker: worker,
    stepRate: stepRate
  }, React.createElement(PhysicsConsumerHelpers, {
    prepareObject: prepareObject
  }, children));
};

var CannonPhysicsConsumer = function CannonPhysicsConsumer(_ref) {
  var worker = _ref.worker,
      stepRate = _ref.stepRate,
      children = _ref.children;
  return React.createElement(Wrapper, {
    updateBodyData: updateBodyData$1,
    lerpBody: lerpBody$1,
    worker: worker,
    stepRate: stepRate
  }, React.createElement(PhysicsConsumerHelpers, {
    prepareObject: prepareObject$1
  }, children));
};

var addToMessage = function addToMessage(props, options) {
  var message = {};

  if (options.listenForCollisions) {
    message.listenForCollisions = true;
  }

  return message;
};
var useCannonBody = function useCannonBody(propsFn, options) {
  if (options === void 0) {
    options = {};
  }

  return useBody(propsFn, options, addToMessage);
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var applyBufferData$2 = function applyBufferData(buffers, syncedBodies, syncedBodiesOrder) {
  var positions = buffers.positions,
      angles = buffers.angles;
  syncedBodiesOrder.forEach(function (id, index) {
    var body = syncedBodies[id];
    if (!body) return;
    var position = body.translation();
    var quaternion = body.rotation();
    positions[3 * index + 0] = position.x;
    positions[3 * index + 1] = position.y;
    positions[3 * index + 2] = position.z;
    angles[4 * index + 0] = quaternion.x;
    angles[4 * index + 1] = quaternion.y;
    angles[4 * index + 2] = quaternion.z;
    angles[4 * index + 3] = quaternion.w;
  });
};
var prepareObject$2 = function prepareObject(object, props) {
  if (props.body.position) {
    var _object$position;

    (_object$position = object.position).set.apply(_object$position, props.body.position);
  }

  if (props.body.quaternion) {
    var _object$quaternion;

    (_object$quaternion = object.quaternion).set.apply(_object$quaternion, props.body.quaternion);
  }
};

var createColliderDesc = function createColliderDesc(colliderDef) {
  switch (colliderDef.type) {
    case "Ball":
      // @ts-ignore
      return ColliderDesc.ball.apply(ColliderDesc, colliderDef.args);

    case "Cubiod":
      // @ts-ignore
      return ColliderDesc.cuboid.apply(ColliderDesc, colliderDef.args);
  }

  return null;
}; // const getCollisionGroups = (myGroups: number[], interactGroups: number[]) => {
//     let result = 0;
//     for (let g of myGroups)
//     {
//         result += (1 << g);
//     }
//     result = result << 16;
//
//     for (let f of interactGroups)
//     {
//         result += (1 << f);
//     }
//     return result;
// }


var createCollider = function createCollider(world, body, colliderDef) {
  var collider = createColliderDesc(colliderDef);
  if (!collider) return;
  world.createCollider(collider, body.handle);
};

var removeBody = function removeBody(world, body) {
  world.removeRigidBody(body);
};
var createBody$2 = function createBody(world, bodyDef) {
  var rigidBodyDesc = new RigidBodyDesc(bodyDef.body.type);

  if (bodyDef.body.mass != undefined) {
    rigidBodyDesc.setMass(bodyDef.body.mass);
  }

  if (bodyDef.body.position) {
    rigidBodyDesc.setTranslation.apply(rigidBodyDesc, bodyDef.body.position);
  }

  if (bodyDef.body.quaternion) {
    rigidBodyDesc.setRotation({
      x: bodyDef.body.quaternion[0],
      y: bodyDef.body.quaternion[1],
      z: bodyDef.body.quaternion[2],
      w: bodyDef.body.quaternion[3]
    });
  }

  var body = world.createRigidBody(rigidBodyDesc);
  bodyDef.colliders.forEach(function (collider) {
    createCollider(world, body, collider);
  });
  return body;
};

var customData = {
  customBodyModifiers: {}
};
var getCustomBodyModifier = function getCustomBodyModifier(bodyDef) {
  if (bodyDef.customBody && customData.customBodyModifiers[bodyDef.customBody]) {
    return customData.customBodyModifiers[bodyDef.customBody];
  }

  return undefined;
};

var Rapier3DPhysicsWorkerMessagesHandler = function Rapier3DPhysicsWorkerMessagesHandler(_ref) {
  var world = _ref.world,
      worker = _ref.worker;

  var _usePlanckAppContext = usePlanckAppContext(),
      addBody = _usePlanckAppContext.addBody,
      bodies = _usePlanckAppContext.bodies;

  var localStateRef = useRef({
    removeCallbacks: {}
  });

  var _useMemo = useMemo(function () {
    return {
      handleModifyBody: function handleModifyBody(_ref2) {
        var id = _ref2.id,
            method = _ref2.method,
            args = _ref2.args;
        var body = bodies[id];

        if (!body) {
          console.warn("No body found matching " + id);
          return;
        }

        body[method].apply(body, args);
      },
      handleAddBody: function handleAddBody(_ref3) {
        var id = _ref3.id,
            props = _ref3.props,
            synced = _ref3.synced;
        var body = createBody$2(world, props);
        var customModifier = getCustomBodyModifier(props);

        if (customModifier) {
          customModifier(body);
        }

        localStateRef.current.removeCallbacks[id] = addBody(id, body, synced);
      },
      handleRemoveBody: function handleRemoveBody(_ref4) {
        var id = _ref4.id;
        var body = bodies[id];
        world.removeRigidBody(body);

        if (localStateRef.current.removeCallbacks[id]) {
          localStateRef.current.removeCallbacks[id]();
        }
      }
    };
  }, []),
      handleAddBody = _useMemo.handleAddBody,
      handleModifyBody = _useMemo.handleModifyBody,
      handleRemoveBody = _useMemo.handleRemoveBody;

  useEffect(function () {
    var previousOnMessage = worker.onmessage;

    worker.onmessage = function (event) {
      var message = event.data;

      switch (message.type) {
        case WorkerMessageType.ADD_BODY:
          handleAddBody(message.data);
          break;

        case WorkerMessageType.REMOVE_BODY:
          handleRemoveBody(message.data);
          break;

        case WorkerMessageType.MODIFY_BODY:
          handleModifyBody(message.data);
          break;
      }

      if (previousOnMessage) {
        previousOnMessage(event);
      }
    };
  }, []);
  return null;
};

var Rapier3DPhysicsHandler = function Rapier3DPhysicsHandler(_ref) {
  var children = _ref.children,
      world = _ref.world,
      stepRate = _ref.stepRate,
      worker = _ref.worker,
      maxNumberOfSyncedBodies = _ref.maxNumberOfSyncedBodies;
  var customRemoveBody = useCallback(function (body) {
    removeBody(world, body);
  }, []);

  var _usePhysics = usePhysics(customRemoveBody),
      subscribeToPhysicsUpdates = _usePhysics.subscribeToPhysicsUpdates,
      getPendingSyncedBodiesIteration = _usePhysics.getPendingSyncedBodiesIteration,
      syncedBodies = _usePhysics.syncedBodies,
      syncedBodiesOrder = _usePhysics.syncedBodiesOrder,
      addSyncedBody = _usePhysics.addSyncedBody,
      removeSyncedBody = _usePhysics.removeSyncedBody,
      addBody = _usePhysics.addBody,
      bodies = _usePhysics.bodies,
      onUpdate = _usePhysics.onUpdate;

  var _useState = useState(false),
      paused = _useState[0],
      setPaused = _useState[1];

  var _useMemo = useMemo(function () {
    return {
      onWorldStep: function onWorldStep() {
        if (paused) return;
        world.step();
        onUpdate();
      }
    };
  }, [paused]),
      onWorldStep = _useMemo.onWorldStep;

  return React.createElement(Context$3.Provider, {
    value: {
      getPendingSyncedBodiesIteration: getPendingSyncedBodiesIteration,
      syncedBodies: syncedBodies,
      syncedBodiesOrder: syncedBodiesOrder,
      maxNumberOfSyncedBodies: maxNumberOfSyncedBodies
    }
  }, React.createElement(WorkerSubscription, {
    applyBufferData: applyBufferData$2,
    generateBuffers: generateBuffers$1,
    worker: worker,
    subscribe: subscribeToPhysicsUpdates,
    setPaused: setPaused
  }), React.createElement(Context$4.Provider, {
    value: {
      world: world,
      addSyncedBody: addSyncedBody,
      removeSyncedBody: removeSyncedBody,
      addBody: addBody,
      bodies: bodies
    }
  }, React.createElement(Rapier3DPhysicsWorkerMessagesHandler, {
    world: world,
    worker: worker
  }), React.createElement(Physics, {
    onWorldStep: onWorldStep,
    stepRate: stepRate
  }, children)));
};

var useRapier3dPhysics = function useRapier3dPhysics(stepRate) {
  var _useState = useState(null),
      world = _useState[0],
      setWorld = _useState[1];

  var init$1 = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
    var gravity, rapierWorld;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return init();

          case 2:
            gravity = new Vector3(0.0, -9.81, 0.0);
            rapierWorld = new World$2(gravity);
            rapierWorld.timestep = stepRate / 1000;
            setWorld(rapierWorld);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), []);
  useEffect(function () {
    init$1();
  }, []);
  return {
    world: world
  };
};

var Rapier3DApp = function Rapier3DApp(_ref2) {
  var children = _ref2.children,
      _ref2$stepRate = _ref2.stepRate,
      stepRate = _ref2$stepRate === void 0 ? DEFAULT_STEP_RATE : _ref2$stepRate,
      _ref2$maxNumberOfSync = _ref2.maxNumberOfSyncedBodies,
      maxNumberOfSyncedBodies = _ref2$maxNumberOfSync === void 0 ? 100 : _ref2$maxNumberOfSync,
      _ref2$customBodyModif = _ref2.customBodyModifiers,
      customBodyModifiers = _ref2$customBodyModif === void 0 ? {} : _ref2$customBodyModif,
      worker = _ref2.worker;

  var _useRapier3dPhysics = useRapier3dPhysics(stepRate),
      world = _useRapier3dPhysics.world;

  useEffect(function () {
    customData.customBodyModifiers = customBodyModifiers;
  }, [customBodyModifiers]);
  if (!world) return null;
  return React.createElement(WorkerMessaging, {
    worker: worker
  }, React.createElement(Rapier3DPhysicsHandler, {
    world: world,
    worker: worker,
    stepRate: stepRate,
    maxNumberOfSyncedBodies: maxNumberOfSyncedBodies
  }, children));
};

var Rapier3DPhysicsConsumer = function Rapier3DPhysicsConsumer(_ref) {
  var children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, ["children"]);

  return React.createElement(Wrapper, Object.assign({
    updateBodyData: updateBodyData$1,
    lerpBody: lerpBody$1
  }, props), React.createElement(PhysicsConsumerHelpers, {
    prepareObject: prepareObject$2
  }, children));
};

var useRapier3DBody = function useRapier3DBody(propsFn, options) {
  if (options === void 0) {
    options = {};
  }

  return useBody(propsFn, options, addToMessage);
};

export { CannonApp, CannonPhysicsConsumer, FixtureShape, Physics, Wrapper as PhysicsConsumer, PhysicsConsumerSyncMeshes, PlanckApp, PlanckPhysicsConsumer, Rapier3DApp, Rapier3DPhysicsConsumer, SyncComponents, SyncedComponent, createBody$2 as createBody, createWorkerApp, rawActiveKeys, useActiveKeys, useBodyApi, useCannonBody, useOnFixedUpdate, usePhysicsConsumerContext, usePlanckAppContext, usePlanckBody, useRapier3DBody, useSyncBody };
//# sourceMappingURL=rgg-engine.esm.js.map
