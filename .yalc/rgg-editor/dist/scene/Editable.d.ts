import React from "react";
interface Config {
    name?: string;
    _unsaved?: boolean;
    type?: string;
}
interface Props {
    id: string;
    _config?: Config;
    [key: string]: any;
}
interface ContextInterface {
    id: string;
    componentTypeId: string;
    isRoot: boolean;
    parentPath: string[];
    parentId: string;
    rootParentId: string;
    registerWithParent: (id: string) => () => void;
    isSelected: {
        selected: boolean;
        single?: boolean;
    };
    sharedProps: {
        [key: string]: any;
    };
    setSharedProp: (key: string, value: any) => void;
}
export declare const useEditableContext: () => ContextInterface;
export declare const useEditableSharedProp: (key: string) => any;
export declare const useIsEditableSelected: () => boolean;
export declare const useEditableIsSoleSelected: () => boolean;
export declare const useEditableId: () => string;
export declare const Editable: React.FC<Props>;
export {};
