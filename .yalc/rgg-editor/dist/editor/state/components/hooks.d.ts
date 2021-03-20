import { AnyProps, ComponentState } from "./types";
export declare const useComponent: (id: string) => ComponentState | undefined;
export declare const useComponentInitialProps: (id: string) => AnyProps;
export declare const useComponentCanHaveChildren: (id: string) => boolean;
