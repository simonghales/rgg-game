/// <reference types="react" />
export declare type State = {
    world: any;
    addSyncedBody: (uid: string, body: any) => void;
    removeSyncedBody: (uid: string) => void;
    addBody: (id: string, body: any, synced?: boolean) => () => void;
    bodies: {
        [key: string]: any;
    };
};
export declare const Context: import("react").Context<State>;
export declare const usePlanckAppContext: () => State;
