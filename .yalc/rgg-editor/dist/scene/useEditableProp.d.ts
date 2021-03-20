interface Config {
    id?: string;
    defaultValue?: any;
    hidden?: boolean;
    sync?: boolean;
}
export declare const useEditableProp: (key: string, config?: Config) => any;
export {};
