'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var react = require('@stitches/react');
var fa = require('react-icons/fa');
var Tree = require('@atlaskit/tree');
var Tree__default = _interopDefault(Tree);
var create = _interopDefault(require('zustand'));
var middleware = require('zustand/middleware');
var valtio = require('valtio');
var lodashEs = require('lodash-es');
var hotkeys = _interopDefault(require('hotkeys-js'));
var rapier3dCompat = require('@dimforge/rapier3d-compat');
var three = require('three');
var rggEngine = require('rgg-engine');
var drei = require('@react-three/drei');
var reactThreeFiber = require('react-three-fiber');
var shortcuts = require('shortcuts');
var GoogleFontLoader = _interopDefault(require('react-google-font-loader'));
var OutsideClickHandler = _interopDefault(require('react-outside-click-handler'));
var bi = require('react-icons/bi');

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

function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];

  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }

  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");

  return typeof key === "symbol" ? key : String(key);
}

var _css$global;

var _createStyled = /*#__PURE__*/react.createStyled({
  tokens: {
    colors: {
      $darkGrey: '#0c0c0c',
      $darkGreyLighter: '#161617',
      $white: 'white',
      $lightPurple: '#9494b7',
      $faint: '#22222b',
      $purple: '#3e3ca2',
      $faintPurple: '#56566f',
      $midPurple: '#636380',
      $darkPurple: '#212052',
      $pink: '#d72859'
    },
    sizes: {
      $sidebar: '220px',
      $sidebarPlus: '260px',
      $headerHeight: '42px'
    },
    space: {
      $0b: '2px',
      $1: '4px',
      $1b: '6px',
      $2: '8px',
      $2b: '12px',
      $3: '16px'
    },
    fonts: {
      $main: 'Roboto, sans-serif'
    },
    fontSizes: {
      $1: '10px',
      $1b: '12px',
      $2: '14px',
      $3: '18px',
      $4: '22px'
    },
    fontWeights: {
      $regular: '400',
      $semi: '500',
      $medium: '600',
      $bold: '700'
    },
    radii: {
      $1: '3px',
      $2: '6px'
    },
    zIndices: {
      $high: '9999999',
      $max: '99999999999'
    }
  }
}),
    css = _createStyled.css,
    styled = _createStyled.styled;
css.global((_css$global = {}, _css$global["*, *:before, *:after"] = {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
  maxWidth: '100%'
}, _css$global));

var StyledContainer = /*#__PURE__*/styled('div', {});
var StyledInput = /*#__PURE__*/styled('input', {
  appearance: 'none',
  backgroundColor: '$darkGreyLighter',
  border: '1px solid $faintPurple',
  color: '$lightPurple',
  width: '100%',
  padding: '$1b',
  fontSize: '$1b',
  ':focus': {
    backgroundColor: '$darkGrey',
    color: '$white'
  }
});
var TextInput = function TextInput(_ref) {
  var inputId = _ref.inputId,
      value = _ref.value,
      passedOnChange = _ref.onChange;

  var _useState = React.useState(value != null ? value : ''),
      inputValue = _useState[0],
      setInputValue = _useState[1];

  React.useEffect(function () {
    setInputValue(value != null ? value : '');
  }, [value]);

  var _useMemo = React.useMemo(function () {
    return {
      onChange: function onChange(event) {
        var newValue = event.target.value;
        setInputValue(newValue);
        passedOnChange(newValue);
      }
    };
  }, [passedOnChange]),
      onChange = _useMemo.onChange;

  return React__default.createElement(StyledContainer, null, React__default.createElement(StyledInput, {
    id: inputId,
    type: "text",
    value: inputValue,
    onChange: onChange
  }));
};

var parseNumber = function parseNumber(v) {
  if (typeof v === 'number') return v;

  try {
    var _v = evaluate(v);

    if (!isNaN(_v)) return _v;
  } catch (_unused) {}

  return parseFloat(v);
};
var parens = /\(([0-9+\-*/^ .]+)\)/; // Regex for identifying parenthetical expressions

var exp = /(\d+(?:\.\d+)?) ?\^ ?(\d+(?:\.\d+)?)/; // Regex for identifying exponentials (x ^ y)

var mul = /(\d+(?:\.\d+)?) ?\* ?(\d+(?:\.\d+)?)/; // Regex for identifying multiplication (x * y)

var div = /(\d+(?:\.\d+)?) ?\/ ?(\d+(?:\.\d+)?)/; // Regex for identifying division (x / y)

var add = /(\d+(?:\.\d+)?) ?\+ ?(\d+(?:\.\d+)?)/; // Regex for identifying addition (x + y)

var sub = /(\d+(?:\.\d+)?) ?- ?(\d+(?:\.\d+)?)/; // Regex for identifying subtraction (x - y)

/**
 * Copyright: copied from here: https://stackoverflow.com/a/63105543
 * by @aanrudolph2 https://github.com/aanrudolph2
 *
 * Evaluates a numerical expression as a string and returns a Number
 * Follows standard PEMDAS operation ordering
 * @param {String} expr Numerical expression input
 * @returns {Number} Result of expression
 */

function evaluate(expr) {
  if (isNaN(Number(expr))) {
    if (parens.test(expr)) {
      var newExpr = expr.replace(parens, function (_match, subExpr) {
        return String(evaluate(subExpr));
      });
      return evaluate(newExpr);
    } else if (exp.test(expr)) {
      var _newExpr = expr.replace(exp, function (_match, base, pow) {
        return String(Math.pow(Number(base), Number(pow)));
      });

      return evaluate(_newExpr);
    } else if (mul.test(expr)) {
      var _newExpr2 = expr.replace(mul, function (_match, a, b) {
        return String(Number(a) * Number(b));
      });

      return evaluate(_newExpr2);
    } else if (div.test(expr)) {
      var _newExpr3 = expr.replace(div, function (_match, a, b) {
        // b can equal either 0 or "0" this is on purpose
        // eslint-disable-next-line eqeqeq
        if (b != 0) return String(Number(a) / Number(b));else throw new Error('Division by zero');
      });

      return evaluate(_newExpr3);
    } else if (add.test(expr)) {
      var _newExpr4 = expr.replace(add, function (_match, a, b) {
        return String(Number(a) + Number(b));
      });

      return evaluate(_newExpr4);
    } else if (sub.test(expr)) {
      var _newExpr5 = expr.replace(sub, function (_match, a, b) {
        return String(Number(a) - Number(b));
      });

      return evaluate(_newExpr5);
    } else {
      return Number(expr);
    }
  }

  return Number(expr);
}

var StyledContainer$1 = /*#__PURE__*/styled('div', {});
var NumberInput = function NumberInput(_ref) {
  var inputId = _ref.inputId,
      value = _ref.value,
      passedOnChange = _ref.onChange;

  var _useState = React.useState(value != null ? value : 0),
      inputValue = _useState[0],
      setInputValue = _useState[1];

  React.useEffect(function () {
    setInputValue(value != null ? value : 0);
  }, [value]);

  var _useMemo = React.useMemo(function () {
    return {
      onChange: function onChange(event) {
        var newValue = parseNumber(event.target.value);
        setInputValue(newValue);
        passedOnChange(newValue);
      }
    };
  }, [passedOnChange]),
      onChange = _useMemo.onChange;

  return React__default.createElement(StyledContainer$1, null, React__default.createElement(StyledInput, {
    id: inputId,
    type: "number",
    value: inputValue,
    onChange: onChange
  }));
};

var inputComponents = {
  text: {
    input: TextInput
  },
  number: {
    input: NumberInput
  }
};

var UnknownInput = function UnknownInput(props) {
  var _useState = React.useState(function () {
    var value = props.value;

    if (typeof value === 'number') {
      return inputComponents.number.input;
    }

    return inputComponents.text.input;
  }),
      InputComponent = _useState[0];

  return React__default.createElement(InputComponent, Object.assign({}, props));
};

var StyledContainer$2 = /*#__PURE__*/styled('div', {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
  columnGap: '$2b'
});
var StyledItem = /*#__PURE__*/styled('div', {
  display: 'grid',
  alignItems: 'center',
  columnGap: '$1b',
  gridTemplateColumns: 'auto minmax(0, 1fr)'
});
var StyledLabel = /*#__PURE__*/styled('label', {
  fontSize: '$1b'
});
var MultiNumberInput = function MultiNumberInput(_ref) {
  var inputId = _ref.inputId,
      value = _ref.value,
      passedOnChange = _ref.onChange;
  return React__default.createElement(StyledContainer$2, null, Object.entries(value).map(function (_ref2, index) {
    var entryKey = _ref2[0],
        entryValue = _ref2[1];
    var id = index === 0 ? inputId : inputId + "/" + entryKey;
    return React__default.createElement(StyledItem, {
      key: entryKey
    }, React__default.createElement(StyledLabel, {
      htmlFor: id
    }, entryKey), React__default.createElement(UnknownInput, {
      inputId: id,
      value: entryValue,
      onChange: function onChange(newValue) {
        var _extends2;

        passedOnChange(_extends({}, value, (_extends2 = {}, _extends2[entryKey] = newValue, _extends2)));
      }
    }));
  }));
};

var initialStoreState = {
  componentNames: {},
  components: {},
  sharedComponents: {},
  selectedComponents: {},
  componentsTree: {},
  unsavedComponents: {},
  deactivatedComponents: {},
  groups: {},
  groupedComponents: {}
};
var useMainStateStore = /*#__PURE__*/create( /*#__PURE__*/middleware.persist(function () {
  return initialStoreState;
}, {
  name: 'mainStateStore',
  // @ts-ignore
  onRehydrateStorage: function onRehydrateStorage() {
    return function (state) {
    };
  },
  version: 5,
  blacklist: []
}));
var setMainStateStoreState = useMainStateStore.setState,
    getMainStateStoreState = useMainStateStore.getState;

var incrementor = 0;
var generateUid = function generateUid() {
  incrementor += 1;
  return (Date.now() + incrementor).toString();
};
var getCombinedId = function getCombinedId(ids) {
  return ids.join('/');
};

var EditorTransformMode;

(function (EditorTransformMode) {
  EditorTransformMode["translate"] = "translate";
  EditorTransformMode["rotate"] = "rotate";
  EditorTransformMode["scale"] = "scale";
})(EditorTransformMode || (EditorTransformMode = {}));

var editorStateProxy = /*#__PURE__*/valtio.proxy({
  editMode: false,
  transformMode: EditorTransformMode.translate,
  groupPortalRef: null,
  orbitRef: null,
  selectedRef: null,
  cameraCanvasRef: null,
  mainCamera: null,
  transformActive: false,
  addComponentKey: '',
  movingComponents: [],
  addComponentPosition: {
    x: 0,
    y: 0,
    z: 0
  }
});
var useIsEditMode = function useIsEditMode() {
  return valtio.useProxy(editorStateProxy).editMode;
};
var setEditMode = function setEditMode(editMode) {
  editorStateProxy.editMode = editMode;
};
var useGroupPortalRef = function useGroupPortalRef() {
  return valtio.useProxy(editorStateProxy).groupPortalRef;
};
var useTransformMode = function useTransformMode() {
  return valtio.useProxy(editorStateProxy).transformMode;
};
var setTransformMode = function setTransformMode(mode) {
  editorStateProxy.transformMode = mode;
};
var PendingPasteType;

(function (PendingPasteType) {
  PendingPasteType["COMPONENTS"] = "COMPONENTS";
})(PendingPasteType || (PendingPasteType = {}));

var clipboardProxy = /*#__PURE__*/valtio.proxy({
  pendingPaste: null
});
var addToClipboard = function addToClipboard(pendingPaste) {
  clipboardProxy.pendingPaste = valtio.ref(pendingPaste);
};
var clearClipboard = function clearClipboard() {
  clipboardProxy.pendingPaste = null;
};

var getSelectedComponents = function getSelectedComponents() {
  return getMainStateStoreState().selectedComponents;
};

// @ts-ignore

var useHistoryStore = /*#__PURE__*/create( /*#__PURE__*/middleware.persist(function () {
  return {
    pastSnapshots: [],
    futureSnapshots: []
  };
}, {
  name: 'historyStore',
  version: 1
}));

var storeSnapshot = function storeSnapshot() {
  useHistoryStore.setState(function (state) {
    var pastSnapshots = state.pastSnapshots.concat([useMainStateStore.getState()]);

    if (pastSnapshots.length > 20) {
      pastSnapshots.shift();
    }

    return {
      pastSnapshots: pastSnapshots,
      futureSnapshots: []
    };
  });
};
var undoState = function undoState() {
  var pastSnapshots = useHistoryStore.getState().pastSnapshots;
  var newSnapshot = pastSnapshots[pastSnapshots.length - 1];
  if (!newSnapshot) return;
  var currentSnapshot = useMainStateStore.getState();
  useMainStateStore.setState(newSnapshot);
  useHistoryStore.setState(function (state) {
    return {
      pastSnapshots: pastSnapshots.slice(0, pastSnapshots.length - 1),
      futureSnapshots: state.futureSnapshots.concat([currentSnapshot])
    };
  });
};
var redoState = function redoState() {
  var futureSnapshots = useHistoryStore.getState().futureSnapshots;
  var newSnapshot = futureSnapshots[futureSnapshots.length - 1];
  if (!newSnapshot) return;
  var currentSnapshot = useMainStateStore.getState();
  useMainStateStore.setState(newSnapshot);
  useHistoryStore.setState(function (state) {
    return {
      futureSnapshots: futureSnapshots.slice(0, futureSnapshots.length - 1),
      pastSnapshots: state.pastSnapshots.concat([currentSnapshot])
    };
  });
};

var resetComponentProp = function resetComponentProp(componentId, propKey) {
  setMainStateStoreState(function (state) {
    var _state$components$com, _component$overridden, _extends2, _extends3;

    var component = (_state$components$com = state.components[componentId]) != null ? _state$components$com : {};
    component = _extends({}, component, {
      overriddenState: _extends({}, (_component$overridden = component.overriddenState) != null ? _component$overridden : {}, (_extends2 = {}, _extends2[propKey] = true, _extends2))
    });
    return {
      components: _extends({}, state.components, (_extends3 = {}, _extends3[componentId] = component, _extends3))
    };
  });
};
var setSharedComponentPropValue = function setSharedComponentPropValue(componentTypeId, propKey, propValue) {
  setMainStateStoreState(function (state) {
    var _state$sharedComponen, _component$appliedSta, _extends4, _extends5;

    var component = (_state$sharedComponen = state.sharedComponents[componentTypeId]) != null ? _state$sharedComponen : {};
    component = _extends({}, component, {
      appliedState: _extends({}, (_component$appliedSta = component.appliedState) != null ? _component$appliedSta : {}, (_extends4 = {}, _extends4[propKey] = {
        value: propValue
      }, _extends4))
    });
    return {
      sharedComponents: _extends({}, state.sharedComponents, (_extends5 = {}, _extends5[componentTypeId] = component, _extends5))
    };
  });
};
var setComponentPropValue = function setComponentPropValue(componentId, propKey, propValue) {
  setMainStateStoreState(function (state) {
    var _state$components$com2, _component$modifiedSt2, _extends6, _extends7;

    var component = (_state$components$com2 = state.components[componentId]) != null ? _state$components$com2 : {};
    var updatedValue = propValue;

    if (typeof propValue === 'function') {
      var _component = component,
          _component$modifiedSt = _component.modifiedState,
          modifiedState = _component$modifiedSt === void 0 ? {} : _component$modifiedSt;
      var _modifiedState$propKe = modifiedState[propKey],
          originalProp = _modifiedState$propKe === void 0 ? {
        value: undefined
      } : _modifiedState$propKe;
      var value = originalProp.value;
      updatedValue = propValue(value);
    }

    component = _extends({}, component, {
      modifiedState: _extends({}, (_component$modifiedSt2 = component.modifiedState) != null ? _component$modifiedSt2 : {}, (_extends6 = {}, _extends6[propKey] = {
        value: updatedValue
      }, _extends6))
    });

    if (component.overriddenState && component.overriddenState[propKey]) {
      delete component.overriddenState[propKey];
    }

    return {
      components: _extends({}, state.components, (_extends7 = {}, _extends7[componentId] = component, _extends7))
    };
  });
};
var updateSelectedComponents = function updateSelectedComponents(updateFn) {
  setMainStateStoreState(function (state) {
    return {
      selectedComponents: updateFn(state.selectedComponents)
    };
  });
};
var setSelectedComponents = function setSelectedComponents(selected, replace) {
  if (replace === void 0) {
    replace = true;
  }

  setMainStateStoreState(function (state) {
    return {
      selectedComponents: replace ? selected : _extends({}, state.selectedComponents, selected)
    };
  });
};
var setComponentsTree = function setComponentsTree(tree) {
  var componentsTree = {};
  Object.values(tree.items).forEach(function (_ref) {
    var id = _ref.id,
        children = _ref.children,
        isExpanded = _ref.isExpanded;
    componentsTree[id] = {
      children: children,
      isExpanded: isExpanded
    };
  });
  setMainStateStoreState({
    componentsTree: componentsTree
  });
};
var setComponentTreeItemExpanded = function setComponentTreeItemExpanded(id, isExpanded) {
  setMainStateStoreState(function (state) {
    var _state$componentsTree, _extends8;

    return {
      componentsTree: _extends({}, state.componentsTree, (_extends8 = {}, _extends8[id] = _extends({}, (_state$componentsTree = state.componentsTree[id]) != null ? _state$componentsTree : {
        children: []
      }, {
        isExpanded: isExpanded
      }), _extends8))
    };
  });
};
var addUnsavedComponent = function addUnsavedComponent(addable, parent, initialProps) {
  var id = generateUid();
  setMainStateStoreState(function (state) {
    var _addable$props, _extends9;

    return {
      unsavedComponents: _extends({}, state.unsavedComponents, (_extends9 = {}, _extends9[id] = {
        uid: id,
        name: addable.name,
        componentId: addable.id,
        children: [],
        isRoot: !parent,
        initialProps: _extends({}, (_addable$props = addable.props) != null ? _addable$props : {}, initialProps != null ? initialProps : {})
      }, _extends9))
    };
  });

  if (parent) {
    setComponentPropValue(parent, predefinedPropKeys.children, function (state) {
      state = state ? state : [];
      return state.concat([id]);
    });
  }

  return getCombinedId([parent, id]);
};

var getGroupChildren = function getGroupChildren(groupId) {
  var state = getMainStateStoreState();
  var groupChildren = [];
  Object.entries(state.groupedComponents).forEach(function (_ref2) {
    var componentId = _ref2[0],
        componentIdGroup = _ref2[1];

    if (componentIdGroup === groupId) {
      groupChildren.push(componentId);
    }
  });
  return groupChildren;
};

var deleteGroup = function deleteGroup(id) {
  var children = getGroupChildren(id);
  children.forEach(function (childId) {
    deleteComponent(childId);
  });
  setMainStateStoreState(function (state) {
    var updatedGroups = _extends({}, state.groups);

    delete updatedGroups[id];
    return {
      groups: updatedGroups
    };
  });
};
var deleteComponent = function deleteComponent(id) {
  var state = getMainStateStoreState();

  if (state.groups[id]) {
    deleteGroup(id);
  } else if (state.unsavedComponents[id]) {
    deleteUnsavedComponent(id);
  } else {
    addDeactivatedComponent(id);
  } // todo - deselect deleted components

};
var deleteSelectedComponents = function deleteSelectedComponents() {
  storeSnapshot();
  var selectedComponents = getMainStateStoreState().selectedComponents;
  Object.keys(selectedComponents).forEach(function (component) {
    deleteComponent(component);
  });
};
var deleteUnsavedComponent = function deleteUnsavedComponent(id) {
  setMainStateStoreState(function (state) {
    var updated = _extends({}, state.unsavedComponents);

    delete updated[id];
    return {
      unsavedComponents: updated
    };
  });
};
var addDeactivatedComponent = function addDeactivatedComponent(id) {
  setMainStateStoreState(function (state) {
    var _extends10;

    return {
      deactivatedComponents: _extends({}, state.deactivatedComponents, (_extends10 = {}, _extends10[id] = true, _extends10))
    };
  });
};
var removeDeactivatedComponents = function removeDeactivatedComponents(ids) {
  setMainStateStoreState(function (state) {
    var updated = _extends({}, state.deactivatedComponents);

    ids.forEach(function (id) {
      delete updated[id];
    });
    return {
      deactivatedComponents: updated
    };
  });
};
var groupComponents = function groupComponents(ids, groupId) {
  var sameParent = true;
  var currentParent = '';
  var groupedComponents = getMainStateStoreState().groupedComponents;
  ids.forEach(function (id) {
    var parentId = groupedComponents[id];

    if (parentId) {
      if (currentParent && currentParent !== parentId) {
        sameParent = false;
      } else {
        currentParent = parentId;
      }
    }
  }); // @ts-ignore

  setMainStateStoreState(function (state) {
    var _state$groupedCompone;

    var update = {
      groupedComponents: _extends({}, (_state$groupedCompone = state.groupedComponents) != null ? _state$groupedCompone : {})
    };

    if (!groupId) {
      var _state$groups, _extends11;

      groupId = generateUid();
      update.groups = _extends({}, (_state$groups = state.groups) != null ? _state$groups : {}, (_extends11 = {}, _extends11[groupId] = {
        name: 'Group',
        isExpanded: true
      }, _extends11));
    }

    if (sameParent) {
      // @ts-ignore
      update.groupedComponents[groupId] = currentParent;
    }

    ids.forEach(function (id) {
      // @ts-ignore
      update.groupedComponents[id] = groupId;
    });
    return update;
  });
};
var updateComponentLocation = function updateComponentLocation(id, newDestination) {
  if (newDestination === ROOT_ID) {
    setMainStateStoreState(function (state) {
      var update = _extends({}, state.groupedComponents);

      delete update[id];
      return {
        groupedComponents: update
      };
    });
  } else {
    var groups = getMainStateStoreState().groups;

    if (groups[newDestination]) {
      groupComponents([id], newDestination);
    }
  }
};
var setComponentName = function setComponentName(id, name) {
  setMainStateStoreState(function (state) {
    var _extends12;

    return {
      componentNames: _extends({}, state.componentNames, (_extends12 = {}, _extends12[id] = {
        name: name
      }, _extends12))
    };
  });
};
var setGroupName = function setGroupName(id, name) {
  setMainStateStoreState(function (state) {
    var _state$groups$id, _extends13;

    return {
      groups: _extends({}, state.groups, (_extends13 = {}, _extends13[id] = _extends({}, (_state$groups$id = state.groups[id]) != null ? _state$groups$id : {}, {
        name: name
      }), _extends13))
    };
  });
};
var copySelectedComponents = function copySelectedComponents() {
  addToClipboard({
    type: PendingPasteType.COMPONENTS,
    data: getSelectedComponents()
  });
};

var getComponentPropValue = function getComponentPropValue(component, propKey) {
  var _component$modifiedSt3 = component.modifiedState,
      modifiedState = _component$modifiedSt3 === void 0 ? {} : _component$modifiedSt3;
  return modifiedState[propKey];
};

