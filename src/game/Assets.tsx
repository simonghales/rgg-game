import { useGLTF } from "@react-three/drei"
import React, {Suspense, useMemo, useState} from "react"
import {SkeletonUtils} from "three/examples/jsm/utils/SkeletonUtils";
import {registerAddable, useEditableProp} from "rgg-editor";

type Props = {
    gltfPath: string,
}

export const AssetInner: React.FC<Props> = ({gltfPath}) => {

    const gltf = useGLTF(gltfPath)

    const [cloned]: any = useState(() => {
        const clonedScene = SkeletonUtils.clone(gltf.scene)
        clonedScene.traverse(object => {
            object.castShadow = true
            object.receiveShadow = true
        })
        return clonedScene
    })

    return (
        <primitive object={cloned} dispose={null} />
    )
}

export const Asset: React.FC<Props> = (props) => {
    return (
        <Suspense fallback={null}>
            <AssetInner {...props}/>
        </Suspense>
    )
}

export const FloorTile: React.FC = () => {

    const tileType = useEditableProp('tileType', {
        defaultValue: ''
    })

    const path = useMemo(() => {
        switch (tileType) {
            case '2':
                return '/models/FloorTile_Basic2.glb'
            case 'innerCorner':
                return '/models/FloorTile_InnerCorner.glb'
            case 'corner':
                return '/models/FloorTile_Corner.glb'
            case 'side':
                return '/models/FloorTile_Side.glb'
            default:
                return '/models/FloorTile_Basic.glb'
        }
    }, [tileType])

    return (
        <Asset gltfPath={path} key={path}/>
    )
}

export const DoubleFloorTile: React.FC = () => {
    return (
        <Asset gltfPath={'/models/FloorTile_Double_Hallway.glb'}/>
    )
}

registerAddable('floorTile', FloorTile, {
    name: 'Floor Tile',
})

registerAddable('doubleFloorTile', DoubleFloorTile, {
    name: 'Double Floor Tile',
})