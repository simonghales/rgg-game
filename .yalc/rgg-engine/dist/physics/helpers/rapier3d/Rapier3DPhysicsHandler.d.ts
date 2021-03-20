import React from "react";
import { World } from "@dimforge/rapier3d-compat/rapier.js";
declare const Rapier3DPhysicsHandler: React.FC<{
    world: World;
    worker: Worker;
    stepRate: number;
    maxNumberOfSyncedBodies: number;
}>;
export default Rapier3DPhysicsHandler;
