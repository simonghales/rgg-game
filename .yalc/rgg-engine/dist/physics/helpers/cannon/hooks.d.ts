import { AddBodyDef as CannonAddBodyDef } from "./types";
import { MutableRefObject } from "react";
import { Object3D } from "three";
import { Options } from "../planckjs/hooks";
export declare const addToMessage: (props: CannonAddBodyDef, options: Partial<Options>) => {
    [key: string]: any;
};
export declare const useCannonBody: (propsFn: () => CannonAddBodyDef, options?: Partial<Options>) => [MutableRefObject<Object3D>, string];
