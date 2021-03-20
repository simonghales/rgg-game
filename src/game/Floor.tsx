import { Plane } from "@react-three/drei"
import React from "react"

export const Floor: React.FC = () => {
    return (
        <>
            <Plane args={[128, 128]} rotation={[-Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#3030FF" />
            </Plane>
            <gridHelper args={[128, 128]} position={[0, 0.001, 0]} />
        </>
    )
}