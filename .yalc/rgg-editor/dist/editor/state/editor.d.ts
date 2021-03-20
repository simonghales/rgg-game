import { OrthographicCamera, PerspectiveCamera } from "three";
export declare enum EditorTransformMode {
    translate = "translate",
    rotate = "rotate",
    scale = "scale"
}
export declare const editorStateProxy: {
    editMode: boolean;
    transformMode: EditorTransformMode;
    groupPortalRef: any;
    orbitRef: any;
    selectedRef: any;
    cameraCanvasRef: any;
    mainCamera: null | PerspectiveCamera | OrthographicCamera;
    transformActive: boolean;
    addComponentKey: string;
    movingComponents: string[];
    addComponentPosition: {
        x: number;
        y: number;
        z: number;
    };
};
export declare const useIsEditMode: () => boolean;
export declare const setEditMode: (editMode: boolean) => void;
export declare const useGroupPortalRef: () => any;
export declare const useTransformMode: () => EditorTransformMode;
export declare const setTransformMode: (mode: EditorTransformMode) => void;
export declare enum PendingPasteType {
    COMPONENTS = "COMPONENTS"
}
export declare type PendingPaste = {
    type: PendingPasteType;
    data: any;
};
export declare const clipboardProxy: {
    pendingPaste: PendingPaste | null;
};
export declare const addToClipboard: (pendingPaste: PendingPaste) => void;
export declare const clearClipboard: () => void;
