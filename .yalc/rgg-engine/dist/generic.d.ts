import React from "react";
export declare const SyncedComponent: React.FC<{
    [key: string]: any;
    type: string;
    id?: string;
}>;
export declare const useWorkerSendMessage: () => (message: any) => void;
export declare const useWorker: () => Worker;
export declare const WorkerMessaging: React.FC<{
    worker: Worker;
}>;
export declare const SyncComponents: React.FC<{
    components: {
        [key: string]: any;
    };
}>;
