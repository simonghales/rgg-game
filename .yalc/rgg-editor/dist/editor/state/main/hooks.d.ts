export declare const useSelectedComponents: () => {
    [key: string]: boolean;
};
export declare const useSoleSelectedComponent: () => string;
export declare const useComponentState: (id: string) => import("./types").StoredComponentState;
export declare const useComponentModifiedState: (id: string) => import("./types").StateData;
export declare const useSharedComponent: (id: string) => {
    appliedState?: import("./types").StateData | undefined;
};
export declare const useUnsavedComponents: () => {
    [key: string]: import("../components/types").ComponentState;
};
export declare const useUnsavedComponent: (id: string) => import("../components/types").ComponentState;
export declare const useIsDeactivated: (id: string) => boolean;
export declare const useComponentName: (id: string) => string;