var cloneComponentWithinState = function cloneComponentWithinState(state, componentId, componentIdWithParentId, parentId) {
  console.log('looking for', componentId);
  var rawId = generateUid();
  var newId = parentId ? getCombinedId([parentId, rawId]) : rawId;
  var unsavedComponent = state.unsavedComponents[componentId];

  if (unsavedComponent) {
    var _extends14;

    state.unsavedComponents = _extends({}, state.unsavedComponents, (_extends14 = {}, _extends14[rawId] = _extends({}, unsavedComponent, {
      uid: rawId,
      children: []
    }), _extends14));
  }

  var component = state.components[componentIdWithParentId];

  if (component) {
    var _extends15;

    state.components = _extends({}, state.components, (_extends15 = {}, _extends15[newId] = component, _extends15));
    var childrenProp = getComponentPropValue(component, predefinedPropKeys.children);

    if (childrenProp) {
      var _component$modifiedSt4, _extends16;

      var _childrenProp$value = childrenProp.value,
          children = _childrenProp$value === void 0 ? [] : _childrenProp$value;
      var newChildren = [];
      children.forEach(function (childId) {
        newChildren.push(cloneComponentWithinState(state, childId, getCombinedId([componentId, childId]), newId));
      });
      state.components[newId] = _extends({}, component, {
        modifiedState: _extends({}, (_component$modifiedSt4 = component.modifiedState) != null ? _component$modifiedSt4 : {}, (_extends16 = {}, _extends16[predefinedPropKeys.children] = {
          value: newChildren
        }, _extends16))
      });
    }
  }

  if (state.groupedComponents[componentId]) {
    var _extends17;

    state.groupedComponents = _extends({}, state.groupedComponents, (_extends17 = {}, _extends17[newId] = state.groupedComponents[componentId], _extends17));
  }

  console.log('newId', newId, rawId);
  return rawId;
};

var cloneComponents = function cloneComponents(components) {
  var newIds = [];
  setMainStateStoreState(function (state) {
    var updatedState = _extends({}, state);

    components.forEach(function (componentId) {
      var id = cloneComponentWithinState(updatedState, componentId, componentId);
      newIds.push(id);
    });
    return updatedState;
  });
  return newIds;
};

var handlePasteComponents = function handlePasteComponents(components) {
  storeSnapshot();
  var addedComponents = {};
  var newIds = cloneComponents(components);
  newIds.forEach(function (componentId) {
    addedComponents[componentId] = true;
  });
  setSelectedComponents(addedComponents);
};

var handlePaste = function handlePaste() {
  if (clipboardProxy.pendingPaste) {
    switch (clipboardProxy.pendingPaste.type) {
      case PendingPasteType.COMPONENTS:
        handlePasteComponents(Object.keys(clipboardProxy.pendingPaste.data));
        break;
    }
  }

  clearClipboard();
};

var useSelectedComponents = function useSelectedComponents() {
  return useMainStateStore(function (state) {
    return state.selectedComponents;
  });
};
var useSoleSelectedComponent = function useSoleSelectedComponent() {
  var selectedComponents = Object.keys(useSelectedComponents());
  return selectedComponents.length === 1 ? selectedComponents[0] : '';
};
var useComponentState = function useComponentState(id) {
  var _useMainStateStore;

  return (_useMainStateStore = useMainStateStore(function (state) {
    return state.components[id];
  })) != null ? _useMainStateStore : {};
};
var useSharedComponent = function useSharedComponent(id) {
  var _useMainStateStore3;

  return (_useMainStateStore3 = useMainStateStore(function (state) {
    return state.sharedComponents[id];
  })) != null ? _useMainStateStore3 : {};
};
var useUnsavedComponents = function useUnsavedComponents() {
  var _useMainStateStore4;

  return (_useMainStateStore4 = useMainStateStore(function (state) {
    return state.unsavedComponents;
  })) != null ? _useMainStateStore4 : {};
};
var useUnsavedComponent = function useUnsavedComponent(id) {
  return useMainStateStore(function (state) {
    return state.unsavedComponents[id];
  });
};
var useIsDeactivated = function useIsDeactivated(id) {
  var _useMainStateStore5;

  return (_useMainStateStore5 = useMainStateStore(function (state) {
    return state.deactivatedComponents[id];
  })) != null ? _useMainStateStore5 : false;
};
var useComponentName = function useComponentName(id) {
  var _useMainStateStore6;

  return (_useMainStateStore6 = useMainStateStore(function (state) {
    var _state$componentNames;

    return (_state$componentNames = state.componentNames[id]) == null ? void 0 : _state$componentNames.name;
  })) != null ? _useMainStateStore6 : '';
};

var useComponentsStore = /*#__PURE__*/create(function () {
  return {
    components: {},
    deactivatedComponents: {},
    componentsThatCanHaveChildren: {}
  };
});
var setComponentInitialProps = function setComponentInitialProps(uid, initialProps) {
  // @ts-ignore
  useComponentsStore.setState(function (state) {
    var _state$components$uid, _extends2;

    if (!state.components[uid]) return {};
    return {
      components: _extends({}, state.components, (_extends2 = {}, _extends2[uid] = _extends({}, (_state$components$uid = state.components[uid]) != null ? _state$components$uid : {}, {
        initialProps: initialProps
      }), _extends2))
    };
  });
};
var setComponentCanHaveChildren = function setComponentCanHaveChildren(id) {
  useComponentsStore.setState(function (state) {
    var _extends3;

    return {
      componentsThatCanHaveChildren: _extends({}, state.componentsThatCanHaveChildren, (_extends3 = {}, _extends3[id] = true, _extends3))
    };
  });
  return function () {
    useComponentsStore.setState(function (state) {
      var updated = _extends({}, state.componentsThatCanHaveChildren);

      delete updated[id];
      return {
        componentsThatCanHaveChildren: updated
      };
    });
  };
};
var setComponentChildren = function setComponentChildren(uid, children) {
  // @ts-ignore
  useComponentsStore.setState(function (state) {
    var _state$components$uid2, _extends4;

    if (!state.components[uid]) return {};
    return {
      components: _extends({}, state.components, (_extends4 = {}, _extends4[uid] = _extends({}, (_state$components$uid2 = state.components[uid]) != null ? _state$components$uid2 : {}, {
        children: children
      }), _extends4))
    };
  });
};
var addComponent = function addComponent(uid, name, children, isRoot, unsaved, initialProps, componentId, parentId, rootParentId) {
  if (initialProps === void 0) {
    initialProps = {};
  }

  useComponentsStore.setState(function (state) {
    var _extends5;

    return {
      components: _extends({}, state.components, (_extends5 = {}, _extends5[uid] = {
        uid: uid,
        name: name,
        children: children,
        isRoot: isRoot,
        unsaved: unsaved,
        initialProps: initialProps,
        componentId: componentId,
        parentId: parentId,
        rootParentId: rootParentId
      }, _extends5))
    };
  });
};
var removeComponent = function removeComponent(uid) {
  useComponentsStore.setState(function (state) {
    var components = _extends({}, state.components);

    delete components[uid];
    return {
      components: components
    };
  });
};
var addDeactivatedComponent$1 = function addDeactivatedComponent(uid, name, children, isRoot, unsaved, parentId, rootParentId) {
  useComponentsStore.setState(function (state) {
    var _extends6;

    return {
      deactivatedComponents: _extends({}, state.deactivatedComponents, (_extends6 = {}, _extends6[uid] = {
        uid: uid,
        name: name,
        children: children,
        isRoot: isRoot,
        unsaved: unsaved,
        parentId: parentId,
        rootParentId: rootParentId
      }, _extends6))
    };
  });
};
var removeDeactivatedComponent = function removeDeactivatedComponent(uid) {
  useComponentsStore.setState(function (state) {
    var components = _extends({}, state.deactivatedComponents);

    delete components[uid];
    return {
      deactivatedComponents: components
    };
  });
};

var useComponent = function useComponent(id) {
  return useComponentsStore(function (state) {
    return state.components[id];
  });
};
var useComponentInitialProps = function useComponentInitialProps(id) {
  var _component$initialPro;

  var component = useComponent(id);
  return (_component$initialPro = component == null ? void 0 : component.initialProps) != null ? _component$initialPro : {};
};
var useComponentCanHaveChildren = function useComponentCanHaveChildren(id) {
  var _useComponentsStore;

  return (_useComponentsStore = useComponentsStore(function (state) {
    return state.componentsThatCanHaveChildren[id];
  })) != null ? _useComponentsStore : false;
};

var KEYS = {
  Delete: 8,
  Space: 32
};
var useHotkeysListener = function useHotkeysListener() {
  React.useEffect(function () {
    hotkeys('*', function () {});
  }, []);
};
var isCommandPressed = function isCommandPressed() {
  var _ref;

  return (_ref = hotkeys.command || hotkeys.cmd || hotkeys.control) != null ? _ref : false;
};
var isShiftPressed = function isShiftPressed() {
  var _hotkeys$shift;

  return (_hotkeys$shift = hotkeys.shift) != null ? _hotkeys$shift : false;
};
var isSpacePressed = function isSpacePressed() {
  return hotkeys.isPressed(KEYS.Space);
};

var PropOrigin;

(function (PropOrigin) {
  PropOrigin["modified"] = "modified";
  PropOrigin["initial"] = "initial";
  PropOrigin["applied"] = "applied";
  PropOrigin["default"] = "default";
})(PropOrigin || (PropOrigin = {}));

var usePropsStore = /*#__PURE__*/create(function () {
  return {
    components: {}
  };
});
var setComponentProps = function setComponentProps(id, updateFn) {
  usePropsStore.setState(function (state) {
    var _state$components$id, _extends2;

    return {
      components: _extends({}, state.components, (_extends2 = {}, _extends2[id] = updateFn((_state$components$id = state.components[id]) != null ? _state$components$id : {}), _extends2))
    };
  });
};
var useComponentProps = function useComponentProps(id) {
  var _usePropsStore;

  return (_usePropsStore = usePropsStore(function (state) {
    return state.components[id];
  })) != null ? _usePropsStore : {};
};

var getBodyType = function getBodyType(bodyType) {
  switch (bodyType) {
    case RigidBodyType.STATIC:
      return rapier3dCompat.BodyStatus.Static;

    case RigidBodyType.KINEMATIC:
      return rapier3dCompat.BodyStatus.Kinematic;

    default:
      return rapier3dCompat.BodyStatus.Dynamic;
  }
};

var generateRigidBodyCollider = function generateRigidBodyCollider(collider) {
  switch (collider.colliderType) {
    case RigidBodyColliderShape.BALL:
      var _collider$radius = collider.radius,
          radius = _collider$radius === void 0 ? 1 : _collider$radius;
      return {
        type: 'Ball',
        args: [radius]
      };

    default:
      var _collider$hx = collider.hx,
          hx = _collider$hx === void 0 ? 0.5 : _collider$hx,
          _collider$hy = collider.hy,
          hy = _collider$hy === void 0 ? 0.5 : _collider$hy,
          _collider$hz = collider.hz,
          hz = _collider$hz === void 0 ? 0.5 : _collider$hz;
      return {
        type: 'Cubiod',
        args: [hx, hy, hz]
      };
  }
};

var generateRigidBodyColliders = function generateRigidBodyColliders(colliders) {
  if (colliders === void 0) {
    colliders = [];
  }

  var defs = [];
  colliders.forEach(function (collider) {
    defs.push(generateRigidBodyCollider(collider));
  });
  return defs;
};

var generateRigidBodySpec = function generateRigidBodySpec(config, position, rotation) {
  var _config$mass, _config$customBodyDef, _config$customBodyDef2;

  if (rotation === void 0) {
    rotation = [0, 0, 0];
  }

  var colliders = generateRigidBodyColliders(config.colliders);
  var mass = (_config$mass = config.mass) != null ? _config$mass : 1;
  var quaternion = getQuaternionFromEuler(rotation[0], rotation[1], rotation[2]);
  var customBody = (_config$customBodyDef = (_config$customBodyDef2 = config.customBodyDef) == null ? void 0 : _config$customBodyDef2.customBody) != null ? _config$customBodyDef : '';
  return {
    body: {
      type: getBodyType(config.bodyType),
      position: position,
      quaternion: [quaternion.x, quaternion.y, quaternion.z, quaternion.w],
      mass: mass
    },
    colliders: colliders,
    customBody: customBody
  };
};

var getQuaternionFromEuler = function getQuaternionFromEuler(x, y, z) {
  var euler = new three.Euler(x, y, z);
  var quaternion = new three.Quaternion();
  quaternion.setFromEuler(euler);
  return quaternion;
};

var RigidBody3DModule = function RigidBody3DModule(_ref) {
  var _useEditableProp;

  var value = _ref.value,
      meshRef = _ref.meshRef;
  var id = useEditableId();

  var _useEditableContext = useEditableContext(),
      setSharedProp = _useEditableContext.setSharedProp;

  var _ref2 = (_useEditableProp = useEditableProp(predefinedPropKeys.rotation)) != null ? _useEditableProp : {
    x: 0,
    y: 0,
    z: 0
  },
      rX = _ref2.x,
      rY = _ref2.y,
      rZ = _ref2.z;

  rggEngine.useRapier3DBody(function () {
    var position = meshRef.current.position;
    return generateRigidBodySpec(value, [position.x, position.y, position.z], [rX, rY, rZ]);
  }, {
    ref: meshRef,
    id: id
  });
  var api = rggEngine.useBodyApi(id);
  React.useEffect(function () {
    setSharedProp('rigidBody3dApi', api);
  }, [api]);
  return null;
};

var ColliderVisualiser = function ColliderVisualiser(_ref3) {
  var collider = _ref3.collider;

  if (collider.colliderType === RigidBodyColliderShape.BALL) {
    var _collider$radius2 = collider.radius,
        radius = _collider$radius2 === void 0 ? 1 : _collider$radius2;
    return React__default.createElement(drei.Sphere, {
      args: [radius + 0.001],
      layers: [31]
    }, React__default.createElement("meshPhongMaterial", {
      color: "red",
      wireframe: true
    }));
  } else if (collider.colliderType === RigidBodyColliderShape.CUBIOD) {
    var _collider$hx2 = collider.hx,
        hx = _collider$hx2 === void 0 ? 0.5 : _collider$hx2,
        _collider$hy2 = collider.hy,
        hy = _collider$hy2 === void 0 ? 0.5 : _collider$hy2,
        _collider$hz2 = collider.hz,
        hz = _collider$hz2 === void 0 ? 0.5 : _collider$hz2;
    return React__default.createElement(drei.Box, {
      args: [hx * 2, hy * 2, hz * 2],
      layers: [31]
    }, React__default.createElement("meshPhongMaterial", {
      color: "red",
      wireframe: true
    }));
  }

  return null;
};

var RigidBody3DModuleVisualizer = function RigidBody3DModuleVisualizer(_ref4) {
  var _useEditableProp2;

  var value = _ref4.value,
      visible = _ref4.visible;
  var _value$colliders = value.colliders,
      colliders = _value$colliders === void 0 ? [] : _value$colliders;
  var scale = (_useEditableProp2 = useEditableProp(predefinedPropKeys.scale)) != null ? _useEditableProp2 : {
    x: 1,
    y: 1,
    z: 1
  };
  return React__default.createElement("group", {
    visible: visible,
    scale: [1 / scale.x, 1 / scale.y, 1 / scale.z]
  }, colliders.map(function (collider) {
    return React__default.createElement(ColliderVisualiser, {
      collider: collider,
      key: collider.key
    });
  }));
};

var RigidBody3DModuleWrapper = function RigidBody3DModuleWrapper(_ref5) {
  var value = _ref5.value;
  var meshRef = useEditableSharedProp('meshRef');
  var isEditMode = useIsEditMode();
  if (!meshRef) return null;
  if (!value.enabled) return null;
  return React__default.createElement(React__default.Fragment, null, !isEditMode && React__default.createElement(RigidBody3DModule, {
    meshRef: meshRef,
    value: value
  }), React__default.createElement(RigidBody3DModuleVisualizer, {
    value: value,
    visible: isEditMode
  }));
};

var EditableModules = function EditableModules(_ref6) {
  var children = _ref6.children;
  useEditableProp(modulesProp.key);
  var rigidBody3d = useEditableProp(predefinedPropKeys.rigidBody3d);
  return React__default.createElement(React__default.Fragment, null, children, rigidBody3d && React__default.createElement(RigidBody3DModuleWrapper, {
    value: rigidBody3d
  }));
};

