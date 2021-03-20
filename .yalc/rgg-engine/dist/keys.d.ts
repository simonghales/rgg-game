export declare const useTransferKeyEvents: (worker: Worker) => void;
export declare const useActiveKeys: import("zustand").UseStore<{
    activeKeys: {
        [key: number]: boolean;
    };
}>;
export declare const rawActiveKeys: {
    [key: number]: boolean;
};
export declare const useHandleKeyEvents: (worker: Worker) => void;
