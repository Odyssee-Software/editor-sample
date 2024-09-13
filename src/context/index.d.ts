import { Page } from 'editor-page-types';
import EditorJS from '@editorjs/editorjs';
import { EditorPlugin } from '../plugins/_plugin';
export type ContextName = "root-context" | "app-context" | "page-context" | "workspace" | "workbench" | "manager" | "sidesheet" | "sidesheet-content" | "inspector";
interface ApplicationUser {
    username: string;
}
interface ApplicationConfiguration {
    version: number;
}
interface ApplicationPlugins {
    [pluginName: string]: EditorPlugin;
}
interface ApplicationConnectors {
    [connectorKey: string]: any;
}
export interface ApplicationContext {
    user: ApplicationUser;
    configuration: ApplicationConfiguration;
    plugins: ApplicationPlugins;
    connectors: ApplicationConnectors;
    pagePointer: (Page & {
        plugin: EditorPlugin;
    }) | null;
    /** La propriété `pickerPointer` dans l'interface `ApplicationContext` est déclarée comme type `any`.
    Cela signifie que `pickerPointer` peut contenir n'importe quel type de valeur, qu'il s'agisse
    d'une chaîne, d'un nombre, d'un objet, d'une fonction ou de tout autre type de données. Il s'agit
    d'un espace réservé pour une valeur qui peut être attribuée ultérieurement dans la logique de
    l'application. */
    pickerPointer: any;
    navigation: string[];
    editor: {
        configuration: {
            id: string;
            name: string;
            content: any[];
            type: string;
        };
        editor: EditorJS;
    } | null;
}
export declare function useApplication<T = ApplicationContext>(): import("thorium-framework/modules/context").TStoreContext<T>;
export interface GlobalInterface {
    pageEdition: boolean;
}
export {};