var TransformControls = function TransformControls(camera, domElement) {
  if (domElement === undefined) {
    console.warn('THREE.TransformControls: The second parameter "domElement" is now mandatory.');
    domElement = document;
  }

  three.Object3D.call(this);
  this.visible = false;
  this.domElement = domElement;

  var _gizmo = new TransformControlsGizmo();

  this.add(_gizmo);

  var _plane = new TransformControlsPlane();

  this.add(_plane);
  var scope = this; // Define properties with getters/setter
  // Setting the defined property will automatically trigger change event
  // Defined properties are passed down to gizmo and plane

  defineProperty('camera', camera);
  defineProperty('object', undefined);
  defineProperty('enabled', true);
  defineProperty('axis', null);
  defineProperty('mode', 'translate');
  defineProperty('translationSnap', null);
  defineProperty('rotationSnap', null);
  defineProperty('scaleSnap', null);
  defineProperty('space', 'world');
  defineProperty('size', 1);
  defineProperty('dragging', false);
  defineProperty('showX', true);
  defineProperty('showY', true);
  defineProperty('showZ', true);
  var changeEvent = {
    type: 'change'
  };
  var mouseDownEvent = {
    type: 'mouseDown'
  };
  var mouseUpEvent = {
    type: 'mouseUp',
    mode: scope.mode
  };
  var objectChangeEvent = {
    type: 'objectChange'
  }; // Reusable utility variables

  var raycaster = new three.Raycaster();
  this.raycaster = raycaster;

  function intersectObjectWithRay(object, raycaster, includeInvisible) {
    var allIntersections = raycaster.intersectObject(object, true);

    for (var i = 0; i < allIntersections.length; i++) {
      if (allIntersections[i].object.visible || includeInvisible) {
        return allIntersections[i];
      }
    }

    return false;
  }

  var _tempVector = new three.Vector3();

  var _tempVector2 = new three.Vector3();

  var _tempQuaternion = new three.Quaternion();

  var _unit = {
    X: new three.Vector3(1, 0, 0),
    Y: new three.Vector3(0, 1, 0),
    Z: new three.Vector3(0, 0, 1)
  };
  var pointStart = new three.Vector3();
  var pointEnd = new three.Vector3();
  var offset = new three.Vector3();
  var rotationAxis = new three.Vector3();
  var startNorm = new three.Vector3();
  var endNorm = new three.Vector3();
  var rotationAngle = 0;
  var cameraPosition = new three.Vector3();
  var cameraQuaternion = new three.Quaternion();
  var cameraScale = new three.Vector3();
  var parentPosition = new three.Vector3();
  var parentQuaternion = new three.Quaternion();
  var parentQuaternionInv = new three.Quaternion();
  var parentScale = new three.Vector3();
  var worldPositionStart = new three.Vector3();
  var worldQuaternionStart = new three.Quaternion();
  var worldScaleStart = new three.Vector3();
  var worldPosition = new three.Vector3();
  var worldQuaternion = new three.Quaternion();
  var worldQuaternionInv = new three.Quaternion();
  var worldScale = new three.Vector3();
  var eye = new three.Vector3();
  var positionStart = new three.Vector3();
  var quaternionStart = new three.Quaternion();
  var scaleStart = new three.Vector3(); // TODO: remove properties unused in plane and gizmo

  defineProperty('worldPosition', worldPosition);
  defineProperty('worldPositionStart', worldPositionStart);
  defineProperty('worldQuaternion', worldQuaternion);
  defineProperty('worldQuaternionStart', worldQuaternionStart);
  defineProperty('cameraPosition', cameraPosition);
  defineProperty('cameraQuaternion', cameraQuaternion);
  defineProperty('pointStart', pointStart);
  defineProperty('pointEnd', pointEnd);
  defineProperty('rotationAxis', rotationAxis);
  defineProperty('rotationAngle', rotationAngle);
  defineProperty('eye', eye);
  {
    domElement.addEventListener('pointerdown', onPointerDown);
    domElement.addEventListener('pointermove', onPointerHover);
    scope.domElement.ownerDocument.addEventListener('pointerup', onPointerUp);
  }

  this.dispose = function () {
    domElement.removeEventListener('pointerdown', onPointerDown);
    domElement.removeEventListener('pointermove', onPointerHover);
    scope.domElement.ownerDocument.removeEventListener('pointermove', onPointerMove);
    scope.domElement.ownerDocument.removeEventListener('pointerup', onPointerUp);
    this.traverse(function (child) {
      if (child.geometry) child.geometry.dispose();
      if (child.material) child.material.dispose();
    });
  }; // Set current object


  this.attach = function (object) {
    this.object = object;
    this.visible = true;
    return this;
  }; // Detatch from object


  this.detach = function () {
    this.object = undefined;
    this.visible = false;
    this.axis = null;
    return this;
  }; // Defined getter, setter and store for a property


  function defineProperty(propName, defaultValue) {
    var propValue = defaultValue;
    Object.defineProperty(scope, propName, {
      get: function get() {
        return propValue !== undefined ? propValue : defaultValue;
      },
      set: function set(value) {
        if (propValue !== value) {
          propValue = value;
          _plane[propName] = value;
          _gizmo[propName] = value;
          scope.dispatchEvent({
            type: propName + '-changed',
            value: value
          });
          scope.dispatchEvent(changeEvent);
        }
      }
    });
    scope[propName] = defaultValue;
    _plane[propName] = defaultValue;
    _gizmo[propName] = defaultValue;
  } // updateMatrixWorld  updates key transformation variables


  this.updateMatrixWorld = function () {
    if (this.object !== undefined) {
      this.object.updateMatrixWorld();

      if (this.object.parent === null) {
        console.error('TransformControls: The attached 3D object must be a part of the scene graph.');
      } else {
        this.object.parent.matrixWorld.decompose(parentPosition, parentQuaternion, parentScale);
      }

      this.object.matrixWorld.decompose(worldPosition, worldQuaternion, worldScale);
      parentQuaternionInv.copy(parentQuaternion).invert();
      worldQuaternionInv.copy(worldQuaternion).invert();
    }

    this.camera.updateMatrixWorld();
    this.camera.matrixWorld.decompose(cameraPosition, cameraQuaternion, cameraScale);
    eye.copy(cameraPosition).sub(worldPosition).normalize();
    three.Object3D.prototype.updateMatrixWorld.call(this);
  };

  this.pointerHover = function (pointer) {
    if (this.object === undefined || this.dragging === true) return;
    raycaster.setFromCamera(pointer, this.camera);
    var intersect = intersectObjectWithRay(_gizmo.picker[this.mode], raycaster);

    if (intersect) {
      this.axis = intersect.object.name;
    } else {
      this.axis = null;
    }
  };

  this.pointerDown = function (pointer) {
    if (this.object === undefined || this.dragging === true || pointer.button !== 0) return;

    if (this.axis !== null) {
      raycaster.setFromCamera(pointer, this.camera);
      var planeIntersect = intersectObjectWithRay(_plane, raycaster, true);

      if (planeIntersect) {
        var space = this.space;

        if (this.mode === 'scale') {
          space = 'local';
        } else if (this.axis === 'E' || this.axis === 'XYZE' || this.axis === 'XYZ') {
          space = 'world';
        }

        if (space === 'local' && this.mode === 'rotate') {
          var snap = this.rotationSnap;
          if (this.axis === 'X' && snap) this.object.rotation.x = Math.round(this.object.rotation.x / snap) * snap;
          if (this.axis === 'Y' && snap) this.object.rotation.y = Math.round(this.object.rotation.y / snap) * snap;
          if (this.axis === 'Z' && snap) this.object.rotation.z = Math.round(this.object.rotation.z / snap) * snap;
        }

        this.object.updateMatrixWorld();
        this.object.parent.updateMatrixWorld();
        positionStart.copy(this.object.position);
        quaternionStart.copy(this.object.quaternion);
        scaleStart.copy(this.object.scale);
        this.object.matrixWorld.decompose(worldPositionStart, worldQuaternionStart, worldScaleStart);
        pointStart.copy(planeIntersect.point).sub(worldPositionStart);
      }

      this.dragging = true;
      mouseDownEvent.mode = this.mode;
      this.dispatchEvent(mouseDownEvent);
    }
  };

  this.pointerMove = function (pointer) {
    var axis = this.axis;
    var mode = this.mode;
    var object = this.object;
    var space = this.space;

    if (mode === 'scale') {
      space = 'local';
    } else if (axis === 'E' || axis === 'XYZE' || axis === 'XYZ') {
      space = 'world';
    }

    if (object === undefined || axis === null || this.dragging === false || pointer.button !== -1) return;
    raycaster.setFromCamera(pointer, this.camera);
    var planeIntersect = intersectObjectWithRay(_plane, raycaster, true);
    if (!planeIntersect) return;
    pointEnd.copy(planeIntersect.point).sub(worldPositionStart);

    if (mode === 'translate') {
      // Apply translate
      offset.copy(pointEnd).sub(pointStart);

      if (space === 'local' && axis !== 'XYZ') {
        offset.applyQuaternion(worldQuaternionInv);
      }

      if (axis.indexOf('X') === -1) offset.x = 0;
      if (axis.indexOf('Y') === -1) offset.y = 0;
      if (axis.indexOf('Z') === -1) offset.z = 0;

      if (space === 'local' && axis !== 'XYZ') {
        offset.applyQuaternion(quaternionStart).divide(parentScale);
      } else {
        offset.applyQuaternion(parentQuaternionInv).divide(parentScale);
      }

      object.position.copy(offset).add(positionStart); // Apply translation snap

      if (this.translationSnap) {
        if (space === 'local') {
          object.position.applyQuaternion(_tempQuaternion.copy(quaternionStart).invert());

          if (axis.search('X') !== -1) {
            object.position.x = Math.round(object.position.x / this.translationSnap) * this.translationSnap;
          }

          if (axis.search('Y') !== -1) {
            object.position.y = Math.round(object.position.y / this.translationSnap) * this.translationSnap;
          }

          if (axis.search('Z') !== -1) {
            object.position.z = Math.round(object.position.z / this.translationSnap) * this.translationSnap;
          }

          object.position.applyQuaternion(quaternionStart);
        }

        if (space === 'world') {
          if (object.parent) {
            object.position.add(_tempVector.setFromMatrixPosition(object.parent.matrixWorld));
          }

          if (axis.search('X') !== -1) {
            object.position.x = Math.round(object.position.x / this.translationSnap) * this.translationSnap;
          }

          if (axis.search('Y') !== -1) {
            object.position.y = Math.round(object.position.y / this.translationSnap) * this.translationSnap;
          }

          if (axis.search('Z') !== -1) {
            object.position.z = Math.round(object.position.z / this.translationSnap) * this.translationSnap;
          }

          if (object.parent) {
            object.position.sub(_tempVector.setFromMatrixPosition(object.parent.matrixWorld));
          }
        }
      }
    } else if (mode === 'scale') {
      if (axis.search('XYZ') !== -1) {
        var d = pointEnd.length() / pointStart.length();
        if (pointEnd.dot(pointStart) < 0) d *= -1;

        _tempVector2.set(d, d, d);
      } else {
        _tempVector.copy(pointStart);

        _tempVector2.copy(pointEnd);

        _tempVector.applyQuaternion(worldQuaternionInv);

        _tempVector2.applyQuaternion(worldQuaternionInv);

        _tempVector2.divide(_tempVector);

        if (axis.search('X') === -1) {
          _tempVector2.x = 1;
        }

        if (axis.search('Y') === -1) {
          _tempVector2.y = 1;
        }

        if (axis.search('Z') === -1) {
          _tempVector2.z = 1;
        }
      } // Apply scale


      object.scale.copy(scaleStart).multiply(_tempVector2);

      if (this.scaleSnap) {
        if (axis.search('X') !== -1) {
          object.scale.x = Math.round(object.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap;
        }

        if (axis.search('Y') !== -1) {
          object.scale.y = Math.round(object.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap;
        }

        if (axis.search('Z') !== -1) {
          object.scale.z = Math.round(object.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap;
        }
      }
    } else if (mode === 'rotate') {
      offset.copy(pointEnd).sub(pointStart);
      var ROTATION_SPEED = 20 / worldPosition.distanceTo(_tempVector.setFromMatrixPosition(this.camera.matrixWorld));

      if (axis === 'E') {
        rotationAxis.copy(eye);
        rotationAngle = pointEnd.angleTo(pointStart);
        startNorm.copy(pointStart).normalize();
        endNorm.copy(pointEnd).normalize();
        rotationAngle *= endNorm.cross(startNorm).dot(eye) < 0 ? 1 : -1;
      } else if (axis === 'XYZE') {
        rotationAxis.copy(offset).cross(eye).normalize();
        rotationAngle = offset.dot(_tempVector.copy(rotationAxis).cross(this.eye)) * ROTATION_SPEED;
      } else if (axis === 'X' || axis === 'Y' || axis === 'Z') {
        rotationAxis.copy(_unit[axis]);

        _tempVector.copy(_unit[axis]);

        if (space === 'local') {
          _tempVector.applyQuaternion(worldQuaternion);
        }

        rotationAngle = offset.dot(_tempVector.cross(eye).normalize()) * ROTATION_SPEED;
      } // Apply rotation snap


      if (this.rotationSnap) rotationAngle = Math.round(rotationAngle / this.rotationSnap) * this.rotationSnap;
      this.rotationAngle = rotationAngle; // Apply rotate

      if (space === 'local' && axis !== 'E' && axis !== 'XYZE') {
        object.quaternion.copy(quaternionStart);
        object.quaternion.multiply(_tempQuaternion.setFromAxisAngle(rotationAxis, rotationAngle)).normalize();
      } else {
        rotationAxis.applyQuaternion(parentQuaternionInv);
        object.quaternion.copy(_tempQuaternion.setFromAxisAngle(rotationAxis, rotationAngle));
        object.quaternion.multiply(quaternionStart).normalize();
      }
    }

    this.dispatchEvent(changeEvent);
    this.dispatchEvent(objectChangeEvent);
  };

  this.pointerUp = function (pointer) {
    if (pointer.button !== 0) return;

    if (this.dragging && this.axis !== null) {
      mouseUpEvent.mode = this.mode;
      this.dispatchEvent(mouseUpEvent);
    }

    this.dragging = false;
    this.axis = null;
  }; // normalize mouse / touch pointer and remap {x,y} to view space.


  function getPointer(event) {
    if (scope.domElement.ownerDocument.pointerLockElement) {
      return {
        x: 0,
        y: 0,
        button: event.button
      };
    } else {
      var pointer = event.changedTouches ? event.changedTouches[0] : event;
      var rect = domElement.getBoundingClientRect();
      return {
        x: (pointer.clientX - rect.left) / rect.width * 2 - 1,
        y: -(pointer.clientY - rect.top) / rect.height * 2 + 1,
        button: event.button
      };
    }
  } // mouse / touch event handlers


  function onPointerHover(event) {
    if (!scope.enabled) return;

    switch (event.pointerType) {
      case 'mouse':
      case 'pen':
        scope.pointerHover(getPointer(event));
        break;
    }
  }

  function onPointerDown(event) {
    if (!scope.enabled) return;
    scope.domElement.style.touchAction = 'none'; // disable touch scroll

    scope.domElement.ownerDocument.addEventListener('pointermove', onPointerMove);
    scope.pointerHover(getPointer(event));
    scope.pointerDown(getPointer(event));
  }

  function onPointerMove(event) {
    if (!scope.enabled) return;
    scope.pointerMove(getPointer(event));
  }

  function onPointerUp(event) {
    if (!scope.enabled) return;
    scope.domElement.style.touchAction = '';
    scope.domElement.ownerDocument.removeEventListener('pointermove', onPointerMove);
    scope.pointerUp(getPointer(event));
  } // TODO: deprecate


  this.getMode = function () {
    return scope.mode;
  };

  this.setMode = function (mode) {
    scope.mode = mode;
  };

  this.setTranslationSnap = function (translationSnap) {
    scope.translationSnap = translationSnap;
  };

  this.setRotationSnap = function (rotationSnap) {
    scope.rotationSnap = rotationSnap;
  };

  this.setScaleSnap = function (scaleSnap) {
    scope.scaleSnap = scaleSnap;
  };

  this.setSize = function (size) {
    scope.size = size;
  };

  this.setSpace = function (space) {
    scope.space = space;
  };

  this.update = function () {
    console.warn('THREE.TransformControls: update function has no more functionality and therefore has been deprecated.');
  };
};

TransformControls.prototype = /*#__PURE__*/Object.assign( /*#__PURE__*/Object.create(three.Object3D.prototype), {
  constructor: TransformControls,
  isTransformControls: true
});

var TransformControlsGizmo = function TransformControlsGizmo() {

  three.Object3D.call(this);
  this.type = 'TransformControlsGizmo'; // shared materials

  var gizmoMaterial = new three.MeshBasicMaterial({
    depthTest: false,
    depthWrite: false,
    transparent: true,
    side: three.DoubleSide,
    fog: false,
    toneMapped: false
  });
  var gizmoLineMaterial = new three.LineBasicMaterial({
    depthTest: false,
    depthWrite: false,
    transparent: true,
    linewidth: 1,
    fog: false,
    toneMapped: false
  }); // Make unique material for each axis/color

  var matInvisible = gizmoMaterial.clone();
  matInvisible.opacity = 0.15;
  var matHelper = gizmoMaterial.clone();
  matHelper.opacity = 0.33;
  var matRed = gizmoMaterial.clone();
  matRed.color.set(0xff0000);
  var matGreen = gizmoMaterial.clone();
  matGreen.color.set(0x00ff00);
  var matBlue = gizmoMaterial.clone();
  matBlue.color.set(0x0000ff);
  var matWhiteTransparent = gizmoMaterial.clone();
  matWhiteTransparent.opacity = 0.25;
  var matYellowTransparent = matWhiteTransparent.clone();
  matYellowTransparent.color.set(0xffff00);
  var matCyanTransparent = matWhiteTransparent.clone();
  matCyanTransparent.color.set(0x00ffff);
  var matMagentaTransparent = matWhiteTransparent.clone();
  matMagentaTransparent.color.set(0xff00ff);
  var matYellow = gizmoMaterial.clone();
  matYellow.color.set(0xffff00);
  var matLineRed = gizmoLineMaterial.clone();
  matLineRed.color.set(0xff0000);
  var matLineGreen = gizmoLineMaterial.clone();
  matLineGreen.color.set(0x00ff00);
  var matLineBlue = gizmoLineMaterial.clone();
  matLineBlue.color.set(0x0000ff);
  var matLineCyan = gizmoLineMaterial.clone();
  matLineCyan.color.set(0x00ffff);
  var matLineMagenta = gizmoLineMaterial.clone();
  matLineMagenta.color.set(0xff00ff);
  var matLineYellow = gizmoLineMaterial.clone();
  matLineYellow.color.set(0xffff00);
  var matLineGray = gizmoLineMaterial.clone();
  matLineGray.color.set(0x787878);
  var matLineYellowTransparent = matLineYellow.clone();
  matLineYellowTransparent.opacity = 0.25; // reusable geometry

  var arrowGeometry = new three.CylinderGeometry(0, 0.05, 0.2, 12, 1, false);
  var scaleHandleGeometry = new three.BoxGeometry(0.125, 0.125, 0.125);
  var lineGeometry = new three.BufferGeometry();
  lineGeometry.setAttribute('position', new three.Float32BufferAttribute([0, 0, 0, 1, 0, 0], 3));

  var CircleGeometry = function CircleGeometry(radius, arc) {
    var geometry = new three.BufferGeometry();
    var vertices = [];

    for (var i = 0; i <= 64 * arc; ++i) {
      vertices.push(0, Math.cos(i / 32 * Math.PI) * radius, Math.sin(i / 32 * Math.PI) * radius);
    }

    geometry.setAttribute('position', new three.Float32BufferAttribute(vertices, 3));
    return geometry;
  }; // Special geometry for transform helper. If scaled with position vector it spans from [0,0,0] to position


  var TranslateHelperGeometry = function TranslateHelperGeometry() {
    var geometry = new three.BufferGeometry();
    geometry.setAttribute('position', new three.Float32BufferAttribute([0, 0, 0, 1, 1, 1], 3));
    return geometry;
  }; // Gizmo definitions - custom hierarchy definitions for setupGizmo() function


  var gizmoTranslate = {
    X: [[new three.Mesh(arrowGeometry, matRed), [1, 0, 0], [0, 0, -Math.PI / 2], null, 'fwd'], [new three.Mesh(arrowGeometry, matRed), [1, 0, 0], [0, 0, Math.PI / 2], null, 'bwd'], [new three.Line(lineGeometry, matLineRed)]],
    Y: [[new three.Mesh(arrowGeometry, matGreen), [0, 1, 0], null, null, 'fwd'], [new three.Mesh(arrowGeometry, matGreen), [0, 1, 0], [Math.PI, 0, 0], null, 'bwd'], [new three.Line(lineGeometry, matLineGreen), null, [0, 0, Math.PI / 2]]],
    Z: [[new three.Mesh(arrowGeometry, matBlue), [0, 0, 1], [Math.PI / 2, 0, 0], null, 'fwd'], [new three.Mesh(arrowGeometry, matBlue), [0, 0, 1], [-Math.PI / 2, 0, 0], null, 'bwd'], [new three.Line(lineGeometry, matLineBlue), null, [0, -Math.PI / 2, 0]]],
    XYZ: [[new three.Mesh(new three.OctahedronGeometry(0.1, 0), matWhiteTransparent.clone()), [0, 0, 0], [0, 0, 0]]],
    XY: [[new three.Mesh(new three.PlaneGeometry(0.295, 0.295), matYellowTransparent.clone()), [0.15, 0.15, 0]], [new three.Line(lineGeometry, matLineYellow), [0.18, 0.3, 0], null, [0.125, 1, 1]], [new three.Line(lineGeometry, matLineYellow), [0.3, 0.18, 0], [0, 0, Math.PI / 2], [0.125, 1, 1]]],
    YZ: [[new three.Mesh(new three.PlaneGeometry(0.295, 0.295), matCyanTransparent.clone()), [0, 0.15, 0.15], [0, Math.PI / 2, 0]], [new three.Line(lineGeometry, matLineCyan), [0, 0.18, 0.3], [0, 0, Math.PI / 2], [0.125, 1, 1]], [new three.Line(lineGeometry, matLineCyan), [0, 0.3, 0.18], [0, -Math.PI / 2, 0], [0.125, 1, 1]]],
    XZ: [[new three.Mesh(new three.PlaneGeometry(0.295, 0.295), matMagentaTransparent.clone()), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]], [new three.Line(lineGeometry, matLineMagenta), [0.18, 0, 0.3], null, [0.125, 1, 1]], [new three.Line(lineGeometry, matLineMagenta), [0.3, 0, 0.18], [0, -Math.PI / 2, 0], [0.125, 1, 1]]]
  };
  var pickerTranslate = {
    X: [[new three.Mesh(new three.CylinderGeometry(0.2, 0, 1, 4, 1, false), matInvisible), [0.6, 0, 0], [0, 0, -Math.PI / 2]]],
    Y: [[new three.Mesh(new three.CylinderGeometry(0.2, 0, 1, 4, 1, false), matInvisible), [0, 0.6, 0]]],
    Z: [[new three.Mesh(new three.CylinderGeometry(0.2, 0, 1, 4, 1, false), matInvisible), [0, 0, 0.6], [Math.PI / 2, 0, 0]]],
    XYZ: [[new three.Mesh(new three.OctahedronGeometry(0.2, 0), matInvisible)]],
    XY: [[new three.Mesh(new three.PlaneGeometry(0.4, 0.4), matInvisible), [0.2, 0.2, 0]]],
    YZ: [[new three.Mesh(new three.PlaneGeometry(0.4, 0.4), matInvisible), [0, 0.2, 0.2], [0, Math.PI / 2, 0]]],
    XZ: [[new three.Mesh(new three.PlaneGeometry(0.4, 0.4), matInvisible), [0.2, 0, 0.2], [-Math.PI / 2, 0, 0]]]
  };
  var helperTranslate = {
    START: [[new three.Mesh(new three.OctahedronGeometry(0.01, 2), matHelper), null, null, null, 'helper']],
    END: [[new three.Mesh(new three.OctahedronGeometry(0.01, 2), matHelper), null, null, null, 'helper']],
    DELTA: [[new three.Line(TranslateHelperGeometry(), matHelper), null, null, null, 'helper']],
    X: [[new three.Line(lineGeometry, matHelper.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], 'helper']],
    Y: [[new three.Line(lineGeometry, matHelper.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], 'helper']],
    Z: [[new three.Line(lineGeometry, matHelper.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], 'helper']]
  };
  var gizmoRotate = {
    X: [[new three.Line(CircleGeometry(1, 0.5), matLineRed)], [new three.Mesh(new three.OctahedronGeometry(0.04, 0), matRed), [0, 0, 0.99], null, [1, 3, 1]]],
    Y: [[new three.Line(CircleGeometry(1, 0.5), matLineGreen), null, [0, 0, -Math.PI / 2]], [new three.Mesh(new three.OctahedronGeometry(0.04, 0), matGreen), [0, 0, 0.99], null, [3, 1, 1]]],
    Z: [[new three.Line(CircleGeometry(1, 0.5), matLineBlue), null, [0, Math.PI / 2, 0]], [new three.Mesh(new three.OctahedronGeometry(0.04, 0), matBlue), [0.99, 0, 0], null, [1, 3, 1]]],
    E: [[new three.Line(CircleGeometry(1.25, 1), matLineYellowTransparent), null, [0, Math.PI / 2, 0]], [new three.Mesh(new three.CylinderGeometry(0.03, 0, 0.15, 4, 1, false), matLineYellowTransparent), [1.17, 0, 0], [0, 0, -Math.PI / 2], [1, 1, 0.001]], [new three.Mesh(new three.CylinderGeometry(0.03, 0, 0.15, 4, 1, false), matLineYellowTransparent), [-1.17, 0, 0], [0, 0, Math.PI / 2], [1, 1, 0.001]], [new three.Mesh(new three.CylinderGeometry(0.03, 0, 0.15, 4, 1, false), matLineYellowTransparent), [0, -1.17, 0], [Math.PI, 0, 0], [1, 1, 0.001]], [new three.Mesh(new three.CylinderGeometry(0.03, 0, 0.15, 4, 1, false), matLineYellowTransparent), [0, 1.17, 0], [0, 0, 0], [1, 1, 0.001]]],
    XYZE: [[new three.Line(CircleGeometry(1, 1), matLineGray), null, [0, Math.PI / 2, 0]]]
  };
  var helperRotate = {
    AXIS: [[new three.Line(lineGeometry, matHelper.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], 'helper']]
  };
  var pickerRotate = {
    X: [[new three.Mesh(new three.TorusGeometry(1, 0.1, 4, 24), matInvisible), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]],
    Y: [[new three.Mesh(new three.TorusGeometry(1, 0.1, 4, 24), matInvisible), [0, 0, 0], [Math.PI / 2, 0, 0]]],
    Z: [[new three.Mesh(new three.TorusGeometry(1, 0.1, 4, 24), matInvisible), [0, 0, 0], [0, 0, -Math.PI / 2]]],
    E: [[new three.Mesh(new three.TorusGeometry(1.25, 0.1, 2, 24), matInvisible)]],
    XYZE: [[new three.Mesh(new three.SphereGeometry(0.7, 10, 8), matInvisible)]]
  };
  var gizmoScale = {
    X: [[new three.Mesh(scaleHandleGeometry, matRed), [0.8, 0, 0], [0, 0, -Math.PI / 2]], [new three.Line(lineGeometry, matLineRed), null, null, [0.8, 1, 1]]],
    Y: [[new three.Mesh(scaleHandleGeometry, matGreen), [0, 0.8, 0]], [new three.Line(lineGeometry, matLineGreen), null, [0, 0, Math.PI / 2], [0.8, 1, 1]]],
    Z: [[new three.Mesh(scaleHandleGeometry, matBlue), [0, 0, 0.8], [Math.PI / 2, 0, 0]], [new three.Line(lineGeometry, matLineBlue), null, [0, -Math.PI / 2, 0], [0.8, 1, 1]]],
    XY: [[new three.Mesh(scaleHandleGeometry, matYellowTransparent), [0.85, 0.85, 0], null, [2, 2, 0.2]], [new three.Line(lineGeometry, matLineYellow), [0.855, 0.98, 0], null, [0.125, 1, 1]], [new three.Line(lineGeometry, matLineYellow), [0.98, 0.855, 0], [0, 0, Math.PI / 2], [0.125, 1, 1]]],
    YZ: [[new three.Mesh(scaleHandleGeometry, matCyanTransparent), [0, 0.85, 0.85], null, [0.2, 2, 2]], [new three.Line(lineGeometry, matLineCyan), [0, 0.855, 0.98], [0, 0, Math.PI / 2], [0.125, 1, 1]], [new three.Line(lineGeometry, matLineCyan), [0, 0.98, 0.855], [0, -Math.PI / 2, 0], [0.125, 1, 1]]],
    XZ: [[new three.Mesh(scaleHandleGeometry, matMagentaTransparent), [0.85, 0, 0.85], null, [2, 0.2, 2]], [new three.Line(lineGeometry, matLineMagenta), [0.855, 0, 0.98], null, [0.125, 1, 1]], [new three.Line(lineGeometry, matLineMagenta), [0.98, 0, 0.855], [0, -Math.PI / 2, 0], [0.125, 1, 1]]],
    XYZX: [[new three.Mesh(new three.BoxGeometry(0.125, 0.125, 0.125), matWhiteTransparent.clone()), [1.1, 0, 0]]],
    XYZY: [[new three.Mesh(new three.BoxGeometry(0.125, 0.125, 0.125), matWhiteTransparent.clone()), [0, 1.1, 0]]],
    XYZZ: [[new three.Mesh(new three.BoxGeometry(0.125, 0.125, 0.125), matWhiteTransparent.clone()), [0, 0, 1.1]]]
  };
  var pickerScale = {
    X: [[new three.Mesh(new three.CylinderGeometry(0.2, 0, 0.8, 4, 1, false), matInvisible), [0.5, 0, 0], [0, 0, -Math.PI / 2]]],
    Y: [[new three.Mesh(new three.CylinderGeometry(0.2, 0, 0.8, 4, 1, false), matInvisible), [0, 0.5, 0]]],
    Z: [[new three.Mesh(new three.CylinderGeometry(0.2, 0, 0.8, 4, 1, false), matInvisible), [0, 0, 0.5], [Math.PI / 2, 0, 0]]],
    XY: [[new three.Mesh(scaleHandleGeometry, matInvisible), [0.85, 0.85, 0], null, [3, 3, 0.2]]],
    YZ: [[new three.Mesh(scaleHandleGeometry, matInvisible), [0, 0.85, 0.85], null, [0.2, 3, 3]]],
    XZ: [[new three.Mesh(scaleHandleGeometry, matInvisible), [0.85, 0, 0.85], null, [3, 0.2, 3]]],
    XYZX: [[new three.Mesh(new three.BoxGeometry(0.2, 0.2, 0.2), matInvisible), [1.1, 0, 0]]],
    XYZY: [[new three.Mesh(new three.BoxGeometry(0.2, 0.2, 0.2), matInvisible), [0, 1.1, 0]]],
    XYZZ: [[new three.Mesh(new three.BoxGeometry(0.2, 0.2, 0.2), matInvisible), [0, 0, 1.1]]]
  };
  var helperScale = {
    X: [[new three.Line(lineGeometry, matHelper.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], 'helper']],
    Y: [[new three.Line(lineGeometry, matHelper.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], 'helper']],
    Z: [[new three.Line(lineGeometry, matHelper.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], 'helper']]
  }; // Creates an Object3D with gizmos described in custom hierarchy definition.

  var setupGizmo = function setupGizmo(gizmoMap) {
    var gizmo = new three.Object3D();

    for (var name in gizmoMap) {
      for (var i = gizmoMap[name].length; i--;) {
        var object = gizmoMap[name][i][0].clone();
        var position = gizmoMap[name][i][1];
        var rotation = gizmoMap[name][i][2];
        var scale = gizmoMap[name][i][3];
        var tag = gizmoMap[name][i][4]; // name and tag properties are essential for picking and updating logic.

        object.name = name;
        object.tag = tag;

        if (position) {
          object.position.set(position[0], position[1], position[2]);
        }

        if (rotation) {
          object.rotation.set(rotation[0], rotation[1], rotation[2]);
        }

        if (scale) {
          object.scale.set(scale[0], scale[1], scale[2]);
        }

        object.updateMatrix();
        var tempGeometry = object.geometry.clone();
        tempGeometry.applyMatrix4(object.matrix);
        object.geometry = tempGeometry;
        object.renderOrder = Infinity;
        object.position.set(0, 0, 0);
        object.rotation.set(0, 0, 0);
        object.scale.set(1, 1, 1);
        gizmo.add(object);
      }
    }

    return gizmo;
  }; // Reusable utility variables


  var tempVector = new three.Vector3(0, 0, 0);
  var tempEuler = new three.Euler();
  var alignVector = new three.Vector3(0, 1, 0);
  var zeroVector = new three.Vector3(0, 0, 0);
  var lookAtMatrix = new three.Matrix4();
  var tempQuaternion = new three.Quaternion();
  var tempQuaternion2 = new three.Quaternion();
  var identityQuaternion = new three.Quaternion();
  var unitX = new three.Vector3(1, 0, 0);
  var unitY = new three.Vector3(0, 1, 0);
  var unitZ = new three.Vector3(0, 0, 1); // Gizmo creation

  this.gizmo = {};
  this.picker = {};
  this.helper = {};
  this.add(this.gizmo['translate'] = setupGizmo(gizmoTranslate));
  this.add(this.gizmo['rotate'] = setupGizmo(gizmoRotate));
  this.add(this.gizmo['scale'] = setupGizmo(gizmoScale));
  this.add(this.picker['translate'] = setupGizmo(pickerTranslate));
  this.add(this.picker['rotate'] = setupGizmo(pickerRotate));
  this.add(this.picker['scale'] = setupGizmo(pickerScale));
  this.add(this.helper['translate'] = setupGizmo(helperTranslate));
  this.add(this.helper['rotate'] = setupGizmo(helperRotate));
  this.add(this.helper['scale'] = setupGizmo(helperScale)); // Pickers should be hidden always

  this.picker['translate'].visible = false;
  this.picker['rotate'].visible = false;
  this.picker['scale'].visible = false; // updateMatrixWorld will update transformations and appearance of individual handles

  this.updateMatrixWorld = function () {
    var space = this.space;
    if (this.mode === 'scale') space = 'local'; // scale always oriented to local rotation

    var quaternion = space === 'local' ? this.worldQuaternion : identityQuaternion; // Show only gizmos for current transform mode

    this.gizmo['translate'].visible = this.mode === 'translate';
    this.gizmo['rotate'].visible = this.mode === 'rotate';
    this.gizmo['scale'].visible = this.mode === 'scale';
    this.helper['translate'].visible = this.mode === 'translate';
    this.helper['rotate'].visible = this.mode === 'rotate';
    this.helper['scale'].visible = this.mode === 'scale';
    var handles = [];
    handles = handles.concat(this.picker[this.mode].children);
    handles = handles.concat(this.gizmo[this.mode].children);
    handles = handles.concat(this.helper[this.mode].children);

    for (var i = 0; i < handles.length; i++) {
      var handle = handles[i]; // hide aligned to camera

      handle.visible = true;
      handle.rotation.set(0, 0, 0);
      handle.position.copy(this.worldPosition);
      var factor;

      if (this.camera.isOrthographicCamera) {
        factor = (this.camera.top - this.camera.bottom) / this.camera.zoom;
      } else {
        factor = this.worldPosition.distanceTo(this.cameraPosition) * Math.min(1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom, 7);
      }

      handle.scale.set(1, 1, 1).multiplyScalar(factor * this.size / 7); // TODO: simplify helpers and consider decoupling from gizmo

      if (handle.tag === 'helper') {
        handle.visible = false;

        if (handle.name === 'AXIS') {
          handle.position.copy(this.worldPositionStart);
          handle.visible = !!this.axis;

          if (this.axis === 'X') {
            tempQuaternion.setFromEuler(tempEuler.set(0, 0, 0));
            handle.quaternion.copy(quaternion).multiply(tempQuaternion);

            if (Math.abs(alignVector.copy(unitX).applyQuaternion(quaternion).dot(this.eye)) > 0.9) {
              handle.visible = false;
            }
          }

          if (this.axis === 'Y') {
            tempQuaternion.setFromEuler(tempEuler.set(0, 0, Math.PI / 2));
            handle.quaternion.copy(quaternion).multiply(tempQuaternion);

            if (Math.abs(alignVector.copy(unitY).applyQuaternion(quaternion).dot(this.eye)) > 0.9) {
              handle.visible = false;
            }
          }

          if (this.axis === 'Z') {
            tempQuaternion.setFromEuler(tempEuler.set(0, Math.PI / 2, 0));
            handle.quaternion.copy(quaternion).multiply(tempQuaternion);

            if (Math.abs(alignVector.copy(unitZ).applyQuaternion(quaternion).dot(this.eye)) > 0.9) {
              handle.visible = false;
            }
          }

          if (this.axis === 'XYZE') {
            tempQuaternion.setFromEuler(tempEuler.set(0, Math.PI / 2, 0));
            alignVector.copy(this.rotationAxis);
            handle.quaternion.setFromRotationMatrix(lookAtMatrix.lookAt(zeroVector, alignVector, unitY));
            handle.quaternion.multiply(tempQuaternion);
            handle.visible = this.dragging;
          }

          if (this.axis === 'E') {
            handle.visible = false;
          }
        } else if (handle.name === 'START') {
          handle.position.copy(this.worldPositionStart);
          handle.visible = this.dragging;
        } else if (handle.name === 'END') {
          handle.position.copy(this.worldPosition);
          handle.visible = this.dragging;
        } else if (handle.name === 'DELTA') {
          handle.position.copy(this.worldPositionStart);
          handle.quaternion.copy(this.worldQuaternionStart);
          tempVector.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1);
          tempVector.applyQuaternion(this.worldQuaternionStart.clone().invert());
          handle.scale.copy(tempVector);
          handle.visible = this.dragging;
        } else {
          handle.quaternion.copy(quaternion);

          if (this.dragging) {
            handle.position.copy(this.worldPositionStart);
          } else {
            handle.position.copy(this.worldPosition);
          }

          if (this.axis) {
            handle.visible = this.axis.search(handle.name) !== -1;
          }
        } // If updating helper, skip rest of the loop


        continue;
      } // Align handles to current local or world rotation


      handle.quaternion.copy(quaternion);

      if (this.mode === 'translate' || this.mode === 'scale') {
        // Hide translate and scale axis facing the camera
        var AXIS_HIDE_TRESHOLD = 0.99;
        var PLANE_HIDE_TRESHOLD = 0.2;
        var AXIS_FLIP_TRESHOLD = 0.0;

        if (handle.name === 'X' || handle.name === 'XYZX') {
          if (Math.abs(alignVector.copy(unitX).applyQuaternion(quaternion).dot(this.eye)) > AXIS_HIDE_TRESHOLD) {
            handle.scale.set(1e-10, 1e-10, 1e-10);
            handle.visible = false;
          }
        }

        if (handle.name === 'Y' || handle.name === 'XYZY') {
          if (Math.abs(alignVector.copy(unitY).applyQuaternion(quaternion).dot(this.eye)) > AXIS_HIDE_TRESHOLD) {
            handle.scale.set(1e-10, 1e-10, 1e-10);
            handle.visible = false;
          }
        }

        if (handle.name === 'Z' || handle.name === 'XYZZ') {
          if (Math.abs(alignVector.copy(unitZ).applyQuaternion(quaternion).dot(this.eye)) > AXIS_HIDE_TRESHOLD) {
            handle.scale.set(1e-10, 1e-10, 1e-10);
            handle.visible = false;
          }
        }

        if (handle.name === 'XY') {
          if (Math.abs(alignVector.copy(unitZ).applyQuaternion(quaternion).dot(this.eye)) < PLANE_HIDE_TRESHOLD) {
            handle.scale.set(1e-10, 1e-10, 1e-10);
            handle.visible = false;
          }
        }

        if (handle.name === 'YZ') {
          if (Math.abs(alignVector.copy(unitX).applyQuaternion(quaternion).dot(this.eye)) < PLANE_HIDE_TRESHOLD) {
            handle.scale.set(1e-10, 1e-10, 1e-10);
            handle.visible = false;
          }
        }

        if (handle.name === 'XZ') {
          if (Math.abs(alignVector.copy(unitY).applyQuaternion(quaternion).dot(this.eye)) < PLANE_HIDE_TRESHOLD) {
            handle.scale.set(1e-10, 1e-10, 1e-10);
            handle.visible = false;
          }
        } // Flip translate and scale axis ocluded behind another axis


        if (handle.name.search('X') !== -1) {
          if (alignVector.copy(unitX).applyQuaternion(quaternion).dot(this.eye) < AXIS_FLIP_TRESHOLD) {
            if (handle.tag === 'fwd') {
              handle.visible = false;
            } else {
              handle.scale.x *= -1;
            }
          } else if (handle.tag === 'bwd') {
            handle.visible = false;
          }
        }

        if (handle.name.search('Y') !== -1) {
          if (alignVector.copy(unitY).applyQuaternion(quaternion).dot(this.eye) < AXIS_FLIP_TRESHOLD) {
            if (handle.tag === 'fwd') {
              handle.visible = false;
            } else {
              handle.scale.y *= -1;
            }
          } else if (handle.tag === 'bwd') {
            handle.visible = false;
          }
        }

        if (handle.name.search('Z') !== -1) {
          if (alignVector.copy(unitZ).applyQuaternion(quaternion).dot(this.eye) < AXIS_FLIP_TRESHOLD) {
            if (handle.tag === 'fwd') {
              handle.visible = false;
            } else {
              handle.scale.z *= -1;
            }
          } else if (handle.tag === 'bwd') {
            handle.visible = false;
          }
        }
      } else if (this.mode === 'rotate') {
        // Align handles to current local or world rotation
        tempQuaternion2.copy(quaternion);
        alignVector.copy(this.eye).applyQuaternion(tempQuaternion.copy(quaternion).invert());

        if (handle.name.search('E') !== -1) {
          handle.quaternion.setFromRotationMatrix(lookAtMatrix.lookAt(this.eye, zeroVector, unitY));
        }

        if (handle.name === 'X') {
          tempQuaternion.setFromAxisAngle(unitX, Math.atan2(-alignVector.y, alignVector.z));
          tempQuaternion.multiplyQuaternions(tempQuaternion2, tempQuaternion);
          handle.quaternion.copy(tempQuaternion);
        }

        if (handle.name === 'Y') {
          tempQuaternion.setFromAxisAngle(unitY, Math.atan2(alignVector.x, alignVector.z));
          tempQuaternion.multiplyQuaternions(tempQuaternion2, tempQuaternion);
          handle.quaternion.copy(tempQuaternion);
        }

        if (handle.name === 'Z') {
          tempQuaternion.setFromAxisAngle(unitZ, Math.atan2(alignVector.y, alignVector.x));
          tempQuaternion.multiplyQuaternions(tempQuaternion2, tempQuaternion);
          handle.quaternion.copy(tempQuaternion);
        }
      } // Hide disabled axes


      handle.visible = handle.visible && (handle.name.indexOf('X') === -1 || this.showX);
      handle.visible = handle.visible && (handle.name.indexOf('Y') === -1 || this.showY);
      handle.visible = handle.visible && (handle.name.indexOf('Z') === -1 || this.showZ);
      handle.visible = handle.visible && (handle.name.indexOf('E') === -1 || this.showX && this.showY && this.showZ); // highlight selected axis

      handle.material._opacity = handle.material._opacity || handle.material.opacity;
      handle.material._color = handle.material._color || handle.material.color.clone();
      handle.material.color.copy(handle.material._color);
      handle.material.opacity = handle.material._opacity;

      if (!this.enabled) {
        handle.material.opacity *= 0.5;
        handle.material.color.lerp(new three.Color(1, 1, 1), 0.5);
      } else if (this.axis) {
        if (handle.name === this.axis) {
          handle.material.opacity = 1.0;
          handle.material.color.lerp(new three.Color(1, 1, 1), 0.5);
        } else if (this.axis.split('').some(function (a) {
          return handle.name === a;
        })) {
          handle.material.opacity = 1.0;
          handle.material.color.lerp(new three.Color(1, 1, 1), 0.5);
        } else {
          handle.material.opacity *= 0.25;
          handle.material.color.lerp(new three.Color(1, 1, 1), 0.5);
        }
      }
    }

    three.Object3D.prototype.updateMatrixWorld.call(this);
  };
};

TransformControlsGizmo.prototype = /*#__PURE__*/Object.assign( /*#__PURE__*/Object.create(three.Object3D.prototype), {
  constructor: TransformControlsGizmo,
  isTransformControlsGizmo: true
});

var TransformControlsPlane = function TransformControlsPlane() {

  three.Mesh.call(this, new three.PlaneGeometry(100000, 100000, 2, 2), new three.MeshBasicMaterial({
    visible: false,
    wireframe: true,
    side: three.DoubleSide,
    transparent: true,
    opacity: 0.1,
    toneMapped: false
  }));
  this.type = 'TransformControlsPlane';
  var unitX = new three.Vector3(1, 0, 0);
  var unitY = new three.Vector3(0, 1, 0);
  var unitZ = new three.Vector3(0, 0, 1);
  var tempVector = new three.Vector3();
  var dirVector = new three.Vector3();
  var alignVector = new three.Vector3();
  var tempMatrix = new three.Matrix4();
  var identityQuaternion = new three.Quaternion();

  this.updateMatrixWorld = function () {
    var space = this.space;
    this.position.copy(this.worldPosition);
    if (this.mode === 'scale') space = 'local'; // scale always oriented to local rotation

    unitX.set(1, 0, 0).applyQuaternion(space === 'local' ? this.worldQuaternion : identityQuaternion);
    unitY.set(0, 1, 0).applyQuaternion(space === 'local' ? this.worldQuaternion : identityQuaternion);
    unitZ.set(0, 0, 1).applyQuaternion(space === 'local' ? this.worldQuaternion : identityQuaternion); // Align the plane for current transform mode, axis and space.

    alignVector.copy(unitY);

    switch (this.mode) {
      case 'translate':
      case 'scale':
        switch (this.axis) {
          case 'X':
            alignVector.copy(this.eye).cross(unitX);
            dirVector.copy(unitX).cross(alignVector);
            break;

          case 'Y':
            alignVector.copy(this.eye).cross(unitY);
            dirVector.copy(unitY).cross(alignVector);
            break;

          case 'Z':
            alignVector.copy(this.eye).cross(unitZ);
            dirVector.copy(unitZ).cross(alignVector);
            break;

          case 'XY':
            dirVector.copy(unitZ);
            break;

          case 'YZ':
            dirVector.copy(unitX);
            break;

          case 'XZ':
            alignVector.copy(unitZ);
            dirVector.copy(unitY);
            break;

          case 'XYZ':
          case 'E':
            dirVector.set(0, 0, 0);
            break;
        }

        break;

      case 'rotate':
      default:
        // special case for rotate
        dirVector.set(0, 0, 0);
    }

    if (dirVector.length() === 0) {
      // If in rotate mode, make the plane parallel to camera
      this.quaternion.copy(this.cameraQuaternion);
    } else {
      tempMatrix.lookAt(tempVector.set(0, 0, 0), dirVector, alignVector);
      this.quaternion.setFromRotationMatrix(tempMatrix);
    }

    three.Object3D.prototype.updateMatrixWorld.call(this);
  };
};

TransformControlsPlane.prototype = /*#__PURE__*/Object.assign( /*#__PURE__*/Object.create(three.Mesh.prototype), {
  constructor: TransformControlsPlane,
  isTransformControlsPlane: true
});

var useHotkeys = function useHotkeys(event, callback, options) {
  React.useEffect(function () {
    if (options) {
      hotkeys(event, options, callback);
    } else {
      hotkeys(event, callback);
    }

    return function () {
      hotkeys.unbind(event, callback);
    };
  }, []);
};
var useCallbackRef = function useCallbackRef(cb, dependencies) {
  var callback = React.useCallback(cb, dependencies);
  var callbackRef = React.useRef(callback);
  React.useEffect(function () {
    callbackRef.current = callback;
  }, [callback]);
  return callbackRef;
};

var TransformControls$1 = TransformControls;

var recursiveSetLayer = function recursiveSetLayer(object) {
  // if (object.children.length === 0) {
  object.layers.set(EDITOR_LAYER); // } else {

  object.children.forEach(function (child) {
    return recursiveSetLayer(child);
  }); // }
};

var useIsCanvasInteractable = function useIsCanvasInteractable() {
  return true;
};
var useDraggableMesh = function useDraggableMesh(id, isSelected, options) {
  var _options$passedRef;

  if (options === void 0) {
    options = {};
  }

  var _useThree = reactThreeFiber.useThree(),
      camera = _useThree.camera,
      gl = _useThree.gl,
      scene = _useThree.scene;

  var isEditMode = useIsEditMode();
  var localRef = React.useRef(null);
  var ref = (_options$passedRef = options.passedRef) != null ? _options$passedRef : localRef;
  var orbitRef = valtio.useProxy(editorStateProxy).orbitRef;

  var _useState = React.useState(null),
      controls = _useState[0],
      setControls = _useState[1];

  var isCanvasEnabled = useIsCanvasInteractable();

  var _useState2 = React.useState(isShiftPressed()),
      shiftIsPressed = _useState2[0],
      setShiftIsPressed = _useState2[1];

  var _options = options,
      updateValue = _options.updateValue,
      onChange = _options.onChange,
      passedOnDraggingChanged = _options.onDraggingChanged;
  useHotkeys('*', function () {
    setShiftIsPressed(isShiftPressed());
  }, {
    keyup: true,
    keydown: true
  });
  React.useEffect(function () {
    var callback = function callback() {
      setShiftIsPressed(isShiftPressed());
    };

    document.addEventListener('keyup', callback);
    return function () {
      document.removeEventListener('keyup', callback);
    };
  }, []);
  var active = isEditMode && isSelected && isCanvasEnabled; // @ts-ignore

  React.useEffect(function () {
    if (!controls) return;
    var currentTranslationSnap = controls.translationSnap;
    var currentRotationSnap = controls.rotationSnap;

    if (shiftIsPressed) {
      controls.setTranslationSnap(1);
      controls.setRotationSnap(1);
      return function () {
        controls.setTranslationSnap(currentTranslationSnap);
        controls.setRotationSnap(currentRotationSnap);
      };
    }
  }, [shiftIsPressed, controls]);
  var startPositionRef = React.useRef(new three.Vector3());
  React.useEffect(function () {
    if (!orbitRef || !controls) return;

    var onDraggingChanged = function onDraggingChanged(event) {
      startPositionRef.current.copy(ref.current.position);
      editorStateProxy.transformActive = event.value;

      if (orbitRef.current) {
        orbitRef.current.enabled = !event.value;
      }

      if (passedOnDraggingChanged) {
        passedOnDraggingChanged(event);
      }
    };

    controls.addEventListener('dragging-changed', onDraggingChanged);

    if (onChange) {
      controls.addEventListener('change', onChange);
    }

    return function () {
      editorStateProxy.transformActive = false;

      if (orbitRef.current) {
        orbitRef.current.enabled = true;
      }

      if (onChange) {
        controls.removeEventListener('change', onChange);
      }

      controls.removeEventListener('dragging-changed', onDraggingChanged);
    };
  }, [orbitRef, controls]);
  var transformMode = useTransformMode();
  var onMouseUp = React.useCallback(function () {
    if (!ref.current) return;
    storeSnapshot();
    console.log('MOUSE UP!');

    if (transformMode === EditorTransformMode.translate) {
      var _ref$current$position = ref.current.position,
          x = _ref$current$position.x,
          y = _ref$current$position.y,
          z = _ref$current$position.z;
      var update = {
        x: x,
        y: y,
        z: z
      };

      if (updateValue) {
        updateValue(predefinedPropKeys.position, update, startPositionRef.current);
      } else {
        setComponentPropValue(id, predefinedPropKeys.position, {
          x: x,
          y: y,
          z: z
        });
      }
    } else if (transformMode === EditorTransformMode.rotate) {
      var _ref$current$rotation = ref.current.rotation,
          _x = _ref$current$rotation.x,
          _y = _ref$current$rotation.y,
          _z = _ref$current$rotation.z;
      var _update = {
        x: _x,
        y: _y,
        z: _z
      };

      if (updateValue) {
        updateValue(predefinedPropKeys.rotation, _update, startPositionRef.current);
      } else {
        setComponentPropValue(id, predefinedPropKeys.rotation, {
          x: _x,
          y: _y,
          z: _z
        });
      }
    } else if (transformMode === EditorTransformMode.scale) {
      var _ref$current$scale = ref.current.scale,
          _x2 = _ref$current$scale.x,
          _y2 = _ref$current$scale.y,
          _z2 = _ref$current$scale.z;
      var _update2 = {
        x: _x2,
        y: _y2,
        z: _z2
      };

      if (updateValue) {
        updateValue(predefinedPropKeys.scale, _update2, startPositionRef.current);
      } else {
        setComponentPropValue(id, predefinedPropKeys.scale, {
          x: _x2,
          y: _y2,
          z: _z2
        });
      }
    }
  }, [transformMode]);
  var onMouseUpRef = React.useRef(onMouseUp);
  React.useEffect(function () {
    onMouseUpRef.current = onMouseUp;
  }, [onMouseUp]);
  React.useEffect(function () {
    if (!active) return;
    if (!ref.current) return;
    var controls = new TransformControls$1(camera, gl.domElement);
    var _options2 = options,
        translationSnap = _options2.translationSnap;

    if (translationSnap != undefined) {
      controls.setTranslationSnap(translationSnap);
    }

    controls.raycaster.layers.enable(EDITOR_LAYER);
    recursiveSetLayer(controls);
    setControls(controls);
    controls.attach(ref.current);
    controls.addEventListener('mouseUp', function () {
      onMouseUpRef.current();
    });
    scene.add(controls);
    return function () {
      controls.detach();
      scene.remove(controls);
      setControls(null);
    };
  }, [active]);
  React.useEffect(function () {
    controls == null ? void 0 : controls.setMode(transformMode);
  }, [controls, transformMode]);
  return [ref];
};

var EDITOR_LAYER = 31;
var useMeshHelper = function useMeshHelper(ref, active) {
  var helperToUse = React.useMemo(function () {
    if (active) {
      return three.BoxHelper;
    }

    return null;
  }, [active]);
  var helperRef = drei.useHelper(ref, helperToUse);
  React.useEffect(function () {
    if (helperRef.current) {
      var _helperRef$current;

      (_helperRef$current = helperRef.current) == null ? void 0 : _helperRef$current.layers.set(EDITOR_LAYER);
    }
  });
};
var InteractiveMesh = function InteractiveMesh(_ref) {
  var children = _ref.children;
  var id = useEditableId();

  var _useEditableContext = useEditableContext(),
      parentPath = _useEditableContext.parentPath;

  var isSelected = useIsEditableSelected();
  var isSoleSelected = useEditableIsSoleSelected();
  var isMultipleSelected = isSelected && !isSoleSelected;
  var groupPortalRef = useGroupPortalRef();

  var _useEditableContext2 = useEditableContext(),
      setSharedProp = _useEditableContext2.setSharedProp;

  React.useEffect(function () {
    if (!isMultipleSelected || !groupPortalRef) return;
    var parent = groupRef.current.parent;
    parent == null ? void 0 : parent.remove(groupRef.current);
    groupPortalRef.current.add(groupRef.current);
    return function () {
      groupPortalRef.current.remove(groupRef.current);
      parent == null ? void 0 : parent.add(groupRef.current);
    };
  }, [isMultipleSelected, groupPortalRef]);
  var position = useEditableProp(predefinedPropKeys.position, {
    defaultValue: {
      x: 0,
      y: 0,
      z: 0
    }
  });
  var rotation = useEditableProp(predefinedPropKeys.rotation, {
    defaultValue: {
      x: 0,
      y: 0,
      z: 0
    }
  });
  var scale = useEditableProp(predefinedPropKeys.scale, {
    defaultValue: {
      x: 1,
      y: 1,
      z: 1
    }
  });

  var _useState = React.useState(false),
      pointerOver = _useState[0],
      setPointerOver = _useState[1];

  var isEditMode = useIsEditMode();
  React.useEffect(function () {
    if (pointerOver) {
      return setComponentHovered(id);
    }

    return;
  }, [pointerOver, id]);

  var _useMemo = React.useMemo(function () {
    return {
      onPointerUp: function onPointerUp(event) {
        var _setSelectedComponent;

        if (!isEditMode) return;
        var skip = false;
        event.intersections.forEach(function (_ref2) {
          var eventObject = _ref2.eventObject;
          var eventObjectId = eventObject.userData.id;

          if (eventObjectId !== id && parentPath.includes(eventObjectId)) {
            skip = true;
          }
        });

        if (skip) {
          return;
        }

        event.stopPropagation();
        var add = isShiftPressed() || isCommandPressed();
        if (editorStateProxy.transformActive) return;
        setSelectedComponents((_setSelectedComponent = {}, _setSelectedComponent[id] = true, _setSelectedComponent), !add);
      },
      onPointerOver: function onPointerOver(event) {
        if (!isEditMode) return;
        event.stopPropagation();
        if (editorStateProxy.transformActive) return;
        setPointerOver(true);
      },
      onPointerOut: function onPointerOut(event) {
        if (!isEditMode) return;
        event.stopPropagation();
        setPointerOver(false);
      }
    };
  }, [isEditMode, parentPath]),
      onPointerUp = _useMemo.onPointerUp,
      onPointerOver = _useMemo.onPointerOver,
      onPointerOut = _useMemo.onPointerOut;

  var groupRef = React.useRef(null);
  useMeshHelper(groupRef, (isSelected || pointerOver) && isEditMode);
  useDraggableMesh(id, isSoleSelected, {
    passedRef: groupRef
  });
  React.useEffect(function () {
    if (isSoleSelected) {
      var storedRef = valtio.ref(groupRef);
      editorStateProxy.selectedRef = storedRef;
      return function () {
        if (editorStateProxy.selectedRef === storedRef) {
          editorStateProxy.selectedRef = null;
        }
      };
    }

    return;
  }, [isSoleSelected]);
  React.useEffect(function () {
    setSharedProp('meshRef', groupRef);
  }, [setSharedProp, groupRef]);
  var firstCallRef = React.useRef(true);
  React.useEffect(function () {
    if (!isEditMode && !firstCallRef.current) return;
    firstCallRef.current = false;
    groupRef.current.position.set(position.x, position.y, position.z);
    groupRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
    groupRef.current.scale.set(scale.x, scale.y, scale.z);
  }, [isEditMode, position, rotation, scale]);
  var content = React__default.createElement("group", {
    ref: groupRef,
    onPointerUp: onPointerUp,
    onPointerOver: onPointerOver,
    onPointerOut: onPointerOut,
    userData: {
      id: id
    }
  }, children);
  return content;
};

var getComponentId = function getComponentId(config) {
  if (config.type) return config.type;
  return '';
};

var Context = /*#__PURE__*/React.createContext({
  id: '',
  componentTypeId: '',
  isRoot: true,
  parentId: '',
  rootParentId: '',
  parentPath: [],
  registerWithParent: function registerWithParent() {
    return function () {};
  },
  isSelected: {
    selected: false
  },
  sharedProps: {},
  setSharedProp: function setSharedProp() {}
});
var useEditableContext = function useEditableContext() {
  return React.useContext(Context);
};
var useEditableSharedProp = function useEditableSharedProp(key) {
  var _useEditableContext = useEditableContext(),
      sharedProps = _useEditableContext.sharedProps;

  return sharedProps[key];
};
var useIsEditableSelected = function useIsEditableSelected() {
  var _useEditableContext2 = useEditableContext(),
      isSelected = _useEditableContext2.isSelected;

  return isSelected.selected;
};
var useEditableIsSoleSelected = function useEditableIsSoleSelected() {
  var _ref;

  var _useEditableContext3 = useEditableContext(),
      isSelected = _useEditableContext3.isSelected;

  return (_ref = isSelected.selected && isSelected.single) != null ? _ref : false;
};
var useEditableId = function useEditableId() {
  var _useEditableContext4 = useEditableContext(),
      id = _useEditableContext4.id;

  return id;
};

var useIsSelected = function useIsSelected(id) {
  var selectedComponents = useSelectedComponents();
  return React.useMemo(function () {
    if (Object.keys(selectedComponents).includes(id)) {
      var single = Object.keys(selectedComponents).length === 1;
      return {
        selected: true,
        single: single
      };
    }

    return {
      selected: false
    };
  }, [id, selectedComponents]);
};

var Editable = function Editable(_ref2) {
  var _config$_unsaved;

  var children = _ref2.children,
      id = _ref2.id,
      _ref2$_config = _ref2._config,
      config = _ref2$_config === void 0 ? {} : _ref2$_config,
      props = _objectWithoutPropertiesLoose(_ref2, ["children", "id", "_config"]);

  var _useEditableContext5 = useEditableContext(),
      isRoot = _useEditableContext5.isRoot,
      parentPath = _useEditableContext5.parentPath,
      registerWithParent = _useEditableContext5.registerWithParent,
      parentId = _useEditableContext5.parentId,
      rootParentId = _useEditableContext5.rootParentId;

  var _useState = React.useState(function () {
    return (config == null ? void 0 : config.name) || (children ? children.type.displayName || children.type.name || id : id);
  }),
      name = _useState[0];

  var _useState2 = React.useState(function () {
    return getCombinedId(parentPath.concat([id]));
  }),
      uid = _useState2[0];

  var _useState3 = React.useState(function () {
    return getComponentId(config);
  }),
      componentId = _useState3[0];

  var isSelected = useIsSelected(uid);
  var isSoleSelected = React.useMemo(function () {
    return isSelected.selected && isSelected.single;
  }, [isSelected]);
  React.useEffect(function () {
    if (!isSoleSelected) return;
    return function () {
      setComponentProps(uid, function () {
        return {};
      });
    };
  }, [isSoleSelected]);
  React.useLayoutEffect(function () {
    registerWithParent(uid);
  }, []);
  React.useLayoutEffect(function () {
    setComponentInitialProps(uid, props);
  }, [props]);

  var _useState4 = React.useState({}),
      childEditables = _useState4[0],
      setChildEditables = _useState4[1];

  var _useMemo = React.useMemo(function () {
    return {
      registerChildren: function registerChildren(childId) {
        setChildEditables(function (state) {
          var _extends2;

          return _extends({}, state, (_extends2 = {}, _extends2[childId] = true, _extends2));
        });
        return function () {
          setChildEditables(function (state) {
            var updated = _extends({}, state);

            delete updated[childId];
            return updated;
          });
        };
      }
    };
  }, []),
      registerChildren = _useMemo.registerChildren;

  var isDeactivated = useIsDeactivated(uid);
  var unsaved = (_config$_unsaved = config._unsaved) != null ? _config$_unsaved : false;
  React.useEffect(function () {
    if (isDeactivated) {
      addDeactivatedComponent$1(uid, name, Object.keys(childEditables), isRoot, unsaved, parentId, rootParentId);
      return function () {
        removeDeactivatedComponent(uid);
      };
    } else {
      addComponent(uid, name, Object.keys(childEditables), isRoot, unsaved, props, componentId, parentId, rootParentId);
      return function () {
        removeComponent(uid);
      };
    }
  }, [isDeactivated]);
  React.useEffect(function () {
    if (!isDeactivated) {
      setComponentChildren(uid, Object.keys(childEditables));
    }
  }, [childEditables, isDeactivated]);
  var updatedParentPath = React.useMemo(function () {
    return parentPath.concat(id);
  }, [parentPath]);

  var _useState5 = React.useState({}),
      sharedProps = _useState5[0],
      setSharedProps = _useState5[1];

  var setSharedProp = React.useCallback(function (key, value) {
    setSharedProps(function (state) {
      var _extends3;

      return _extends({}, state, (_extends3 = {}, _extends3[key] = value, _extends3));
    });
  }, [setSharedProps]);
  if (isDeactivated) return null;
  return React__default.createElement(Context.Provider, {
    value: {
      id: uid,
      componentTypeId: componentId,
      isRoot: false,
      parentId: uid,
      rootParentId: isRoot ? uid : rootParentId,
      parentPath: updatedParentPath,
      registerWithParent: registerChildren,
      isSelected: isSelected,
      sharedProps: sharedProps,
      setSharedProp: setSharedProp
    }
  }, React__default.createElement(InteractiveMesh, null, React__default.createElement(EditableModules, null, children)));
};

var useProp = function useProp(key, componentId, componentTypeId, defaultValue, hidden) {
  var initialProps = useComponentInitialProps(componentId);

  var _useComponentState = useComponentState(componentId),
      _useComponentState$mo = _useComponentState.modifiedState,
      modifiedState = _useComponentState$mo === void 0 ? {} : _useComponentState$mo,
      _useComponentState$ov = _useComponentState.overriddenState,
      overriddenState = _useComponentState$ov === void 0 ? {} : _useComponentState$ov;

  var _useSharedComponent = useSharedComponent(componentTypeId),
      _useSharedComponent$a = _useSharedComponent.appliedState,
      appliedState = _useSharedComponent$a === void 0 ? {} : _useSharedComponent$a;

  return React.useMemo(function () {
    var applied = appliedState[key];
    var appliedValue = applied == null ? void 0 : applied.value;
    var defaultResult = {
      hidden: hidden
    };

    var appliedResult = _extends({}, defaultResult, {
      value: appliedValue,
      type: PropOrigin.applied
    });

    if (modifiedState[key] && !overriddenState[key]) {
      var modifiedValue = modifiedState[key].value;

      if (modifiedValue !== appliedValue) {
        return _extends({}, defaultResult, {
          value: modifiedValue,
          type: PropOrigin.modified
        });
      } else {
        return appliedResult;
      }
    }

    if (initialProps[key] && !overriddenState[key]) {
      var initialValue = initialProps[key];

      if (initialValue !== appliedValue) {
        return _extends({}, defaultResult, {
          value: initialProps[key],
          type: PropOrigin.initial
        });
      } else {
        return appliedResult;
      }
    }

    if (applied) {
      return appliedResult;
    }

    return _extends({}, defaultResult, {
      value: defaultValue,
      type: PropOrigin["default"]
    });
  }, [initialProps, modifiedState, overriddenState, appliedState, defaultValue]);
};

var useEditableProp = function useEditableProp(key, config) {
  if (config === void 0) {
    config = {};
  }

  var _useEditableContext = useEditableContext(),
      editableId = _useEditableContext.id,
      componentTypeId = _useEditableContext.componentTypeId,
      setSharedProp = _useEditableContext.setSharedProp;

  var _config = config,
      _config$hidden = _config.hidden,
      hidden = _config$hidden === void 0 ? false : _config$hidden;
  var isSelected = useEditableIsSoleSelected();

  var _useState = React.useState(function () {
    return config.id ? config.id : editableId;
  }),
      id = _useState[0];

  var _config2 = config,
      _config2$sync = _config2.sync,
      sync = _config2$sync === void 0 ? false : _config2$sync;
  var sharedProp = useEditableSharedProp(key);
  var prop = useProp(key, id, componentTypeId, config.defaultValue, hidden);
  React.useLayoutEffect(function () {
    if (key === predefinedPropKeys.children) {
      return setComponentCanHaveChildren(id);
    }

    return;
  }, []);
  React.useLayoutEffect(function () {
    if (!isSelected) return;
    setComponentProps(editableId, function (state) {
      var _extends2;

      return _extends({}, state, (_extends2 = {}, _extends2[key] = prop, _extends2));
    });
  }, [isSelected, prop]);
  var value = prop.value;
  React.useLayoutEffect(function () {
    if (!sync) return;
    setSharedProp(key, value);
  }, [sync]);
  return !sync && sharedProp ? sharedProp : prop.value;
};

var UnsavedComponent = function UnsavedComponent(_ref) {
  var _component$componentI, _component$initialPro;

  var component = _ref.component;
  var addable = useAddable((_component$componentI = component.componentId) != null ? _component$componentI : '');
  var Component = React.useMemo(function () {
    return addable == null ? void 0 : addable.component;
  }, [addable]);
  if (!addable) return null;
  var props = (_component$initialPro = component.initialProps) != null ? _component$initialPro : {};
  return React__default.createElement(Editable, Object.assign({
    id: component.uid,
    _config: {
      name: component.name,
      type: addable.sharedType ? component.componentId : '',
      _unsaved: true
    }
  }, props), Component && React__default.createElement(Component, null));
};

var TemporaryComponent = function TemporaryComponent(_ref2) {
  var id = _ref2.id;
  var component = useUnsavedComponent(id);
  if (!component) return null;
  return React__default.createElement(UnsavedComponent, {
    component: component
  });
};

var TemporaryComponentsList = function TemporaryComponentsList(_ref3) {
  var ids = _ref3.ids;
  return React__default.createElement(React__default.Fragment, null, ids.map(function (id) {
    return React__default.createElement(TemporaryComponent, {
      id: id,
      key: id
    });
  }));
};
var TemporaryComponents = function TemporaryComponents() {
  var unsavedComponents = useUnsavedComponents();
  return React__default.createElement(React__default.Fragment, null, Object.entries(unsavedComponents).map(function (_ref4) {
    var key = _ref4[0],
        component = _ref4[1];
    if (!component.isRoot) return null;
    return React__default.createElement(UnsavedComponent, {
      key: key,
      component: component
    });
  }));
};

var EditableChildren = function EditableChildren(_ref) {
  var _useEditableProp;

  var children = _ref.children;
  var storedChildren = (_useEditableProp = useEditableProp(predefinedPropKeys.children, {
    defaultValue: [],
    hidden: true
  })) != null ? _useEditableProp : [];
  return React__default.createElement(React__default.Fragment, null, children, storedChildren && React__default.createElement(TemporaryComponentsList, {
    ids: storedChildren
  }));
};

var EmptyObject = function EmptyObject() {
  return React__default.createElement(EditableChildren, null);
};

var useAddableStore = /*#__PURE__*/create(function () {
  return {
    addables: {}
  };
});
var useAddable = function useAddable(id) {
  return useAddableStore(function (state) {
    return state.addables[id];
  });
};
var getAddable = function getAddable(id) {
  return useAddableStore.getState().addables[id];
};
var registerAddable = function registerAddable(id, component, _ref) {
  var name = _ref.name,
      _ref$sharedType = _ref.sharedType,
      sharedType = _ref$sharedType === void 0 ? true : _ref$sharedType,
      _ref$props = _ref.props,
      props = _ref$props === void 0 ? {} : _ref$props;
  var preppedId = "_addable/" + id;
  useAddableStore.setState(function (state) {
    var _extends2;

    return {
      addables: _extends({}, state.addables, (_extends2 = {}, _extends2[preppedId] = {
        id: preppedId,
        name: name,
        props: props,
        component: component,
        sharedType: sharedType
      }, _extends2))
    };
  });
};
registerAddable('_emptyObject', EmptyObject, {
  name: 'Empty Object',
  sharedType: false,
  props: {}
});

var uiProxy = /*#__PURE__*/valtio.proxy({
  displayAddingComponent: false,
  displayAddingComponentParent: '',
  addingComponent: '',
  addingComponentParent: '',
  componentContextMenu: {
    visible: false,
    components: []
  },
  hoveredComponents: {}
});
var useAddingComponent = function useAddingComponent() {
  return valtio.useProxy(uiProxy).addingComponent;
};
var addComponent$1 = function addComponent(addableId, parent, position) {
  var _addUnsavedComponent, _setSelectedComponent;

  console.log('position', position);
  var addable = getAddable(addableId);
  var id = addUnsavedComponent(addable, parent, (_addUnsavedComponent = {}, _addUnsavedComponent[predefinedPropKeys.position] = position, _addUnsavedComponent));
  setSelectedComponents((_setSelectedComponent = {}, _setSelectedComponent[id] = true, _setSelectedComponent));
};
var addStoredComponent = function addStoredComponent(position) {
  addComponent$1(uiProxy.addingComponent, uiProxy.addingComponentParent, position);
  uiProxy.addingComponent = '';
  uiProxy.addingComponentParent = '';
};
var setComponentHovered = function setComponentHovered(id) {
  var _extends2;

  uiProxy.hoveredComponents = _extends({}, uiProxy.hoveredComponents, (_extends2 = {}, _extends2[id] = true, _extends2));
  return function () {
    var update = _extends({}, uiProxy.hoveredComponents);

    delete update[id];
    uiProxy.hoveredComponents = update;
  };
};
var useIsComponentHovered = function useIsComponentHovered(id) {
  var _hoveredComponents$id;

  var hoveredComponents = valtio.useProxy(uiProxy).hoveredComponents;
  return (_hoveredComponents$id = hoveredComponents[id]) != null ? _hoveredComponents$id : false;
};
var displayComponentContextMenu = function displayComponentContextMenu(components, position) {
  uiProxy.componentContextMenu = {
    visible: true,
    components: components,
    position: position
  };
};
var setDisplayAddingComponentParent = function setDisplayAddingComponentParent(id) {
  uiProxy.displayAddingComponentParent = id;
};
var setAddingComponent = function setAddingComponent(id) {
  uiProxy.addingComponent = id;
  uiProxy.addingComponentParent = uiProxy.displayAddingComponentParent;
};
var setDisplayAddingComponent = function setDisplayAddingComponent(adding, parent) {
  if (parent === void 0) {
    parent = '';
  }

  if (adding) {
    setDisplayAddingComponentParent(parent);
  }

  uiProxy.displayAddingComponent = adding;

  if (!adding) {
    addingComponentClosed = Date.now();
  }
};
var addingComponentClosed = 0;

var shortcutsManager = /*#__PURE__*/new shortcuts.Shortcuts();
var registerShortcut = function registerShortcut(shortcuts, manager) {
  if (!manager) {
    manager = shortcutsManager;
  }

  manager.add(shortcuts);
  return function () {
    var _manager;

    (_manager = manager) == null ? void 0 : _manager.remove(shortcuts);
  };
};
var useShortcut = function useShortcut(shortcuts, manager) {
  React.useEffect(function () {
    return registerShortcut(shortcuts, manager);
  }, []);
};

var SelectedComponentListeners = function SelectedComponentListeners() {
  useShortcut([{
    shortcut: 'Backspace',
    handler: function handler() {
      deleteSelectedComponents();
    }
  }, {
    shortcut: 'Delete',
    handler: function handler() {
      deleteSelectedComponents();
    }
  }, {
    shortcut: 'CmdOrCtrl+C',
    handler: function handler() {
      copySelectedComponents();
    }
  }]);
  return null;
};

var _interactive, _interactive2, _styled;
var useIsItemSelected = function useIsItemSelected(id) {
  var selectedComponents = Object.keys(useSelectedComponents());
  return selectedComponents.includes(id);
};
var TreeItemType;

(function (TreeItemType) {
  TreeItemType["group"] = "group";
  TreeItemType["component"] = "component";
})(TreeItemType || (TreeItemType = {}));

var SceneItemIcon;

(function (SceneItemIcon) {
  SceneItemIcon["group"] = "group";
  SceneItemIcon["groupClosed"] = "groupClosed";
  SceneItemIcon["component"] = "component";
})(SceneItemIcon || (SceneItemIcon = {}));

var ROOT_ID = '__root';

var generateTree = function generateTree(components, groups, groupedComponents, showActive) {
  var items = {};
  var rootChildren = [];
  var groupsChildren = {};
  Object.entries(groups).forEach(function (_ref) {
    var groupId = _ref[0],
        group = _ref[1];
    items[groupId] = {
      id: groupId,
      children: [],
      data: {
        children: [],
        title: group.name,
        type: TreeItemType.group
      }
    };

    if (groupedComponents[groupId]) {
      var parentGroupId = groupedComponents[groupId];

      if (groupsChildren[parentGroupId]) {
        groupsChildren[parentGroupId].push(groupId);
      } else {
        groupsChildren[parentGroupId] = [groupId];
      }
    } else {
      rootChildren.push(groupId);
    }
  });
  Object.entries(groupsChildren).forEach(function (_ref2) {
    var groupId = _ref2[0],
        children = _ref2[1];

    if (items[groupId]) {
      items[groupId].children = items[groupId].children.concat(children);
      items[groupId].data.children = items[groupId].children;
    }
  });
  Object.entries(components).forEach(function (_ref3) {
    var id = _ref3[0],
        component = _ref3[1];
    items[id] = {
      id: id,
      children: [],
      data: {
        children: component.children,
        title: component.name,
        type: TreeItemType.component
      }
    };

    if (component.isRoot) {
      if (groupedComponents[id]) {
        var groupId = groupedComponents[id];

        if (items[groupId]) {
          items[groupId].children.push(id);
          items[groupId].data.children = items[groupId].children;
        }
      } else {
        rootChildren.push(id);
      }
    }
  });
  items[ROOT_ID] = {
    id: ROOT_ID,
    children: rootChildren
  };
  var componentsTree = showActive ? getMainStateStoreState().componentsTree : {};
  Object.values(items).forEach(function (item) {
    if (componentsTree[item.id]) {
      var treeItem = componentsTree[item.id];
      var last = item.children.length;
      var sortedChildren = lodashEs.sortBy(item.children, function (child) {
        return treeItem.children.indexOf(child) !== -1 ? treeItem.children.indexOf(child) : last;
      });
      item.children = sortedChildren;
      item.isExpanded = treeItem.isExpanded;
    }
  });
  return {
    rootId: ROOT_ID,
    items: items
  };
};

var useSceneTree = function useSceneTree(showActive) {
  var activeComponents = useComponentsStore(function (state) {
    return state.components;
  });
  var deactivatedComponents = useComponentsStore(function (state) {
    return state.deactivatedComponents;
  });
  var groups = useMainStateStore(function (state) {
    return state.groups;
  });
  var groupedComponents = useMainStateStore(function (state) {
    return state.groupedComponents;
  });
  var components = showActive ? activeComponents : deactivatedComponents;

  var _useState = React.useState(function () {
    return generateTree(components, groups, groupedComponents, showActive);
  }),
      tree = _useState[0],
      setTree = _useState[1];

  React.useEffect(function () {
    setTree(generateTree(components, groups, groupedComponents, showActive));
  }, [components, groups, groupedComponents]);
  return [tree, setTree];
};

var ItemIcon = function ItemIcon(_ref4) {
  var iconType = _ref4.iconType;

  if (iconType === SceneItemIcon.group) {
    return React__default.createElement(fa.FaFolderOpen, {
      size: 11
    });
  } else if (iconType === SceneItemIcon.groupClosed) {
    return React__default.createElement(fa.FaFolder, {
      size: 11
    });
  }

  return React__default.createElement(fa.FaCube, {
    size: 11
  });
};
var sidePadding = 12;
var StyledChildrenContainer = /*#__PURE__*/styled('div', {
  paddingLeft: sidePadding + "px"
});

var useItemData = function useItemData(id) {
  var component = useComponent(id);
  return component;
};

var SceneChild = function SceneChild(_ref5) {
  var id = _ref5.id;
  var data = useItemData(id);
  if (!data) return null;
  return React__default.createElement(SceneItem, {
    id: id,
    icon: React__default.createElement(ItemIcon, {
      iconType: SceneItemIcon.component
    }),
    draggable: false,
    name: data.name
  });
};

var useChildren = function useChildren(id) {
  var _component$children;

  var component = useComponent(id);
  return (_component$children = component == null ? void 0 : component.children) != null ? _component$children : [];
};

var SceneChildren = function SceneChildren(_ref6) {
  var id = _ref6.id;
  var children = useChildren(id);
  return React__default.createElement(StyledChildrenContainer, null, children.map(function (childId) {
    return React__default.createElement(SceneChild, {
      id: childId,
      key: childId
    });
  }));
};

var StyledDraggableContainer = /*#__PURE__*/styled('div', {
  padding: '1px $1b'
});
var StyledWrapper = /*#__PURE__*/styled('div', {
  position: 'relative'
});
var StyledInputWrapper = /*#__PURE__*/styled('div', {
  position: 'absolute',
  top: '0',
  left: '30px',
  right: '40px',
  bottom: '0',
  display: 'flex',
  alignItems: 'center'
});
var StyledButton = /*#__PURE__*/styled('button', {
  padding: 0,
  margin: 0,
  border: 0,
  font: 'inherit',
  color: 'inherit',
  backgroundColor: 'transparent'
});
var StyledClickable = /*#__PURE__*/styled(StyledButton, {
  display: 'grid',
  alignItems: 'center',
  width: '100%',
  gridTemplateColumns: 'auto 1fr auto',
  columnGap: '$1b',
  padding: '$1b',
  borderRadius: '$2',
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'background 250ms ease, border 250ms ease, color 250ms ease',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.25)'
  },
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px $pink'
  },
  variants: {
    appearance: {
      hovered: {
        backgroundColor: 'rgba(0,0,0,0.25)'
      },
      selected: {
        color: '$white',
        backgroundColor: '$purple',
        '&:hover': {
          backgroundColor: '$purple'
        }
      }
    }
  }
});
var StyledRound = /*#__PURE__*/styled('div', {
  width: '22px',
  height: '22px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'all 250ms ease'
});
var StyledIcon = /*#__PURE__*/styled(StyledRound, {
  border: '2px solid transparent',
  variants: {
    appearance: {
      clickable: {
        '&:hover': {
          borderColor: '$purple',
          backgroundColor: '$purple',
          color: '$white'
        }
      }
    },
    style: {
      interactive: (_interactive = {}, _interactive[StyledClickable + ":hover &"] = {
        borderColor: '$darkPurple'
      }, _interactive['&:hover'] = {
        borderColor: '$purple',
        color: '$white'
      }, _interactive)
    }
  }
});
var StyledTrash = /*#__PURE__*/styled(StyledIcon, (_styled = {
  opacity: 0
}, _styled[StyledClickable + ":hover &"] = {
  opacity: 1
}, _styled["&:hover"] = {
  opacity: 1
}, _styled.variants = {
  style: {
    interactive: (_interactive2 = {}, _interactive2[StyledClickable + ":hover &"] = {
      borderColor: '$darkPurple'
    }, _interactive2["&:hover"] = {
      borderColor: '$purple',
      backgroundColor: '$purple',
      color: '$white'
    }, _interactive2)
  }
}, _styled));
var StyledToggleIcon = /*#__PURE__*/styled('span', {
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2px',
  marginLeft: '2px',
  '&:hover': {
    color: '$white'
  }
});
var StyledOptions = /*#__PURE__*/styled('div', {
  display: 'flex',
  alignItems: 'center'
});
var lastSelectedItem = '';

