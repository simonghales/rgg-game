import React from "react";
import { Object3D } from "three";
declare type State = {
    prepareObject: (object: Object3D, props: any) => void;
};
export declare const usePhysicsConsumerHelpers: () => State;
declare const PhysicsConsumerHelpers: React.FC<{
    prepareObject: (object: Object3D, props: any) => void;
}>;
export default PhysicsConsumerHelpers;
