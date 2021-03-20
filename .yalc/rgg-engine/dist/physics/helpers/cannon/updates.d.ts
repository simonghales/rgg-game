import { Body } from "cannon-es";
import { BodyData } from "../../types";
import { Object3D } from "three";
import { AddBodyDef } from "./types";
import { Buffers } from "../planckjs/types";
export declare const applyBufferData: (buffers: Buffers, syncedBodies: {
    [key: string]: Body;
}, syncedBodiesOrder: string[]) => void;
export declare const lerpBody: (body: BodyData, object: Object3D, stepRate: number) => void;
export declare const updateBodyData: (bodyData: BodyData, positions: Float32Array, angles: Float32Array) => void;
export declare const prepareObject: (object: Object3D, props: AddBodyDef) => void;