var setLastSelectedItem = function setLastSelectedItem(id) {
  lastSelectedItem = id;
};

var selectItem = function selectItem(id) {
  var _setSelectedComponent;

  setSelectedComponents((_setSelectedComponent = {}, _setSelectedComponent[id] = true, _setSelectedComponent));
};

var addChildrenToRange = function addChildrenToRange(item, range, tree) {
  item.children.forEach(function (childId) {
    range.push(childId);
    var childItem = tree.items[childId];

    if (childItem) {
      addChildrenToRange(childItem, range, tree);
    }
  });

  if (item.data.children) {
    item.data.children.forEach(function (childId) {
      range.push(childId);
      var childItem = tree.items[childId];

      if (childItem) {
        addChildrenToRange(childItem, range, tree);
      }
    });
  }
};

var getOrderedRange = function getOrderedRange() {
  var _useComponentsStore$g = useComponentsStore.getState(),
      components = _useComponentsStore$g.components;

  var _getMainStateStoreSta = getMainStateStoreState(),
      groups = _getMainStateStoreSta.groups,
      groupedComponents = _getMainStateStoreSta.groupedComponents;

  var tree = generateTree(components, groups, groupedComponents, true);
  var root = tree.items[tree.rootId];
  var range = [];
  root.children.forEach(function (id) {
    range.push(id);
    var item = tree.items[id];
    if (!item) return;
    addChildrenToRange(item, range, tree);
  });
  return range;
};

