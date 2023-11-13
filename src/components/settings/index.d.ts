<<<<<<< HEAD
import { State } from 'thorium-framework';
interface ISettings {
}
export type SettingsStateMutator = [State<ISettings>, (value: ISettings) => ISettings];
export interface SettingsButtonProps {
    settingsStateMutator: SettingsStateMutator;
    action?(event: MouseEvent): void;
}
export declare const SettingsButton: (props: SettingsButtonProps) => any;
export declare const Settings: () => any;
export {};
=======
export declare const Settings: () => any;
>>>>>>> merge13112023
