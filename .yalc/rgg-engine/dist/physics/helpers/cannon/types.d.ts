import { BodyOptions } from "objects/Body";
export declare type AddBodyDef = {
    body: Partial<BodyOptions>;
    shapes: {
        type: 'Sphere' | 'Box';
        args?: any[];
    }[];
    userData?: {
        [key: string]: any;
    };
};
