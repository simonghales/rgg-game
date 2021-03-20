import { AddBodyDef } from "./types";
import { MutableRefObject } from "react";
import { Object3D } from "three";
export declare const useOnFixedUpdate: (callback: (delta: number) => void) => void;
export declare const useBodyApi: (id: string) => (method: string, args: any[]) => void;
export declare type Options = {
    id?: string;
    synced?: boolean;
    listenForCollisions?: boolean;
    ref?: MutableRefObject<Object3D>;
};
export declare const useSyncBody: (id: string, ref: MutableRefObject<Object3D> | undefined, options?: {
    applyRotation?: boolean | undefined;
} | undefined) => void;
export declare const useBody: (propsFn: () => any, options?: Partial<Options>, addToMessage?: ((props: any, options: Partial<Options>) => any) | undefined) => [MutableRefObject<Object3D>, string];
export declare const usePlanckBody: (propsFn: () => AddBodyDef, options?: Partial<Options>) => [MutableRefObject<Object3D>, string];
