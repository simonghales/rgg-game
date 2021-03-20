import React from "react";
import { InputProps } from "./TextInput";
export declare const SelectInput: React.FC<InputProps & {
    options: {
        value: string;
        label?: string;
    }[];
}>;
