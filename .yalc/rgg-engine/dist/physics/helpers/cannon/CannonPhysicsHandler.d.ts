import { World } from "cannon-es";
import React from "react";
declare const CannonPhysicsHandler: React.FC<{
    world: World;
    worker: Worker;
    stepRate: number;
    maxNumberOfSyncedBodies: number;
}>;
export default CannonPhysicsHandler;
