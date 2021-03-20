import { BodyDef, World } from "planck-js";
import { Fixtures } from "./types";
export declare const createBody: (world: World, bodyDef: BodyDef, fixtures: Fixtures) => import("planck-js").Body;
