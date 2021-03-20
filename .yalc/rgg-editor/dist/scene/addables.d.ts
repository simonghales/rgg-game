export interface Addable {
    id: string;
    name: string;
    props: {
        [key: string]: any;
    };
    component: any;
    sharedType: boolean;
}
export declare const useAddableStore: import("zustand").UseStore<{
    addables: {
        [key: string]: Addable;
    };
}>;
export declare const useAddable: (id: string) => Addable;
export declare const getAddable: (id: string) => Addable;
export declare const registerAddable: (id: string, component: any, { name, sharedType, props, }: {
    name: string;
    sharedType?: boolean | undefined;
    props?: {
        [key: string]: any;
    } | undefined;
}) => void;