var selectRange = function selectRange(id) {
  var orderedRange = getOrderedRange();

  if (!lastSelectedItem) {
    var _selectedComponents = Object.keys(getSelectedComponents());

    var last = _selectedComponents.length;
    var sorted = lodashEs.sortBy(_selectedComponents, function (child) {
      return orderedRange.indexOf(child) !== -1 ? orderedRange.indexOf(child) : last;
    });
    lastSelectedItem = sorted[0];
  }

  var fromIndex = orderedRange.indexOf(lastSelectedItem);
  var toIndex = orderedRange.indexOf(id);
  var reverse = toIndex < fromIndex;
  var lowest = reverse ? toIndex : fromIndex;
  var highest = reverse ? fromIndex : toIndex;
  var selected = orderedRange.slice(lowest, highest + 1);
  var selectedComponents = {};
  selected.forEach(function (componentId) {
    selectedComponents[componentId] = true;
  });
  setSelectedComponents(selectedComponents);
};

var EditName = function EditName(_ref7) {
  var name = _ref7.name,
      onChange = _ref7.onChange;

  var _useState2 = React.useState(name),
      editName = _useState2[0],
      setEditName = _useState2[1];

  var inputRef = React.useRef();
  React.useEffect(function () {
    var _inputRef$current;

    (_inputRef$current = inputRef.current) == null ? void 0 : _inputRef$current.focus();
  }, []);
  return React__default.createElement(StyledInputWrapper, {
    as: "form",
    onSubmit: function onSubmit(event) {
      event.preventDefault();
      onChange(editName);
    }
  }, React__default.createElement("input", {
    ref: inputRef,
    type: "text",
    value: editName,
    onChange: function onChange(event) {
      return setEditName(event.target.value);
    },
    onClick: function onClick(event) {
      return event.stopPropagation();
    },
    onBlur: function onBlur() {
      return onChange('');
    }
  }));
};

