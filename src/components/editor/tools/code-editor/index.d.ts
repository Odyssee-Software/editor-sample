export declare class CodeEditor {
    static get toolbox(): {
        title: string;
        icon: string;
    };
    static get enableLineBreaks(): boolean;
    render(): unknown;
    save(blockContent: any): {
        url: any;
    };
}
