import React, { Suspense } from "react"
import {PlanckPhysicsConsumer} from "rgg-engine"
import {Canvas} from "react-three-fiber"
import {EditCanvas, useEditCanvasProps} from "rgg-editor";

//@ts-ignore
import PhysicsWorker from '../physics.worker';
import {STEP_RATE} from "../config";

//@ts-ignore
const worker = new PhysicsWorker()

export const Engine: React.FC = ({children}) => {
    const editCanvasProps = useEditCanvasProps()
    return (
        <Canvas {...editCanvasProps}>
            <PlanckPhysicsConsumer worker={worker} stepRate={STEP_RATE}>
                <Suspense fallback={null}>
                    <EditCanvas>
                        {children}
                    </EditCanvas>
                </Suspense>
            </PlanckPhysicsConsumer>
        </Canvas>
    )
}