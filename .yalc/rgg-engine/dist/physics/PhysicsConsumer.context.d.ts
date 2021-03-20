import { MutableRefObject } from "react";
import { Object3D } from "three";
declare type State = {
    syncBody: (id: string, ref: MutableRefObject<Object3D>, applyRotation?: boolean) => () => void;
    syncMeshes: () => void;
    sendMessage: (message: any) => void;
};
export declare const Context: import("react").Context<State>;
export declare const usePhysicsConsumerContext: () => State;
export {};
