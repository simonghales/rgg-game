import React from "react"
import {PlanckApp, SyncComponents} from "rgg-engine";
import {STEP_RATE} from "../config";
import {PlayerBody} from "../game/PlayerBody";

const syncedComponents = {
    player: PlayerBody,
}

const Game: React.FC = () => {
    return (
        <>
            <SyncComponents components={syncedComponents}/>
        </>
    )
}

export const WorkerApp: React.FC<{
    worker: Worker
}> = ({worker}) => {
    return (
        <PlanckApp worker={worker} stepRate={STEP_RATE}>
            <Game/>
        </PlanckApp>
    )
}