var SceneItem = function SceneItem(_ref8) {
  var passedName = _ref8.name,
      _ref8$iconProps = _ref8.iconProps,
      iconProps = _ref8$iconProps === void 0 ? {} : _ref8$iconProps,
      icon = _ref8.icon,
      id = _ref8.id,
      isGroup = _ref8.isGroup,
      _ref8$draggable = _ref8.draggable,
      draggable = _ref8$draggable === void 0 ? true : _ref8$draggable,
      _ref8$isExpanded = _ref8.isExpanded,
      isExpanded = _ref8$isExpanded === void 0 ? false : _ref8$isExpanded,
      passedOnClick = _ref8.onClick;
  var isSelected = useIsItemSelected(id);

  var _useState3 = React.useState(false),
      focused = _useState3[0],
      setFocused = _useState3[1];

  var buttonRef = React.useRef();
  var canHaveChildren = useComponentCanHaveChildren(id);
  var customName = useComponentName(id);

  var _useState4 = React.useState(false),
      editingName = _useState4[0],
      setEditingName = _useState4[1];

  var isHovered = useIsComponentHovered(id);
  var name = customName || passedName;
  React.useEffect(function () {
    if (isSelected) {
      buttonRef.current.focus();
    }
  }, [isSelected]);
  React.useEffect(function () {
    if (isSelected && focused) {
      return function () {
        var _buttonRef$current;

        (_buttonRef$current = buttonRef.current) == null ? void 0 : _buttonRef$current.blur();
      };
    }
  }, [isSelected, focused]);
  React.useEffect(function () {
    if (focused && isSelected) {
      var callback = function callback() {
        if (hotkeys.isPressed(27)) {
          setSelectedComponents({});
        }
      };

      hotkeys('*', callback);
      return function () {
        hotkeys.unbind('*', callback);
      };
    }
  }, [focused, isSelected]);
  var updateName = React.useCallback(function (updatedName) {
    setEditingName(false);
    if (!updatedName) return;

    if (isGroup) {
      setGroupName(id, updatedName);
    } else {
      setComponentName(id, updatedName);
    }
  }, [isGroup]);

  var _useMemo = React.useMemo(function () {
    return {
      onNameClicked: function onNameClicked() {
        if (isSelected) {
          setEditingName(true);
        }
      },
      onContextMenu: function onContextMenu(event) {
        event.preventDefault();
        console.log('event', event);
        displayComponentContextMenu(Object.keys(getMainStateStoreState().selectedComponents), [event.clientX, event.clientY]);
      },
      onAddChild: function onAddChild(event) {
        event.stopPropagation();
        setDisplayAddingComponent(true, id);
      },
      onDelete: function onDelete(event) {
        event.stopPropagation();
        deleteComponent(id);
      },
      onFocus: function onFocus() {
        setFocused(true);
      },
      onBlur: function onBlur() {
        setFocused(false);
      },
      onClick: function onClick(event) {
        var _buttonRef$current2;

        event.stopPropagation();
        (_buttonRef$current2 = buttonRef.current) == null ? void 0 : _buttonRef$current2.focus();

        if (isCommandPressed()) {
          if (isSelected) {
            updateSelectedComponents(function (state) {
              var updatedState = _extends({}, state);

              delete updatedState[id];
              return updatedState;
            });
          } else {
            updateSelectedComponents(function (state) {
              var _extends2;

              return _extends({}, state, (_extends2 = {}, _extends2[id] = true, _extends2));
            });
          }

          setLastSelectedItem(id);
        } else if (isShiftPressed()) {
          selectRange(id);
        } else {
          selectItem(id);
          setLastSelectedItem(id);
        }
      }
    };
  }, [isSelected]),
      onClick = _useMemo.onClick,
      onFocus = _useMemo.onFocus,
      onBlur = _useMemo.onBlur,
      onAddChild = _useMemo.onAddChild,
      onContextMenu = _useMemo.onContextMenu,
      onNameClicked = _useMemo.onNameClicked;

  return React__default.createElement(React__default.Fragment, null, focused && React__default.createElement(SelectedComponentListeners, null), React__default.createElement(StyledDraggableContainer, null, React__default.createElement(StyledWrapper, null, React__default.createElement(StyledClickable, {
    ref: buttonRef,
    onClick: onClick,
    onFocus: onFocus,
    onBlur: onBlur,
    onContextMenu: onContextMenu,
    appearance: isSelected ? 'selected' : isHovered ? 'hovered' : ''
  }, React__default.createElement(StyledIcon, Object.assign({}, iconProps, {
    style: draggable ? 'interactive' : ''
  }), icon), React__default.createElement("div", null, React__default.createElement("span", {
    onClick: onNameClicked
  }, name), isGroup && React__default.createElement(StyledToggleIcon, {
    onClick: function onClick(event) {
      event.preventDefault();
      event.stopPropagation();
      passedOnClick();
    }
  }, isExpanded ? React__default.createElement(fa.FaCaretUp, {
    size: 11
  }) : React__default.createElement(fa.FaCaretDown, {
    size: 11
  }))), React__default.createElement(StyledOptions, null, canHaveChildren && React__default.createElement(StyledTrash, {
    style: "interactive",
    onClick: onAddChild
  }, React__default.createElement(fa.FaPlus, {
    size: 10
  })))), editingName && React__default.createElement(EditName, {
    name: name,
    onChange: updateName
  }))), !isGroup && React__default.createElement(SceneChildren, {
    id: id
  }));
};

var Draggable = function Draggable(_ref9) {
  var _provided$dragHandleP, _item$data$children;

  var item = _ref9.item,
      onExpand = _ref9.onExpand,
      onCollapse = _ref9.onCollapse,
      provided = _ref9.provided;
  var isGroup = item.data.type === TreeItemType.group;
  var cantDrag = item.children.length > 0 && item.isExpanded;
  var _item$isExpanded = item.isExpanded,
      isExpanded = _item$isExpanded === void 0 ? false : _item$isExpanded;

  var _ref10 = (_provided$dragHandleP = provided == null ? void 0 : provided.dragHandleProps) != null ? _provided$dragHandleP : {},
      onBlur = _ref10.onBlur,
      onDragStart = _ref10.onDragStart,
      onFocus = _ref10.onFocus,
      onKeyDown = _ref10.onKeyDown,
      onMouseDown = _ref10.onMouseDown,
      onTouchStart = _ref10.onTouchStart,
      otherProps = _objectWithoutPropertiesLoose(_ref10, ["onBlur", "onDragStart", "onFocus", "onKeyDown", "onMouseDown", "onTouchStart"]);

  var dragHandleProps = cantDrag ? _extends({}, otherProps) : _extends({
    onBlur: onBlur,
    onDragStart: onDragStart,
    onFocus: onFocus,
    onKeyDown: onKeyDown,
    onMouseDown: onMouseDown,
    onTouchStart: onTouchStart
  }, otherProps);

  var onHandleClicked = function onHandleClicked() {
    if (isExpanded) {
      onCollapse(item.id);
    } else {
      onExpand(item.id);
    }
  };

  var iconType = isGroup ? isExpanded ? SceneItemIcon.group : SceneItemIcon.groupClosed : SceneItemIcon.component;
  return React__default.createElement("div", Object.assign({
    ref: provided.innerRef
  }, provided.draggableProps), React__default.createElement(SceneItem, {
    id: item.id,
    itemChildren: (_item$data$children = item.data.children) != null ? _item$data$children : [],
    iconProps: dragHandleProps,
    onClick: isGroup ? onHandleClicked : undefined,
    icon: React__default.createElement(ItemIcon, {
      iconType: iconType
    }),
    isGroup: isGroup,
    draggable: !cantDrag,
    isExpanded: isExpanded,
    name: item.data ? item.data.title : ''
  }));
};

var StyledContainer$3 = /*#__PURE__*/styled('div', {
  overflowY: 'auto',
  padding: "6px 0"
});
var SceneList = function SceneList(_ref11) {
  var view = _ref11.view;
  var showActive = view === VIEWS.active;

  var _useSceneTree = useSceneTree(showActive),
      tree = _useSceneTree[0],
      setState = _useSceneTree[1];

  var _useMemo2 = React.useMemo(function () {
    return {
      onExpand: function onExpand(itemId) {
        setState(Tree.mutateTree(tree, itemId, {
          isExpanded: true
        }));
        setComponentTreeItemExpanded(itemId, true);
      },
      onCollapse: function onCollapse(itemId) {
        setState(Tree.mutateTree(tree, itemId, {
          isExpanded: false
        }));
        setComponentTreeItemExpanded(itemId, false);
      },
      onDragEnd: function onDragEnd(source, destination) {
        if (!destination) {
          return;
        }

        var destinationItem = tree.items[destination.parentId];
        if (destination.parentId !== ROOT_ID && (!destinationItem || destinationItem.data.type !== TreeItemType.group)) return;
        var updatedTree = Tree.moveItemOnTree(tree, source, destination);

        if (source.parentId !== destination.parentId) {
          var id = tree.items[source.parentId].children[source.index];

          if (!id) {
            throw new Error("Id not found " + id);
          }

          updateComponentLocation(id, destination.parentId);
        }

        setComponentsTree(updatedTree);
        setState(updatedTree);
      }
    };
  }, [tree]),
      onExpand = _useMemo2.onExpand,
      onCollapse = _useMemo2.onCollapse,
      onDragEnd = _useMemo2.onDragEnd;

  return React__default.createElement(StyledContainer$3, null, React__default.createElement(Tree__default, {
    tree: tree,
    renderItem: Draggable,
    onExpand: onExpand,
    onCollapse: onCollapse,
    onDragEnd: onDragEnd,
    isDragEnabled: showActive,
    isNestingEnabled: showActive,
    offsetPerLevel: sidePadding,
    key: showActive ? 'active' : 'deactivated'
  }));
};

var StyledContainer$4 = /*#__PURE__*/styled('div', {
  display: 'grid',
  height: '100%',
  gridTemplateRows: 'auto minmax(0, 1fr) auto'
});
var StyledTextButton = /*#__PURE__*/styled(StyledButton, {
  cursor: 'pointer',
  color: '$midPurple',
  '&:hover': {
    color: '$lightPurple',
    textDecoration: 'underline'
  }
});
var StyledPlainButton = /*#__PURE__*/styled(StyledButton, {
  fontSize: '$1b',
  fontWeight: '$medium',
  border: '2px solid $purple',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '9999999px',
  padding: '$2',
  transition: '200ms ease all',
  '&:not(:disabled)': {
    cursor: 'pointer'
  },
  '&:hover:not(:disabled)': {
    borderColor: '$purple',
    backgroundColor: '$purple',
    color: '$white'
  },
  '&:disabled': {
    borderColor: 'transparent',
    opacity: 0.6
  },
  variants: {
    appearance: {
      faint: {
        borderColor: '$darkPurple'
      }
    },
    shape: {
      tiny: {
        padding: '0 $1b',
        fontSize: '$1'
      },
      full: {
        width: '100%'
      },
      thinner: {
        padding: '0 $2b',
        height: '25px'
      },
      thinnerWide: {
        padding: '0 $2b',
        height: '25px',
        width: '100%'
      },
      round: {
        padding: '0',
        width: '25px',
        height: '25px'
      }
    }
  }
});
var StyledHeading = /*#__PURE__*/styled('h3', {
  fontSize: '$1b'
});
var StyledBox = /*#__PURE__*/styled('div', {
  maxHeight: '100%'
});
var StyledPaddedBox = /*#__PURE__*/styled('div', {
  padding: '$2b $3',
  variants: {
    visual: {
      top: {
        borderBottom: '1px solid $faint'
      },
      bottom: {
        borderTop: '1px solid $faint'
      }
    }
  }
});
var StyledHeader = /*#__PURE__*/styled(StyledPaddedBox, {
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: '1fr auto',
  columnGap: '$2'
});
var VIEWS;

(function (VIEWS) {
  VIEWS["active"] = "active";
  VIEWS["deactivated"] = "deactivated";
})(VIEWS || (VIEWS = {}));

var ManagerSidebar = function ManagerSidebar() {
  var _useState = React.useState(VIEWS.active),
      selectedView = _useState[0],
      setSelectedView = _useState[1];

  return React__default.createElement(StyledContainer$4, null, React__default.createElement(StyledHeader, {
    visual: "top"
  }, React__default.createElement(StyledHeading, null, "Scene"), React__default.createElement("div", null, React__default.createElement("select", {
    value: selectedView,
    onChange: function onChange(event) {
      return setSelectedView(event.target.value);
    }
  }, React__default.createElement("option", {
    value: VIEWS.active
  }, "Active"), React__default.createElement("option", {
    value: VIEWS.deactivated
  }, "Deactivated")))), React__default.createElement(StyledBox, {
    onClick: function onClick() {
      if (!uiProxy.displayAddingComponent && addingComponentClosed < Date.now() - 50) {
        setSelectedComponents({});
      }
    }
  }, React__default.createElement(SceneList, {
    view: selectedView
  })), React__default.createElement(StyledPaddedBox, {
    visual: "bottom"
  }, React__default.createElement(StyledPlainButton, {
    shape: "full",
    onClick: function onClick() {
      setDisplayAddingComponent(true);
    }
  }, "Add Component")));
};

var SelectInput = function SelectInput(_ref) {
  var inputId = _ref.inputId,
      value = _ref.value,
      passedOnChange = _ref.onChange,
      options = _ref.options;

  var _useState = React.useState(value != null ? value : ''),
      inputValue = _useState[0],
      setInputValue = _useState[1];

  React.useEffect(function () {
    setInputValue(value != null ? value : '');
  }, [value]);

  var _useMemo = React.useMemo(function () {
    return {
      onChange: function onChange(event) {
        var newValue = event.target.value;
        setInputValue(newValue);
        passedOnChange(newValue);
      }
    };
  }, [passedOnChange]),
      onChange = _useMemo.onChange;

  return React__default.createElement("select", {
    id: inputId,
    value: inputValue,
    onChange: onChange
  }, options.map(function (option) {
    var _option$label;

    return React__default.createElement("option", {
      key: option.value,
      value: option.value
    }, (_option$label = option.label) != null ? _option$label : option.value);
  }));
};

