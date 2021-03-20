import React from "react";
import { VIEWS } from "./ManagerSidebar";
export declare const useIsItemSelected: (id: string) => boolean;
export declare enum SceneItemIcon {
    group = "group",
    groupClosed = "groupClosed",
    component = "component"
}
export declare const ROOT_ID = "__root";
export declare const ItemIcon: React.FC<{
    iconType: SceneItemIcon;
}>;
export declare const StyledButton: import("@stitches/react").IStyledComponent<"button", {}, {
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
export declare const StyledClickable: import("@stitches/react").IStyledComponent<"button", {}, {
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
export declare const StyledIcon: any;
export declare const SceneList: React.FC<{
    view: VIEWS;
}>;
