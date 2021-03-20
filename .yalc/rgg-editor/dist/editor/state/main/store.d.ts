import { MainStateStore } from "./types";
export declare const initialStoreState: MainStateStore;
export declare let revertState: MainStateStore;
export declare const useMainStateStore: import("zustand").UseStore<MainStateStore>;
declare const setMainStateStoreState: import("zustand").SetState<MainStateStore>, getMainStateStoreState: import("zustand").GetState<MainStateStore>;
export { setMainStateStoreState, getMainStateStoreState, };
