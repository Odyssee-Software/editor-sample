import { _plugin } from '../_plugin';
import { CodeEditor } from './blocks/code-editor';
declare class _ExportHTMLPlugin {
    static get title(): string;
}
export declare class HTML extends _plugin {
    static get title(): string;
    static get type(): string;
    static get import(): never[];
    static get export(): (typeof _ExportHTMLPlugin)[];
    static get blocks(): {
        'code editor': typeof CodeEditor;
    };
    static id: `${string}-${string}-${string}-${string}-${string}`;
    get title(): string;
    get type(): string;
    get import(): never[];
    get export(): (typeof _ExportHTMLPlugin)[];
    get blocks(): {
        'code editor': typeof CodeEditor;
    };
    get id(): `${string}-${string}-${string}-${string}-${string}`;
    constructor();
}
export {};
