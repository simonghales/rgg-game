import React from "react";
import { ApplyBufferDataFn } from "./updates";
import { Buffers } from "./types";
declare const WorkerSubscription: React.FC<{
    worker: Worker;
    subscribe: (callback: () => void) => () => void;
    applyBufferData: ApplyBufferDataFn;
    generateBuffers: (maxNumberOfSyncedBodies: number) => Buffers;
    setPaused?: (paused: boolean) => void;
}>;
export default WorkerSubscription;