var StyledHeaderOptions = /*#__PURE__*/styled('div', {
  display: 'flex',
  alignItems: 'center',
  '> button': {
    marginLeft: '$1'
  }
});
var PropInputOptions = function PropInputOptions(_ref) {
  var inputValue = _ref.inputValue,
      propType = _ref.propType,
      componentId = _ref.componentId,
      propKey = _ref.propKey,
      componentTypeId = _ref.componentTypeId;
  var applyValue = React.useCallback(function () {
    setSharedComponentPropValue(componentTypeId, propKey, inputValue);
  }, [inputValue]);

  var _useMemo = React.useMemo(function () {
    return {
      onReset: function onReset() {
        resetComponentProp(componentId, propKey);
      }
    };
  }, []),
      onReset = _useMemo.onReset;

  return React__default.createElement(StyledHeaderOptions, null, (propType === PropOrigin.modified || propType === PropOrigin.initial) && React__default.createElement(React__default.Fragment, null, React__default.createElement(StyledTextButton, {
    onClick: onReset
  }, "reset"), !!componentTypeId && React__default.createElement(StyledTextButton, {
    onClick: applyValue
  }, "apply")));
};

var Context$1 = /*#__PURE__*/React.createContext({
  propType: '',
  propKey: '',
  componentId: '',
  componentTypeId: ''
});
var usePropContext = function usePropContext() {
  return React.useContext(Context$1);
};
var Module = function Module(_ref) {
  var _propConfig$defaultVa;

  var componentId = _ref.componentId,
      componentTypeId = _ref.componentTypeId,
      value = _ref.value,
      propKey = _ref.propKey,
      propType = _ref.propType,
      passedOnChange = _ref.onChange;

  var _useState = React.useState(value),
      inputValue = _useState[0],
      setInputValue = _useState[1];

  var updateValue = React.useCallback(function (newValue) {
    storeSnapshot();
    setComponentPropValue(componentId, propKey, newValue);

    if (passedOnChange) {
      passedOnChange(newValue);
    }
  }, [componentId]);

  var _useMemo = React.useMemo(function () {
    return {
      onChange: function onChange(newValue) {
        setInputValue(newValue);
        updateValue(newValue);
      }
    };
  }, [updateValue]),
      onChange = _useMemo.onChange;

  React.useEffect(function () {
    setInputValue(value);
  }, [value]);
  var propConfig = React.useMemo(function () {
    return predefinedProps[propKey];
  }, [propKey]);
  var InputComponent = React.useMemo(function () {
    var _propConfig$input;

    return (_propConfig$input = propConfig == null ? void 0 : propConfig.input) != null ? _propConfig$input : UnknownInput;
  }, [propConfig]);
  var defaultValue = (_propConfig$defaultVa = propConfig == null ? void 0 : propConfig.defaultValue) != null ? _propConfig$defaultVa : '';
  var inputId = "input-" + propKey;
  return React__default.createElement(Context$1.Provider, {
    value: {
      propType: propType,
      propKey: propKey,
      componentId: componentId,
      componentTypeId: componentTypeId
    }
  }, React__default.createElement("div", null, InputComponent && React__default.createElement(InputComponent, {
    inputId: inputId,
    value: inputValue != null ? inputValue : defaultValue,
    onChange: onChange
  })));
};
var ComponentModules = function ComponentModules(_ref2) {
  var componentId = _ref2.componentId,
      componentTypeId = _ref2.componentTypeId,
      props = _ref2.props;
  return React__default.createElement("div", null, Object.entries(props).map(function (_ref3) {
    var propKey = _ref3[0],
        prop = _ref3[1];
    if (prop.value === undefined) return null;
    return React__default.createElement(Module, {
      key: propKey,
      propKey: propKey,
      propType: prop.type,
      value: prop.value,
      componentId: componentId,
      componentTypeId: componentTypeId
    });
  }));
};

var StyledBox$1 = /*#__PURE__*/styled('div', {});

var StyledContainer$5 = /*#__PURE__*/styled('div', {
  padding: '$3',
  borderTop: '1px solid $faint'
});
var StyledHeader$1 = /*#__PURE__*/styled('div', {
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: 'auto 1fr auto',
  columnGap: '$2'
});
var StyledLabel$1 = /*#__PURE__*/styled('label', {
  fontSize: '$1b',
  fontWeight: '$semi'
});
var StyledInputWrapper$1 = /*#__PURE__*/styled('div', {
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: 'auto 1fr',
  columnGap: '$2',
  marginTop: '$2'
});
var StyledInputLabel = /*#__PURE__*/styled('label', {
  minWidth: '60px',
  display: 'inline-grid',
  fontSize: '$1b'
});
var StyledBody = /*#__PURE__*/styled('div', {
  marginTop: '$3'
});
var StyledCollidersContainer = /*#__PURE__*/styled('div', {
  border: '1px solid $faint',
  marginLeft: '-$2',
  marginRight: '-$2',
  maxWidth: 'none',
  marginTop: '$2'
});
var StyledCollidersHeader = /*#__PURE__*/styled('header', {
  padding: '$2',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  columnGap: '$2',
  alignItems: 'center'
});
var RigidBodyColliderShape;

(function (RigidBodyColliderShape) {
  RigidBodyColliderShape["BALL"] = "BALL";
  RigidBodyColliderShape["CUBIOD"] = "CUBIOD";
})(RigidBodyColliderShape || (RigidBodyColliderShape = {}));

var RigidBodyType;

(function (RigidBodyType) {
  RigidBodyType["DYNAMIC"] = "DYNAMIC";
  RigidBodyType["STATIC"] = "STATIC";
  RigidBodyType["KINEMATIC"] = "KINEMATIC";
})(RigidBodyType || (RigidBodyType = {}));

var options = [{
  value: RigidBodyType.DYNAMIC,
  label: 'Dynamic'
}, {
  value: RigidBodyType.STATIC,
  label: 'Static'
}, {
  value: RigidBodyType.KINEMATIC,
  label: 'Kinematic'
}];
var StyledColliderContainer = /*#__PURE__*/styled('div', {
  padding: '$2',
  borderTop: '1px solid $faint'
});

var RigidBody3DColliderInput = function RigidBody3DColliderInput(_ref) {
  var collider = _ref.collider,
      onChange = _ref.onChange,
      onDelete = _ref.onDelete;
  var colliderType = collider.colliderType,
      key = collider.key,
      _collider$radius = collider.radius,
      radius = _collider$radius === void 0 ? 1 : _collider$radius,
      _collider$hx = collider.hx,
      hx = _collider$hx === void 0 ? 0.5 : _collider$hx,
      _collider$hy = collider.hy,
      hy = _collider$hy === void 0 ? 0.5 : _collider$hy,
      _collider$hz = collider.hz,
      hz = _collider$hz === void 0 ? 0.5 : _collider$hz;

  var _useMemo = React.useMemo(function () {
    return {
      updateValue: function updateValue(newValue) {
        var updatedCollider = _extends({}, collider, newValue);

        onChange(updatedCollider);
      }
    };
  }, [onChange]),
      updateValue = _useMemo.updateValue;

  return React__default.createElement(StyledColliderContainer, null, React__default.createElement(StyledInputWrapper$1, {
    css: {
      gridTemplateColumns: 'auto 1fr auto',
      marginTop: '0'
    }
  }, React__default.createElement(StyledInputLabel, {
    htmlFor: key + "-shape"
  }, "Shape"), React__default.createElement("div", null, React__default.createElement(SelectInput, {
    inputId: key + "-shape",
    value: colliderType,
    onChange: function onChange(newValue) {
      updateValue({
        colliderType: newValue
      });
    },
    options: [{
      value: RigidBodyColliderShape.BALL,
      label: 'Ball'
    }, {
      value: RigidBodyColliderShape.CUBIOD,
      label: 'Cubiod'
    }]
  })), React__default.createElement("div", null, React__default.createElement("button", {
    onClick: onDelete
  }, React__default.createElement(fa.FaTimes, {
    size: 11
  })))), colliderType === RigidBodyColliderShape.BALL && React__default.createElement(React__default.Fragment, null, React__default.createElement(StyledInputWrapper$1, null, React__default.createElement(StyledInputLabel, {
    htmlFor: key + "-radius"
  }, "Radius"), React__default.createElement(NumberInput, {
    inputId: key + "-radius",
    value: radius,
    onChange: function onChange(newValue) {
      updateValue({
        radius: newValue
      });
    }
  }))), colliderType === RigidBodyColliderShape.CUBIOD && React__default.createElement(React__default.Fragment, null, React__default.createElement(StyledInputWrapper$1, null, React__default.createElement(StyledInputLabel, {
    htmlFor: key + "-hx"
  }, "hx"), React__default.createElement(NumberInput, {
    inputId: key + "-hx",
    value: hx,
    onChange: function onChange(newValue) {
      updateValue({
        hx: newValue
      });
    }
  })), React__default.createElement(StyledInputWrapper$1, null, React__default.createElement(StyledInputLabel, {
    htmlFor: key + "-hy"
  }, "hy"), React__default.createElement(NumberInput, {
    inputId: key + "-hy",
    value: hy,
    onChange: function onChange(newValue) {
      updateValue({
        hy: newValue
      });
    }
  })), React__default.createElement(StyledInputWrapper$1, null, React__default.createElement(StyledInputLabel, {
    htmlFor: key + "-hz"
  }, "hz"), React__default.createElement(NumberInput, {
    inputId: key + "-hz",
    value: hz,
    onChange: function onChange(newValue) {
      updateValue({
        hz: newValue
      });
    }
  }))));
};

var RigidBody3DInput = function RigidBody3DInput(_ref2) {
  var value = _ref2.value,
      inputId = _ref2.inputId,
      passedOnChange = _ref2.onChange;

  var _useState = React.useState(true),
      isExpanded = _useState[0],
      setIsExpanded = _useState[1];

  var _value$enabled = value.enabled,
      enabled = _value$enabled === void 0 ? true : _value$enabled,
      _value$bodyType = value.bodyType,
      bodyType = _value$bodyType === void 0 ? RigidBodyType.DYNAMIC : _value$bodyType,
      _value$mass = value.mass,
      mass = _value$mass === void 0 ? 1 : _value$mass,
      _value$colliders = value.colliders,
      colliders = _value$colliders === void 0 ? [] : _value$colliders;

  var _useMemo2 = React.useMemo(function () {
    return {
      addCollider: function addCollider() {
        var newCollider = {
          key: Date.now().toString(),
          colliderType: RigidBodyColliderShape.BALL
        };

        var updatedValue = _extends({}, value, {
          colliders: colliders.concat([newCollider])
        });

        passedOnChange(updatedValue);
      },
      updateCollider: function updateCollider(index, newValue) {
        var updatedColliders = colliders.slice();
        updatedColliders[index] = newValue;

        var updatedValue = _extends({}, value, {
          colliders: updatedColliders
        });

        passedOnChange(updatedValue);
      },
      deleteCollider: function deleteCollider(index) {
        var updatedColliders = colliders.slice();
        updatedColliders.splice(index, 1);

        var updatedValue = _extends({}, value, {
          colliders: updatedColliders
        });

        passedOnChange(updatedValue);
      }
    };
  }, [value, colliders]),
      addCollider = _useMemo2.addCollider,
      updateCollider = _useMemo2.updateCollider,
      deleteCollider = _useMemo2.deleteCollider;

  var _usePropContext = usePropContext(),
      propKey = _usePropContext.propKey,
      propType = _usePropContext.propType,
      componentTypeId = _usePropContext.componentTypeId,
      componentId = _usePropContext.componentId;

  return React__default.createElement(StyledContainer$5, null, React__default.createElement(StyledHeader$1, null, React__default.createElement("div", null, React__default.createElement("input", {
    id: inputId,
    type: "checkbox",
    checked: enabled,
    onChange: function onChange(event) {
      var updatedValue = _extends({}, value, {
        enabled: event.target.checked
      });

      passedOnChange(updatedValue);
    }
  })), React__default.createElement(StyledBox$1, {
    css: {
      display: 'grid',
      alignItems: 'center',
      gridTemplateColumns: 'auto 1fr',
      columnGap: '$0b'
    }
  }, React__default.createElement(StyledLabel$1, {
    htmlFor: inputId
  }, "RigidBody 3D"), React__default.createElement(PropInputOptions, {
    propKey: propKey,
    propType: propType,
    componentId: componentId,
    componentTypeId: componentTypeId,
    inputValue: value
  })), React__default.createElement("div", null, React__default.createElement("button", {
    onClick: function onClick() {
      setIsExpanded(function (state) {
        return !state;
      });
    }
  }, isExpanded ? React__default.createElement(fa.FaCaretUp, null) : React__default.createElement(fa.FaCaretDown, null)))), isExpanded && React__default.createElement(StyledBody, null, React__default.createElement(StyledInputWrapper$1, null, React__default.createElement(StyledInputLabel, {
    htmlFor: "rigidBody3d-type"
  }, "Type"), React__default.createElement("div", null, React__default.createElement(SelectInput, {
    inputId: "rigidBody3d-type",
    value: bodyType,
    onChange: function onChange(newValue) {
      var updatedValue = _extends({}, value, {
        bodyType: newValue
      });

      passedOnChange(updatedValue);
    },
    options: options
  }))), bodyType === RigidBodyType.DYNAMIC && React__default.createElement(StyledInputWrapper$1, null, React__default.createElement(StyledInputLabel, {
    htmlFor: "rigidBody3d-mass"
  }, "Mass"), React__default.createElement("div", null, React__default.createElement(NumberInput, {
    inputId: "rigidBody3d-mass",
    value: mass,
    onChange: function onChange(newValue) {
      var updatedValue = _extends({}, value, {
        mass: newValue
      });

      passedOnChange(updatedValue);
    }
  }))), React__default.createElement(StyledCollidersContainer, null, React__default.createElement(StyledCollidersHeader, null, React__default.createElement("div", null, React__default.createElement(StyledInputLabel, null, "Colliders")), React__default.createElement(StyledPlainButton, {
    shape: "thinnerWide",
    onClick: addCollider
  }, "Add Collider")), colliders.length > 0 && React__default.createElement("div", null, colliders.map(function (collider, index) {
    return React__default.createElement("div", {
      key: collider.key
    }, React__default.createElement(RigidBody3DColliderInput, {
      collider: collider,
      onChange: function onChange(newValue) {
        updateCollider(index, newValue);
      },
      onDelete: function onDelete() {
        deleteCollider(index);
      }
    }));
  })))));
};

var _predefinedProps, _predefinedBottomProp;
var childrenProp = {
  key: '__children',
  label: 'Children'
};
var modulesProp = {
  key: '__modules',
  label: 'Modules'
};
var rigidBody3dModuleProp = {
  key: '__rigidBody3dModule',
  label: 'RigidBody 3D',
  input: RigidBody3DInput,
  defaultValue: undefined
};
var positionProp = {
  key: '__position',
  label: 'Position',
  input: MultiNumberInput,
  defaultValue: {
    x: 0,
    y: 0,
    z: 0
  }
};
var rotationProp = {
  key: '__rotation',
  label: 'Rotation',
  input: MultiNumberInput,
  defaultValue: {
    x: 0,
    y: 0,
    z: 0
  }
};
var scaleProp = {
  key: '__scale',
  label: 'Scale',
  input: MultiNumberInput,
  defaultValue: {
    x: 1,
    y: 1,
    z: 1
  }
};
var predefinedProps = (_predefinedProps = {}, _predefinedProps[positionProp.key] = positionProp, _predefinedProps[rotationProp.key] = rotationProp, _predefinedProps[scaleProp.key] = scaleProp, _predefinedProps[rigidBody3dModuleProp.key] = rigidBody3dModuleProp, _predefinedProps);
var predefinedBottomProps = (_predefinedBottomProp = {}, _predefinedBottomProp[rigidBody3dModuleProp.key] = rigidBody3dModuleProp, _predefinedBottomProp);
var predefinedPropKeys = {
  position: positionProp.key,
  rotation: rotationProp.key,
  scale: scaleProp.key,
  rigidBody3d: rigidBody3dModuleProp.key,
  modules: modulesProp.key,
  children: childrenProp.key
};

var StyledContainer$6 = /*#__PURE__*/styled('div', {
  height: '100%',
  display: 'grid',
  gridTemplateRows: '1fr auto'
});
var StyledProp = /*#__PURE__*/styled('div', {
  marginTop: '$2'
});
var StyledHeader$2 = /*#__PURE__*/styled('header', {
  display: 'flex',
  alignItems: 'center',
  padding: '0 $3',
  marginBottom: '$1',
  minHeight: '18px'
});
var StyledHeaderLabel = /*#__PURE__*/styled('label', {
  fontSize: '$1b'
});
var StyledInputContainer = /*#__PURE__*/styled('div', {
  padding: '0 $3'
});

var PropInput = function PropInput(_ref) {
  var _propConfig$label;

  var componentId = _ref.componentId,
      componentTypeId = _ref.componentTypeId,
      propKey = _ref.propKey,
      value = _ref.value,
      propType = _ref.propType;

  var _useState = React.useState(value),
      inputValue = _useState[0],
      setInputValue = _useState[1];

  React.useEffect(function () {
    setInputValue(value);
  }, [value]);
  var inputId = "input-" + propKey;
  var propConfig = React.useMemo(function () {
    return predefinedProps[propKey];
  }, [propKey]);
  var label = (_propConfig$label = propConfig == null ? void 0 : propConfig.label) != null ? _propConfig$label : propKey;
  return React__default.createElement(StyledProp, null, React__default.createElement(StyledHeader$2, null, React__default.createElement(StyledHeaderLabel, {
    htmlFor: inputId
  }, label || propKey), React__default.createElement(PropInputOptions, {
    propKey: propKey,
    propType: propType,
    componentId: componentId,
    componentTypeId: componentTypeId,
    inputValue: inputValue
  })), React__default.createElement(StyledInputContainer, null, React__default.createElement(Module, {
    propType: propType,
    componentId: componentId,
    componentTypeId: componentTypeId,
    value: value,
    propKey: propKey,
    onChange: setInputValue
  })));
};

var defaultOrder = [positionProp.key, rotationProp.key, scaleProp.key];

var sortProps = function sortProps(_ref2, _ref3) {
  var propA = _ref2[0];
  var propB = _ref3[0];
  var propAIndex = defaultOrder.indexOf(propA);
  propAIndex = propAIndex === -1 ? 9999 : propAIndex;
  var propBIndex = defaultOrder.indexOf(propB);
  propBIndex = propBIndex === -1 ? 9999 : propBIndex;
  return propAIndex - propBIndex;
};

var CustomProps = function CustomProps(_ref4) {
  var componentId = _ref4.componentId,
      componentTypeId = _ref4.componentTypeId,
      props = _ref4.props;
  return React__default.createElement("div", null, Object.entries(props).sort(sortProps).map(function (_ref5) {
    var key = _ref5[0],
        prop = _ref5[1];
    return React__default.createElement(PropInput, {
      componentId: componentId,
      componentTypeId: componentTypeId,
      key: key,
      propKey: key,
      value: prop.value,
      propType: prop.type
    });
  }));
};

var ComponentState = function ComponentState(_ref6) {
  var _component$componentI;

  var id = _ref6.id;
  var componentProps = useComponentProps(id);
  var component = useComponent(id);
  var componentTypeId = (_component$componentI = component == null ? void 0 : component.componentId) != null ? _component$componentI : '';

  var _modulesProp$key = modulesProp.key,
      modules = componentProps[_modulesProp$key],
      remainingProps = _objectWithoutPropertiesLoose(componentProps, [_modulesProp$key].map(_toPropertyKey));

  var _useMemo = React.useMemo(function () {
    var customProps = {};
    var bottomProps = {};
    Object.entries(remainingProps).forEach(function (_ref7) {
      var key = _ref7[0],
          prop = _ref7[1];
      if (prop.hidden) return;

      if (predefinedBottomProps[key]) {
        bottomProps[key] = prop;
      } else {
        customProps[key] = prop;
      }
    });
    return {
      customProps: customProps,
      bottomProps: bottomProps
    };
  }, [remainingProps]),
      customProps = _useMemo.customProps,
      bottomProps = _useMemo.bottomProps;

  var _useMemo2 = React.useMemo(function () {
    return {
      addModule: function addModule() {
        if (!componentProps[rigidBody3dModuleProp.key] || componentProps[rigidBody3dModuleProp.key].value === undefined) {
          setComponentPropValue(id, rigidBody3dModuleProp.key, {
            enabled: true
          });
        }
      }
    };
  }, [componentProps]),
      addModule = _useMemo2.addModule;

  return React__default.createElement(React__default.Fragment, null, React__default.createElement(StyledContainer$6, null, React__default.createElement(CustomProps, {
    componentId: id,
    componentTypeId: componentTypeId,
    props: customProps
  }), modules && React__default.createElement(ComponentModules, {
    componentId: id,
    componentTypeId: componentTypeId,
    props: bottomProps
  })), modules && React__default.createElement(StyledPaddedBox, {
    visual: "bottom"
  }, React__default.createElement(StyledPlainButton, {
    shape: "full",
    onClick: addModule
  }, "Add Module")));
};

var StyledContainer$7 = /*#__PURE__*/styled('div', {
  height: '100%',
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto'
});
var Context$2 = /*#__PURE__*/React.createContext(null);

var SidebarHeader = function SidebarHeader(_ref) {
  var _component$name;

  var id = _ref.id;
  var component = useComponent(id);
  var customName = useComponentName(id);
  var name = customName || ((_component$name = component == null ? void 0 : component.name) != null ? _component$name : '');
  return React__default.createElement(StyledPaddedBox, {
    visual: "top"
  }, React__default.createElement(StyledHeading, null, name));
};

var StateSidebar = function StateSidebar() {
  var selectedComponent = useSoleSelectedComponent();
  if (!selectedComponent) return null;
  return React__default.createElement(Context$2.Provider, {
    value: {
      selectedComponent: selectedComponent
    }
  }, React__default.createElement(StyledContainer$7, null, React__default.createElement(SidebarHeader, {
    id: selectedComponent
  }), React__default.createElement(ComponentState, {
    id: selectedComponent,
    key: selectedComponent
  })));
};

var StyledContainer$8 = /*#__PURE__*/styled('div', {
  position: 'absolute',
  left: '100%',
  top: 0,
  bottom: 0,
  zIndex: '$high',
  width: '260px',
  backgroundColor: '$darkGreyLighter',
  borderLeft: '1px solid $darkGrey',
  padding: '$2',
  overflowY: 'auto'
});
var StyledAddableComponent = /*#__PURE__*/styled(StyledClickable, {
  '&:not(:first-child)': {
    marginTop: '$0b'
  }
});
var StyledIconWrapper = /*#__PURE__*/styled('span', {
  position: 'relative',
  left: '1px'
});

var closeAddingComponent = function closeAddingComponent() {
  setDisplayAddingComponent(false);
  setDisplayAddingComponentParent('');
};

var AddableComponent = function AddableComponent(_ref) {
  var label = _ref.label,
      addableId = _ref.addableId;
  return React__default.createElement(StyledAddableComponent, {
    onClick: function onClick() {
      addComponent$1(addableId, uiProxy.displayAddingComponentParent);
      closeAddingComponent();
    }
  }, React__default.createElement(StyledIcon, null, React__default.createElement(ItemIcon, {
    iconType: SceneItemIcon.component
  })), React__default.createElement("div", null, label), React__default.createElement(StyledIcon, {
    appearance: "clickable",
    onClick: function onClick(event) {
      event.stopPropagation();
      setAddingComponent(addableId);
      closeAddingComponent();
    }
  }, React__default.createElement(StyledIconWrapper, null, React__default.createElement(fa.FaMousePointer, {
    size: 10
  }))));
};

