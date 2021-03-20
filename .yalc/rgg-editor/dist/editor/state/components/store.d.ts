import { AnyProps, ComponentState } from "./types";
export declare type ComponentsStore = {
    components: {
        [key: string]: ComponentState;
    };
    deactivatedComponents: {
        [key: string]: ComponentState;
    };
    componentsThatCanHaveChildren: {
        [key: string]: boolean;
    };
};
export declare const useComponentsStore: import("zustand").UseStore<ComponentsStore>;
export declare const setComponentInitialProps: (uid: string, initialProps: AnyProps) => void;
export declare const setComponentCanHaveChildren: (id: string) => () => void;
export declare const setComponentChildren: (uid: string, children: string[]) => void;
export declare const addComponent: (uid: string, name: string, children: string[], isRoot: boolean, unsaved: boolean, initialProps: AnyProps | undefined, componentId: string, parentId: string, rootParentId: string) => void;
export declare const removeComponent: (uid: string) => void;
export declare const addDeactivatedComponent: (uid: string, name: string, children: string[], isRoot: boolean, unsaved: boolean, parentId: string, rootParentId: string) => void;
export declare const removeDeactivatedComponent: (uid: string) => void;
