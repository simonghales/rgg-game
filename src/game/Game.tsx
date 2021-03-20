import React from "react"
import {Editable, Editor } from "rgg-editor"
import {Engine} from "../components/Engine";
import {Player} from "./Player";
import { PlayerCamera } from "./PlayerCamera";
import "./Assets"
import styled from "styled-components";

const GameContents: React.FC = () => {

    return (
        <>
            <ambientLight intensity={1} />
            {/*<Editable id="floor">*/}
            {/*    <Floor/>*/}
            {/*</Editable>*/}
            <Editable id="camera">
                <PlayerCamera/>
            </Editable>
            <Editable id="player">
                <Player/>
            </Editable>
        </>
    )
}

const StyledWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
`

export const Game: React.FC = () => {
    return (
        <StyledWrapper>
            <Engine>
                <GameContents/>
            </Engine>
        </StyledWrapper>
    )
}

export const GameWithEditor: React.FC = () => {
    return (
        <Editor>
            <Game/>
        </Editor>
    )
}