var AddingComponentMenu = function AddingComponentMenu() {
  var isAddingComponent = valtio.useProxy(uiProxy).displayAddingComponent;
  var addables = useAddableStore(function (state) {
    return state.addables;
  });
  if (!isAddingComponent) return null;
  return React__default.createElement(OutsideClickHandler, {
    onOutsideClick: closeAddingComponent
  }, React__default.createElement(StyledContainer$8, null, Object.entries(addables).map(function (_ref2) {
    var key = _ref2[0],
        addable = _ref2[1];
    return React__default.createElement(AddableComponent, {
      addableId: addable.id,
      label: addable.name,
      key: key
    });
  })));
};

var StyledContainer$9 = /*#__PURE__*/styled('div', {
  zIndex: '$max',
  backgroundColor: '$darkGrey',
  padding: '$1 0',
  width: '180px',
  border: '1px solid $lightPurple',
  borderRadius: '$1'
});
var StyledOption = /*#__PURE__*/styled(StyledButton, {
  width: '100%',
  padding: '$1 $2',
  textAlign: 'left',
  cursor: 'pointer',
  fontSize: '$1b',
  fontWeight: '$semi',
  '&:hover': {
    backgroundColor: '$purple',
    color: '$white'
  }
});

var closeContextMenu = function closeContextMenu() {
  uiProxy.componentContextMenu = {
    visible: false
  };
};

var useSelectedComponentTypes = function useSelectedComponentTypes(componentIds) {
  return React.useMemo(function () {
    var allRoot = true;
    var componentsSelected = false;
    var inactiveComponents = false;
    var groups = false;

    var _useComponentsStore$g = useComponentsStore.getState(),
        components = _useComponentsStore$g.components,
        deactivatedComponents = _useComponentsStore$g.deactivatedComponents;

    componentIds.forEach(function (id) {
      if (components[id]) {
        componentsSelected = true;
        var component = components[id];

        if (!component.isRoot) {
          allRoot = false;
        }
      } else if (deactivatedComponents[id]) {
        inactiveComponents = true;
      } else {
        groups = true;
      }
    });
    return {
      allRoot: allRoot,
      hasComponents: componentsSelected,
      hasInactiveComponents: inactiveComponents,
      hasGroups: groups
    };
  }, [componentIds]);
};

var ComponentsMenu = function ComponentsMenu(_ref) {
  var components = _ref.components;

  var _useSelectedComponent = useSelectedComponentTypes(components),
      allRoot = _useSelectedComponent.allRoot,
      hasComponents = _useSelectedComponent.hasComponents,
      hasInactiveComponents = _useSelectedComponent.hasInactiveComponents,
      hasGroups = _useSelectedComponent.hasGroups;

  var _useMemo = React.useMemo(function () {
    return {
      onGroup: function onGroup() {
        groupComponents(components);
        closeContextMenu();
      },
      onDelete: function onDelete() {
        deleteSelectedComponents();
        closeContextMenu();
      },
      onReactivate: function onReactivate() {
        removeDeactivatedComponents(components);
        closeContextMenu();
      }
    };
  }, [components]),
      onDelete = _useMemo.onDelete,
      onReactivate = _useMemo.onReactivate,
      onGroup = _useMemo.onGroup;

  var options = React.useMemo(function () {
    var multipleComponents = components.length > 1;
    var allActive = !hasInactiveComponents;
    var options = [];
    var canGroup = allRoot;

    if (allActive) {
      if (!hasGroups) {
        if (canGroup) {
          options.push(React__default.createElement(StyledOption, {
            onClick: onGroup,
            key: "groupComponents"
          }, "Group component", multipleComponents ? 's' : ''));
        }

        options.push(React__default.createElement(StyledOption, {
          onClick: onDelete,
          key: "delete"
        }, "Delete component", multipleComponents ? 's' : ''));
      } else if ((hasComponents || hasGroups) && canGroup) {
        options.push(React__default.createElement(StyledOption, {
          onClick: onGroup,
          key: "group"
        }, "Group"));
      }
    }

    if (hasInactiveComponents) {
      options.push(React__default.createElement(StyledOption, {
        onClick: onReactivate,
        key: "restore"
      }, "Restore"));
    }

    return options;
  }, [components, onDelete, onReactivate, onGroup, hasComponents, hasInactiveComponents, hasGroups, allRoot]);
  return React__default.createElement(StyledContainer$9, null, options);
};

var ContextMenu = function ContextMenu() {
  var _useProxy = valtio.useProxy(uiProxy),
      componentContextMenu = _useProxy.componentContextMenu;

  if (!componentContextMenu.visible) return null;
  var _componentContextMenu = componentContextMenu.position,
      position = _componentContextMenu === void 0 ? [0, 0] : _componentContextMenu,
      _componentContextMenu2 = componentContextMenu.components,
      components = _componentContextMenu2 === void 0 ? [] : _componentContextMenu2;
  return React__default.createElement(OutsideClickHandler, {
    onOutsideClick: closeContextMenu
  }, React__default.createElement("div", {
    style: {
      position: 'fixed',
      left: position[0] + "px",
      top: position[1] + "px"
    }
  }, React__default.createElement(ComponentsMenu, {
    components: components
  })));
};

var delay = 100;
var GlobalHotkeysListener = function GlobalHotkeysListener() {
  var localStateRef = React.useRef({
    lastUndo: 0,
    lastRedo: 0,
    lastPaste: 0,
    lastSave: 0
  });
  useShortcut([{
    shortcut: 'CmdOrCtrl+Z',
    handler: function handler() {
      var now = Date.now();

      if (now > localStateRef.current.lastUndo + delay) {
        localStateRef.current.lastUndo = now;
        undoState();
      }
    }
  }, {
    shortcut: 'CmdOrCtrl+Shift+Z',
    handler: function handler() {
      var now = Date.now();

      if (now > localStateRef.current.lastRedo + delay) {
        localStateRef.current.lastRedo = now;
        redoState();
      }
    }
  }, {
    shortcut: 'CmdOrCtrl+S',
    handler: function handler(event) {
      event.preventDefault(); // saveChanges()
    }
  }, {
    shortcut: 'CmdOrCtrl+V',
    handler: function handler() {
      var now = Date.now();

      if (now > localStateRef.current.lastPaste + delay) {
        localStateRef.current.lastPaste = now;
        handlePaste();
      }
    }
  }]);
  return null;
};

var StyledHeader$3 = /*#__PURE__*/styled('header', {
  backgroundColor: '$darkGrey',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  alignItems: 'center',
  height: '$headerHeight',
  padding: '0 $2'
});
var StyledHeaderSide = /*#__PURE__*/styled('div', {
  width: '300px',
  'h3': {
    fontSize: '$2',
    letterSpacing: '1px'
  }
});
var StyledHeaderMiddle = /*#__PURE__*/styled('div', {
  display: 'flex',
  justifyContent: 'center'
});
var StyledHeaderOptions$1 = /*#__PURE__*/styled(StyledHeaderSide, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  '> *:not(:last-child)': {
    marginRight: '$1'
  }
});

var Header = function Header() {
  var isEditMode = useIsEditMode();
  return React__default.createElement(StyledHeader$3, null, React__default.createElement(StyledHeaderSide, null, React__default.createElement("h3", null, "RGG")), React__default.createElement(StyledHeaderMiddle, null, React__default.createElement(StyledPlainButton, {
    shape: "thinner",
    onClick: function onClick() {
      setEditMode(!isEditMode);
    }
  }, isEditMode ? "Play" : "Edit")), React__default.createElement(StyledHeaderOptions$1, null, React__default.createElement(StyledPlainButton, {
    shape: "thinner",
    appearance: "faint",
    onClick: function onClick() {
      console.log(getMainStateStoreState());
      console.log(useComponentsStore.getState());
    }
  }, "Debug"), React__default.createElement(StyledPlainButton, {
    shape: "thinner",
    appearance: "faint"
  }, "Discard"), React__default.createElement(StyledPlainButton, {
    shape: "round",
    appearance: "faint",
    onClick: undoState
  }, React__default.createElement(fa.FaUndo, {
    size: 9
  })), React__default.createElement(StyledPlainButton, {
    shape: "round",
    appearance: "faint",
    disabled: true,
    onClick: redoState
  }, React__default.createElement(fa.FaRedo, {
    size: 9
  })), React__default.createElement(StyledPlainButton, {
    shape: "thinner"
  }, "Save")));
};

var StyledDefaultContainer = /*#__PURE__*/styled('div', {
  color: '$lightPurple',
  fontFamily: '$main',
  fontSize: '$2'
});
var StyledContainer$a = /*#__PURE__*/styled(StyledDefaultContainer, {
  backgroundColor: '$darkGrey',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'grid',
  gridTemplateRows: 'auto minmax(0, 1fr)'
});
var StyledMain = /*#__PURE__*/styled('div', {
  display: 'grid',
  gridTemplateColumns: 'auto minmax(0, 1fr) auto'
});
var StyledSidebar = /*#__PURE__*/styled('div', {
  width: '$sidebar',
  backgroundColor: '$darkGreyLighter',
  position: 'relative',
  maxHeight: '100%'
});
var StyledContent = /*#__PURE__*/styled('div', {
  position: 'relative'
});
var StyledBoxButton = /*#__PURE__*/styled(StyledButton, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '26px',
  height: '26px',
  cursor: 'pointer',
  variants: {
    appearance: {
      active: {
        backgroundColor: '$purple',
        color: '$white'
      }
    }
  }
});

var OverlayControls = function OverlayControls() {
  var transformMode = useTransformMode();
  return React__default.createElement(StyledBox$1, {
    css: {
      position: 'absolute',
      top: '$1',
      right: '$1',
      zIndex: '$high',
      display: 'grid',
      gridTemplateColumns: 'auto auto auto',
      backgroundColor: '$darkGrey'
    }
  }, React__default.createElement(StyledBoxButton, {
    appearance: transformMode === EditorTransformMode.translate ? 'active' : '',
    onClick: function onClick() {
      setTransformMode(EditorTransformMode.translate);
    }
  }, React__default.createElement(bi.BiMove, {
    size: 16
  })), React__default.createElement(StyledBoxButton, {
    appearance: transformMode === EditorTransformMode.rotate ? 'active' : '',
    onClick: function onClick() {
      setTransformMode(EditorTransformMode.rotate);
    }
  }, React__default.createElement(bi.BiRotateLeft, {
    size: 16
  })), React__default.createElement(StyledBoxButton, {
    appearance: transformMode === EditorTransformMode.scale ? 'active' : '',
    onClick: function onClick() {
      setTransformMode(EditorTransformMode.scale);
    }
  }, React__default.createElement(bi.BiExpand, {
    size: 15
  })));
};

var Editor = function Editor(_ref) {
  var children = _ref.children;
  useHotkeysListener();
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(GoogleFontLoader, {
    fonts: [{
      font: 'Roboto',
      weights: [400, 500, 600, 700]
    }]
  }), React__default.createElement(GlobalHotkeysListener, null), React__default.createElement(StyledContainer$a, null, React__default.createElement(Header, null), React__default.createElement(StyledMain, null, React__default.createElement(StyledSidebar, null, React__default.createElement(ManagerSidebar, null), React__default.createElement(AddingComponentMenu, null)), React__default.createElement(StyledContent, null, children, React__default.createElement(OverlayControls, null)), React__default.createElement(StyledSidebar, {
    css: {
      width: '$sidebarPlus'
    }
  }, React__default.createElement(StateSidebar, null))), React__default.createElement(ContextMenu, null)));
};

var EditFloor = function EditFloor() {
  var isEditMode = useIsEditMode();
  return React__default.createElement(React__default.Fragment, null, React__default.createElement("gridHelper", {
    visible: isEditMode,
    position: [0, 0, -0.01],
    args: [1000, 1000, '#888', '#111'],
    rotation: [ 0, 0, 0],
    layers: [31]
  }));
};

var offsets = {
  x: 0,
  // y: 2,
  // z: 5,
  y: 25,
  z: 20
};

var EditCamera = function EditCamera() {
  var cameraRef = React.useRef(null);
  var orbitRef = React.useRef(null);
  var isEditMode = useIsEditMode();

  var _useThree = reactThreeFiber.useThree(),
      setDefaultCamera = _useThree.setDefaultCamera;

  React.useLayoutEffect(function () {
    if (isEditMode) {
      setDefaultCamera(cameraRef.current);
    }
  }, [isEditMode]);
  React.useEffect(function () {
    editorStateProxy.orbitRef = valtio.ref(orbitRef);
  }, []);
  React.useEffect(function () {
    if (!orbitRef.current) return;
    orbitRef.current.enabled = isEditMode;
  }, [isEditMode]);
  React.useLayoutEffect(function () {
    cameraRef.current.layers.enable(31);
    cameraRef.current.lookAt(0, 5, 0);
  }, []);
  var selectedRef = valtio.useProxy(editorStateProxy).selectedRef;
  var spacePressed = useCallbackRef(function () {
    if (selectedRef) {
      if (selectedRef) {
        cameraRef.current.position.set(selectedRef.current.position.x + offsets.x, selectedRef.current.position.y + offsets.y, selectedRef.current.position.z + offsets.z);
        orbitRef.current.target = new three.Vector3().copy(selectedRef.current.position);
      }
    }
  }, [selectedRef]);
  useHotkeys('*', function () {
    if (isSpacePressed()) {
      spacePressed.current();
    }
  });
  React.useEffect(function () {
    cameraRef.current.position.set(offsets.x, offsets.y, offsets.z);
  }, []);
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(drei.PerspectiveCamera, {
    ref: cameraRef
  }), React__default.createElement(drei.OrbitControls, {
    ref: orbitRef
  }));
};

var AddingComponentPlane = function AddingComponentPlane() {
  var planeRef = React.useRef(null);
  var floorRef = React.useRef(null);

  var _useThree = reactThreeFiber.useThree(),
      camera = _useThree.camera;

  var _useState = React.useState(true),
      horizontalMode = _useState[0],
      setHorizontalMode = _useState[1];

  var localStateRef = React.useRef({
    x: 0,
    z: 0,
    y: 0,
    disabled: false,
    pointerDown: false
  });
  var localState = localStateRef.current;
  React.useEffect(function () {
    var onMouseDown = function onMouseDown() {
      localState.pointerDown = true;
    };

    var onMouseUp = function onMouseUp() {
      localState.pointerDown = false;
      localState.disabled = false;
    };

    var onMouseMove = function onMouseMove() {
      if (localState.pointerDown) {
        localState.disabled = true;
      }
    };

    var onPointerDown = function onPointerDown() {
      onMouseDown();
    };

    var onPointerUp = function onPointerUp() {
      onMouseUp();
    };

    window.addEventListener('pointermove', onMouseMove);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    return function () {
      window.removeEventListener('pointermove', onMouseMove);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  var _useMemo = React.useMemo(function () {
    return {
      onVerticalPointerUp: function onVerticalPointerUp(event) {
        if (horizontalMode) return;
        if (localState.disabled) return;
        event.stopPropagation();
        var y = event.point.y;
        var x = localState.x,
            z = localState.z;
        addStoredComponent({
          x: x,
          y: y,
          z: z
        });
      },
      onFloorPointerUp: function onFloorPointerUp(event) {
        if (!horizontalMode) return;
        if (localState.disabled) return;
        event.stopPropagation();
        var _event$point = event.point,
            x = _event$point.x,
            z = _event$point.z;
        var y = localState.y;
        addStoredComponent({
          x: x,
          y: y,
          z: z
        });
      },
      onFloorPointerMove: function onFloorPointerMove(event) {
        if (!horizontalMode) return;
        if (localState.disabled) return;
        event.stopPropagation();
        var _event$point2 = event.point,
            x = _event$point2.x,
            z = _event$point2.z;
        localState.x = x;
        localState.z = z;
      },
      onVerticalMove: function onVerticalMove(event) {
        if (horizontalMode) return;
        if (localState.disabled) return;
        event.stopPropagation();
        var y = event.point.y;
        localState.y = y;
      }
    };
  }, [horizontalMode]),
      onFloorPointerMove = _useMemo.onFloorPointerMove,
      onVerticalPointerUp = _useMemo.onVerticalPointerUp,
      onVerticalMove = _useMemo.onVerticalMove,
      onFloorPointerUp = _useMemo.onFloorPointerUp;

  React.useEffect(function () {
    planeRef.current.position.x = localState.x;
    planeRef.current.position.z = localState.z;
    planeRef.current.position.y = localState.y;
    floorRef.current.position.x = Math.round(localState.x);
    floorRef.current.position.y = localState.y;
    floorRef.current.position.z = Math.round(localState.z);
  }, [horizontalMode]);
  var groupRef = React.useRef(null);
  reactThreeFiber.useFrame(function () {
    planeRef.current.rotation.y = Math.atan2(camera.position.x - planeRef.current.position.x, camera.position.z - planeRef.current.position.z);
    groupRef.current.position.y = localState.y;
    groupRef.current.position.x = localState.x;
    groupRef.current.position.z = localState.z;
  });
  React.useEffect(function () {
    var callback = function callback() {
      setHorizontalMode(!isShiftPressed());
    };

    document.addEventListener('keydown', callback);
    document.addEventListener('keyup', callback);
    return function () {
      document.removeEventListener('keydown', callback);
      document.removeEventListener('keyup', callback);
    };
  }, []);
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(drei.Plane, {
    args: [256, 256],
    onPointerMove: onFloorPointerMove,
    onPointerUp: onFloorPointerUp,
    rotation: [-Math.PI / 2, 0, 0],
    ref: floorRef
  }, React__default.createElement("meshBasicMaterial", {
    transparent: true,
    opacity: 0,
    side: three.DoubleSide
  }), React__default.createElement("gridHelper", {
    rotation: [-Math.PI / 2, 0, 0],
    visible: horizontalMode,
    position: [0, 0, 0],
    args: [1000, 1000, 'rgb(28,113,255, 0.05)', 'rgb(28,113,255, 0.05)'],
    layers: [31]
  })), React__default.createElement(drei.Plane, {
    args: [256, 256],
    onPointerMove: onVerticalMove,
    onPointerUp: onVerticalPointerUp,
    ref: planeRef
  }, React__default.createElement("meshBasicMaterial", {
    transparent: true,
    opacity: 0,
    side: three.DoubleSide
  }), React__default.createElement("gridHelper", {
    rotation: [-Math.PI / 2, 0, 0],
    visible: !horizontalMode,
    args: [1000, 1000, 'rgb(28,113,255, 0.05)', 'rgb(28,113,255, 0.05)'],
    layers: [31]
  })), React__default.createElement("group", {
    ref: groupRef
  }, React__default.createElement(drei.Sphere, null, React__default.createElement("meshBasicMaterial", {
    color: "green"
  }))));
};

var useComponentsAreSelected = function useComponentsAreSelected() {
  var selectedComponents = useSelectedComponents();
  return Object.keys(selectedComponents).length > 0;
};

var useEditCanvasProps = function useEditCanvasProps() {
  var componentsSelected = useComponentsAreSelected();
  var isEditMode = useIsEditMode();
  return React.useMemo(function () {
    return {
      onPointerMissed: function onPointerMissed() {
        if (!isEditMode) return;

        if (componentsSelected) {
          setSelectedComponents({});
        }
      }
    };
  }, [componentsSelected]);
};
var center = /*#__PURE__*/new three.Vector3();

var getCenterPoint = function getCenterPoint(obj) {
  var boundingBox = new three.Box3().setFromObject(obj);
  console.log('boundingBox', boundingBox);
  boundingBox.getCenter(center);
  console.log('center', center);
  return center;
};

var MultipleSelectedGroup = function MultipleSelectedGroup() {
  var groupRef = React.useRef(null);
  var selectedComponents = useSelectedComponents();
  var active = Object.keys(selectedComponents).length > 1;
  React.useEffect(function () {
    editorStateProxy.groupPortalRef = valtio.ref(groupRef);
    return function () {
      editorStateProxy.groupPortalRef = null;
    };
  }, []);
  useMeshHelper(groupRef, active);
  var dragMeshRef = React.useRef(new three.Object3D());
  var originRef = React.useRef(new three.Vector3());
  var positionDragRef = React.useCallback(function () {
    var centerPosition = getCenterPoint(groupRef.current);
    originRef.current = centerPosition;
    dragMeshRef.current.position.set(centerPosition.x, centerPosition.y, centerPosition.z);
  }, []);
  React.useEffect(function () {
    if (!active) return;
    groupRef.current.position.set(0, 0, 0);
    setTimeout(positionDragRef);
  }, [active, selectedComponents]);
  var isDraggingRef = React.useRef(false);
  var startingPositionRef = React.useRef(new three.Vector3());

  var _updateValue = useCallbackRef(function () {
    var xDifference = groupRef.current.position.x - startingPositionRef.current.x;
    var yDifference = groupRef.current.position.y - startingPositionRef.current.y;
    var zDifference = groupRef.current.position.z - startingPositionRef.current.z;
    Object.keys(selectedComponents).forEach(function (componentId) {
      setComponentPropValue(componentId, predefinedPropKeys.position, function (value) {
        if (!value) {
          // todo - get proper default?
          value = {
            x: 0,
            y: 0,
            z: 0
          };
        }

        return {
          x: value.x + xDifference,
          y: value.y + yDifference,
          z: value.z + zDifference
        };
      });
    });
    groupRef.current.position.set(0, 0, 0);
    positionDragRef();
  }, [selectedComponents]);

  useDraggableMesh('', active, {
    updateValue: function updateValue(updateType) {
      if (updateType === predefinedPropKeys.position) {
        _updateValue.current();
      } // todo - support scale and rotate

    },
    onChange: function onChange() {
      if (!isDraggingRef.current) return;
      groupRef.current.position.x = (originRef.current.x - dragMeshRef.current.position.x) * -1;
      groupRef.current.position.y = (originRef.current.y - dragMeshRef.current.position.y) * -1;
      groupRef.current.position.z = (originRef.current.z - dragMeshRef.current.position.z) * -1;
    },
    onDraggingChanged: function onDraggingChanged(event) {
      console.log('onDraggingChanged', event);
      startingPositionRef.current.copy(groupRef.current.position);
      isDraggingRef.current = event.value;
    },
    passedRef: dragMeshRef
  });
  return React__default.createElement(React__default.Fragment, null, React__default.createElement("group", {
    ref: groupRef
  }), React__default.createElement("group", {
    ref: dragMeshRef
  }));
};

var EditTools = function EditTools() {
  var addingComponent = useAddingComponent();
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(EditFloor, null), React__default.createElement(EditCamera, null), React__default.createElement(MultipleSelectedGroup, null), addingComponent && React__default.createElement(AddingComponentPlane, null));
};

var EditCanvas = function EditCanvas(_ref) {
  var children = _ref.children;
  var isEditMode = useIsEditMode();
  return React__default.createElement(React__default.Fragment, null, children, isEditMode && React__default.createElement(EditTools, null), React__default.createElement(TemporaryComponents, null));
};
console.warn("TODO!!! - 'apply' function is stale, when updating component prop value");

exports.EditCanvas = EditCanvas;
exports.Editable = Editable;
exports.Editor = Editor;
exports.InteractiveMesh = InteractiveMesh;
exports.predefinedPropKeys = predefinedPropKeys;
exports.registerAddable = registerAddable;
exports.useEditCanvasProps = useEditCanvasProps;
exports.useEditableProp = useEditableProp;
exports.useEditableSharedProp = useEditableSharedProp;
exports.useIsEditMode = useIsEditMode;
//# sourceMappingURL=rgg-editor.cjs.development.js.map
