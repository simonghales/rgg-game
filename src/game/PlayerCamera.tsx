import React, {MutableRefObject, useEffect, useLayoutEffect, useRef} from "react"
import {Group, Object3D, PerspectiveCamera, Vector3} from "three";
import {useFrame, useThree} from "react-three-fiber";
import {Editable, useEditableProp, useIsEditMode} from "rgg-editor";

export const cameraFollowTarget: {
    ref: null | MutableRefObject<Object3D>
} = {
    ref: null,
}

export const PlayerCamera: React.FC = () => {

    const isEditMode = useIsEditMode()
    const {setDefaultCamera} = useThree()

    const groupRef = useRef<Group>(null!)
    const cameraRef = useRef<PerspectiveCamera>(null!)
    const fov = useEditableProp('fov', {
        defaultValue: 30,
    })

    useLayoutEffect(() => {
        if (!isEditMode) {
            setDefaultCamera(cameraRef.current)
        }
    }, [isEditMode])

    useLayoutEffect(() => {
        cameraRef.current.fov = fov
        cameraRef.current.updateProjectionMatrix()
    }, [fov])

    useEffect(() => {
        cameraRef.current.lookAt(new Vector3(0, 1, 0))
    }, [isEditMode])

    useFrame(() => {
        if (cameraFollowTarget.ref) {
            groupRef.current.position.x = cameraFollowTarget.ref.current.position.x
            groupRef.current.position.z = cameraFollowTarget.ref.current.position.z
            groupRef.current.position.y = cameraFollowTarget.ref.current.position.y
        }
    })

    return (
        <group ref={groupRef}>
            <Editable id="camera">
                <perspectiveCamera ref={cameraRef}/>
            </Editable>
        </group>
    )
}