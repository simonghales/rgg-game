import React from "react";
export interface InputProps {
    inputId: string;
    value: any;
    onChange: (value: any) => void;
}
export declare const StyledInput: import("@stitches/react").IStyledComponent<"input", {}, {
    tokens: {
        colors: {
            $darkGrey: string;
            $darkGreyLighter: string;
            $white: string;
            $lightPurple: string;
            $faint: string;
            $purple: string;
            $faintPurple: string;
            $midPurple: string;
            $darkPurple: string;
            $pink: string;
        };
        sizes: {
            $sidebar: string;
            $sidebarPlus: string;
            $headerHeight: string;
        };
        space: {
            $0b: string;
            $1: string;
            $1b: string;
            $2: string;
            $2b: string;
            $3: string;
        };
        fonts: {
            $main: string;
        };
        fontSizes: {
            $1: string;
            $1b: string;
            $2: string;
            $3: string;
            $4: string;
        };
        fontWeights: {
            $regular: string;
            $semi: string;
            $medium: string;
            $bold: string;
        };
        radii: {
            $1: string;
            $2: string;
        };
        zIndices: {
            $high: string;
            $max: string;
        };
    };
}>;
export declare const TextInput: React.FC<InputProps>;
