import {rawActiveKeys} from "rgg-engine";

export const KEYS = {
    up: [87, 38],
    right: [68, 39],
    down: [83, 40],
    left: [65, 37],
}

export const isKeyPressed = (codes: number[]) => {
    let pressed = false
    codes.forEach(code => {
        if (rawActiveKeys[code]) {
            pressed = true
        }
    })
    return pressed
}

export const getVerticalInput = () => {
    if (isKeyPressed(KEYS.up)) {
        return 1
    } else if (isKeyPressed(KEYS.down)) {
        return -1
    }
    return 0
}

export const getHorizontalInput = () => {
    if (isKeyPressed(KEYS.right)) {
        return 1
    } else if (isKeyPressed(KEYS.left)) {
        return -1
    }
    return 0
}