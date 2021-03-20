import { World, RigidBody } from "@dimforge/rapier3d-compat/rapier.js";
import { AddBodyDef } from "./types";
export declare const removeBody: (world: World, body: RigidBody) => void;
export declare const createBody: (world: World, bodyDef: AddBodyDef) => RigidBody;
