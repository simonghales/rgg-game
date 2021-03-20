import React, {useEffect, useState} from "react"
import {useOnFixedUpdate, usePlanckAppContext} from "rgg-engine";
import {World, Body, BodyDef, Circle, Vec2} from "planck-js";
import {getHorizontalInput, getVerticalInput} from "./inputs";
import {rotateVector} from "../utils/vectors";

const v2 = new Vec2()

const PlayerController: React.FC<{
    body: Body,
    speed: number,
}> = ({body, speed}) => {

    useOnFixedUpdate((delta) => {

        const horizontal = getHorizontalInput()
        const vertical = getVerticalInput()

        v2.x = horizontal
        v2.y = (vertical * -1)

        v2.normalize()

        rotateVector(v2, -45)

        v2.x = v2.x * speed * delta
        v2.y = v2.y * speed * delta

        v2.x = body.c_position.c.x + v2.x
        v2.y = body.c_position.c.y + v2.y


        body.setPosition(v2)
    })

    return null
}

export const PlayerBody: React.FC<{
    speed: number,
}> = ({speed}) => {

    const {
        world: worldApp,
        addBody,
    } = usePlanckAppContext()

    const world = worldApp as World

    const [body, setBody] = useState<Body | null>(null)

    useEffect(() => {
        const bodyDef: BodyDef = {
            type: "dynamic",
            linearDamping: 0,
            angularDamping: 0.1,
            allowSleep: false,
            fixedRotation: true,
        }
        const playerBody = world.createBody(bodyDef)

        const circleShape = Circle(0.5)

        playerBody.createFixture({
            shape: circleShape,
        })

        setBody(playerBody)

        return addBody('player', playerBody, true)
    }, [])

    return (
        <>
            {
                body && <PlayerController speed={speed} body={body}/>
            }
        </>
    )
}