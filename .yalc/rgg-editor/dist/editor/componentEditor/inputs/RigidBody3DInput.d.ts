import React from "react";
import { InputProps } from "./TextInput";
export declare enum RigidBodyColliderShape {
    BALL = "BALL",
    CUBIOD = "CUBIOD"
}
export declare enum RigidBodyType {
    DYNAMIC = "DYNAMIC",
    STATIC = "STATIC",
    KINEMATIC = "KINEMATIC"
}
export declare type ColliderValue = {
    key: string;
    colliderType: RigidBodyColliderShape;
    hx?: number;
    hy?: number;
    hz?: number;
    radius?: number;
};
export declare type RigidBody3dPropValue = {
    enabled?: boolean;
    bodyType?: RigidBodyType;
    mass?: number;
    colliders?: ColliderValue[];
    customBodyDef?: {
        [key: string]: any;
    };
};
export declare const RigidBody3DInput: React.FC<InputProps>;
