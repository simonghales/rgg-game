/// <reference types="react" />
declare type State = {
    getPendingSyncedBodiesIteration: () => number;
    syncedBodies: {
        [key: string]: any;
    };
    syncedBodiesOrder: string[];
    maxNumberOfSyncedBodies: number;
};
export declare const Context: import("react").Context<State>;
export declare const usePlanckPhysicsHandlerContext: () => State;
export {};
