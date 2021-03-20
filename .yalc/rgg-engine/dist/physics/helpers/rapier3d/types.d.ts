import { BodyStatus } from "@dimforge/rapier3d-compat/rapier";
export declare type ColliderDef = {
    type: 'Cubiod' | 'Ball';
    args: any[];
    density?: number;
};
export declare type AddBodyDef = {
    body: {
        type: BodyStatus;
        position?: [number, number, number] | number[];
        quaternion?: [number, number, number, number] | number[];
        mass?: number;
    };
    colliders: ColliderDef[];
    customBody?: string;
};
