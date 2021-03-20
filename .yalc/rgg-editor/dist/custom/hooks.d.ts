/// <reference types="react" />
declare type Options = {
    scope?: string;
    element?: HTMLElement | null;
    keyup?: boolean | null;
    keydown?: boolean | null;
    splitKey?: string;
};
export declare const useHotkeys: (event: string, callback: any, options?: Options | undefined) => void;
export declare const useCallbackRef: (cb: () => any, dependencies: any[]) => import("react").MutableRefObject<() => any>;
export {};
