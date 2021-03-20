import { Buffers } from "../planckjs/types";
import { RigidBody } from "@dimforge/rapier3d-compat/rapier.js";
import { Object3D } from "three";
import { AddBodyDef } from "./types";
export declare const applyBufferData: (buffers: Buffers, syncedBodies: {
    [key: string]: RigidBody;
}, syncedBodiesOrder: string[]) => void;
export declare const prepareObject: (object: Object3D, props: AddBodyDef) => void;
