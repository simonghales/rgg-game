import { AddBodyDef } from "./types";
export declare type CustomBodyModifiers = {
    [key: string]: (body: any) => void;
};
export declare const customData: {
    customBodyModifiers: CustomBodyModifiers;
};
export declare const getCustomBodyModifier: (bodyDef: AddBodyDef) => ((body: any) => void) | undefined;
