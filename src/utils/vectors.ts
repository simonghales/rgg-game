import {Vec2} from "planck-js";
import {MathUtils} from "three";

export const rotateVector = (v2: Vec2, degrees: number) => {
    const sin = Math.sin(MathUtils.degToRad(degrees));
    const cos = Math.cos(MathUtils.degToRad(degrees));
    const tx = v2.x;
    const ty = v2.y;
    v2.x = (cos * tx) - (sin * ty);
    v2.y = (sin * tx) + (cos * ty);
    return v2;
}