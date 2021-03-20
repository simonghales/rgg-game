import React from "react";
import { Prop } from "../state/props";
export declare const usePropContext: () => {
    propType: string;
    propKey: string;
    componentId: string;
    componentTypeId: string;
};
export declare const Module: React.FC<{
    componentId: string;
    componentTypeId: string;
    value: any;
    propKey: string;
    propType: string;
    onChange?: (value: any) => void;
}>;
export declare const ComponentModules: React.FC<{
    componentId: string;
    componentTypeId: string;
    props: {
        [key: string]: Prop;
    };
}>;
