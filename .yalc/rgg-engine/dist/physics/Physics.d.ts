import React from "react";
import { OnWorldStepFn } from "./types";
declare const Physics: React.FC<{
    onWorldStep: OnWorldStepFn;
    stepRate?: number;
}>;
export default Physics;
