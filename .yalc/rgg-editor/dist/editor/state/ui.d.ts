export declare const uiProxy: {
    displayAddingComponent: boolean;
    displayAddingComponentParent: string;
    addingComponent: string;
    addingComponentParent: string;
    componentContextMenu: {
        visible: boolean;
        components?: string[];
        position?: [number, number];
    };
    hoveredComponents: {
        [key: string]: true;
    };
};
export declare const useAddingComponent: () => string;
export declare const addComponent: (addableId: string, parent: string, position?: {
    x: number;
    y: number;
    z: number;
} | undefined) => void;
export declare const addStoredComponent: (position: {
    x: number;
    y: number;
    z: number;
}) => void;
export declare const setComponentHovered: (id: string) => () => void;
export declare const useIsComponentHovered: (id: string) => true;
export declare const displayComponentContextMenu: (components: string[], position: [number, number]) => void;
export declare const setDisplayAddingComponentParent: (id: string) => void;
export declare const setAddingComponent: (id: string) => void;
export declare const setDisplayAddingComponent: (adding: boolean, parent?: string) => void;
export declare let addingComponentClosed: number;
