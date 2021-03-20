import { MutableRefObject } from "react";
import { Object3D } from "three";
export declare const useIsCanvasInteractable: () => boolean;
export declare const useDraggableMesh: (id: string, isSelected: boolean, options?: {
    translationSnap?: number | undefined;
    passedRef?: MutableRefObject<Object3D> | undefined;
    updateValue?: ((key: string, value: any, startValue: any) => void) | undefined;
    onChange?: (() => void) | undefined;
    onDraggingChanged?: ((event: any) => void) | undefined;
}) => MutableRefObject<Object3D>[];
