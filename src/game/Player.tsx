import { Cylinder } from "@react-three/drei"
import React, {useLayoutEffect} from "react"
import {useEditableProp, useEditableSharedProp, useIsEditMode} from "rgg-editor";
import {SyncedComponent, useSyncBody} from "rgg-engine";
import {cameraFollowTarget} from "./PlayerCamera";

const PlayerPhysics: React.FC<{
    speed: number,
}> = ({speed}) => {

    const meshRef = useEditableSharedProp('meshRef')

    useSyncBody('player', meshRef)

    useLayoutEffect(() => {
        if (!meshRef) return
        cameraFollowTarget.ref = meshRef
    }, [meshRef])

    return (
        <SyncedComponent id='player' type="player" speed={speed}/>
    )
}

const PlayerMesh: React.FC = () => {
    return (
        <group>
            <Cylinder position={[0, 1, 0]} args={[0.5, 0.5, 2]}/>
        </group>
    )
}

export const Player: React.FC = () => {

    const isEditMode = useIsEditMode()
    const speed: number = useEditableProp('speed', {
        defaultValue: 1,
    })

    return (
        <>
            <PlayerMesh/>
            {
                !isEditMode && (
                    <PlayerPhysics speed={speed}/>
                )
            }
        </>
    )
}