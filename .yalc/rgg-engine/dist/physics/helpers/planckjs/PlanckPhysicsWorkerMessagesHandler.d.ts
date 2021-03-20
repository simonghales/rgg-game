import React from "react";
import { World } from "planck-js";
declare const PlanckPhysicsWorkerMessagesHandler: React.FC<{
    world: World;
    worker: Worker;
}>;
export default PlanckPhysicsWorkerMessagesHandler;
