import React from "react";
import { OnWorldStepFn } from "./types";
declare const PhysicsProvider: React.FC<{
    onWorldStep: OnWorldStepFn;
    stepRate: number;
}>;
export default PhysicsProvider;
