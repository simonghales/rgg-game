import { MutableRefObject } from "react";
import { Object3D } from "three";
export declare type OnWorldStepFn = (delta: number) => void;
export declare enum WorkerMessageType {
    PHYSICS_UPDATE = 0,
    PHYSICS_PROCESSED = 1,
    PHYSICS_READY = 2,
    PHYSICS_SET_PAUSED = 3,
    PHYSICS_ACKNOWLEDGED = 4,
    ADD_BODY = 5,
    REMOVE_BODY = 6,
    MODIFY_BODY = 7,
    CUSTOM = 8
}
export declare type WorkerMessageData = {
    type: WorkerMessageType;
    data?: any;
    [key: string]: any;
};
export declare type BodyData = {
    ref: MutableRefObject<Object3D>;
    index: number;
    position?: [number, number] | [number, number, number];
    angle?: number | [number, number, number, number];
    previous: {
        position?: [number, number] | [number, number, number];
        angle?: number | [number, number, number, number];
    };
    lastUpdate: number;
    lastRender: number;
    applyRotation?: boolean;
};
