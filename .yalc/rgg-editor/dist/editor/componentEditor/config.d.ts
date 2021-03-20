interface PredefinedProp {
    key: string;
    label: string;
    input?: any;
    defaultValue?: any;
}
export declare const childrenProp: PredefinedProp;
export declare const modulesProp: PredefinedProp;
export declare const rigidBody3dModuleProp: PredefinedProp;
export declare const positionProp: PredefinedProp;
export declare const rotationProp: PredefinedProp;
export declare const scaleProp: PredefinedProp;
export declare const predefinedProps: {
    [x: string]: PredefinedProp;
};
export declare const predefinedBottomProps: {
    [x: string]: PredefinedProp;
};
export declare const predefinedPropKeys: {
    position: string;
    rotation: string;
    scale: string;
    rigidBody3d: string;
    modules: string;
    children: string;
};
export {};
