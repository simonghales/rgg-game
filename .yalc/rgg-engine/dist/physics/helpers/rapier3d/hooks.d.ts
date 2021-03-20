import { Options } from "../planckjs/hooks";
import { MutableRefObject } from "react";
import { Object3D } from "three";
import { AddBodyDef } from "./types";
export declare const useRapier3DBody: (propsFn: () => AddBodyDef, options?: Partial<Options>) => [MutableRefObject<Object3D>, string];
