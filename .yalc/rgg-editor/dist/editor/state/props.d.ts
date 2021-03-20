export declare enum PropOrigin {
    modified = "modified",
    initial = "initial",
    applied = "applied",
    default = "default"
}
export declare type Prop = {
    hidden: boolean;
    value: any;
    type: PropOrigin;
};
declare type PropsStore = {
    components: {
        [key: string]: {
            [key: string]: Prop;
        };
    };
};
export declare const usePropsStore: import("zustand").UseStore<PropsStore>;
export declare const setComponentProps: (id: string, updateFn: (state: any) => any) => void;
export declare const useComponentProps: (id: string) => {
    [key: string]: Prop;
};
export {};
