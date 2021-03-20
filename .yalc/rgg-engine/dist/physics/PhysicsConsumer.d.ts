import React, { MutableRefObject } from "react";
import { BodyData } from "./types";
import { Object3D } from "three";
export declare type DefaultPhysicsConsumerProps = {
    worker: Worker;
    stepRate?: number;
    paused?: boolean;
};
export declare const useFixedUpdateContext: () => {
    onFixedUpdateSubscriptions: React.MutableRefObject<{
        [key: string]: React.MutableRefObject<(delta: number) => void>;
    }>;
    subscribeToOnPhysicsUpdate: (callback: React.MutableRefObject<(delta: number) => void>) => () => void;
    updateSubscriptions: (delta: number) => void;
};
export declare const OnFixedUpdateProvider: React.FC;
declare type Props = DefaultPhysicsConsumerProps & {
    lerpBody: (body: BodyData, object: Object3D, stepRate: number) => void;
    updateBodyData: (bodyData: BodyData, positions: Float32Array, angles: Float32Array) => void;
};
declare const Wrapper: React.FC<Props>;
export default Wrapper;
