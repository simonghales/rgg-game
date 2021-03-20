import { MainStateStore } from "../main/types";
export declare type HistoryStore = {
    pastSnapshots: MainStateStore[];
    futureSnapshots: MainStateStore[];
};
