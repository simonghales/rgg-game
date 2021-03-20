import React from "react";
import { World } from "cannon-es";
declare const CannonPhysicsWorkerMessagesHandler: React.FC<{
    world: World;
    worker: Worker;
}>;
export default CannonPhysicsWorkerMessagesHandler;
