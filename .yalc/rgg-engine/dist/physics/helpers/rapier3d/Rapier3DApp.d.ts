import React from "react";
import { CustomBodyModifiers } from "./custom";
declare const Rapier3DApp: React.FC<{
    worker: Worker;
    stepRate?: number;
    maxNumberOfSyncedBodies?: number;
    customBodyModifiers?: CustomBodyModifiers;
}>;
export default Rapier3DApp;
