import { Shortcuts } from 'shortcuts';
import { ShortcutDescriptor } from "shortcuts/src/types";
export declare const registerShortcut: (shortcuts: ShortcutDescriptor | ShortcutDescriptor[], manager?: Shortcuts | undefined) => () => void;
export declare const useShortcut: (shortcuts: ShortcutDescriptor | ShortcutDescriptor[], manager?: Shortcuts | undefined) => void;
