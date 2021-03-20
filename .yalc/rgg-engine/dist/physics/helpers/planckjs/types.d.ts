import { BodyDef, FixtureOpt } from "planck-js";
export declare type Buffers = {
    positions: Float32Array;
    angles: Float32Array;
};
export declare enum FixtureShape {
    Circle = "Circle",
    Box = "Box"
}
export declare type Fixtures = {
    shape: FixtureShape;
    args: any[];
    fixtureOptions: Partial<FixtureOpt>;
}[];
export declare type AddBodyDef = {
    body: BodyDef;
    fixtures: Fixtures;
};
