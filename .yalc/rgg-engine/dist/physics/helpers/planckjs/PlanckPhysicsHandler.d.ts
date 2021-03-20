import React from "react";
import { World } from "planck-js";
export declare const usePhysicsBodies: (removeBody: any) => {
    addSyncedBody: (uid: string, body: any) => () => void;
    removeSyncedBody: (uid: string) => void;
    getPendingSyncedBodiesIteration: () => number;
    syncedBodiesOrder: string[];
    syncedBodies: {
        [key: string]: any;
    };
    addBody: (uid: string, body: any, synced?: boolean) => () => void;
    bodies: {
        [key: string]: any;
    };
};
export declare const usePhysicsUpdate: () => {
    onUpdate: () => void;
    subscribeToPhysicsUpdates: (callback: () => void) => () => void;
};
export declare const usePhysics: (removeBody?: any) => {
    subscribeToPhysicsUpdates: (callback: () => void) => () => void;
    getPendingSyncedBodiesIteration: () => number;
    syncedBodies: {
        [key: string]: any;
    };
    syncedBodiesOrder: string[];
    addSyncedBody: (uid: string, body: any) => () => void;
    removeSyncedBody: (uid: string) => void;
    addBody: (uid: string, body: any, synced?: boolean) => () => void;
    bodies: {
        [key: string]: any;
    };
    onUpdate: () => void;
};
declare const PlanckPhysicsHandler: React.FC<{
    world: World;
    worker: Worker;
    stepRate: number;
    maxNumberOfSyncedBodies: number;
}>;
export default PlanckPhysicsHandler;
