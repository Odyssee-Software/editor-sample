import { _plugin } from '../_plugin';
import { Header1 } from './blocks/header1';
import { Header2 } from './blocks/header2';
import { Header3 } from './blocks/header3';
import { Console } from './blocks/console';
import { Warning } from './blocks/warning';
import { Alert } from './blocks/alert';
declare class _ExportPDFPlugin {
    static get title(): string;
}
declare class _ImportMDPlugin {
    static get title(): string;
    constructor();
    static main(): void;
}
export declare class Note extends _plugin {
    static get title(): string;
    static get type(): string;
    static get import(): (typeof _ImportMDPlugin)[];
    static get export(): (typeof _ExportPDFPlugin)[];
    static get blocks(): {
        h1: typeof Header1;
        h2: typeof Header2;
        h3: typeof Header3;
        alert: typeof Alert;
        warning: typeof Warning;
        console: typeof Console;
    };
    static id: `${string}-${string}-${string}-${string}-${string}`;
    get title(): string;
    get type(): string;
    get import(): (typeof _ImportMDPlugin)[];
    get export(): (typeof _ExportPDFPlugin)[];
    get blocks(): {
        h1: typeof Header1;
        h2: typeof Header2;
        h3: typeof Header3;
        alert: typeof Alert;
        warning: typeof Warning;
        console: typeof Console;
    };
    get id(): `${string}-${string}-${string}-${string}-${string}`;
    constructor();
}
export {};
