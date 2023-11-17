export declare class Warning {
    context: any;
    valueStateManager: any;
    typeStateManager: any;
    constructor();
    static get settings(): {
        message: string;
    };
    static get toolbox(): {
        title: string;
        icon: string;
    };
    render(): any;
    renderSettings(props: any): any;
    save(blockContent: any): {
        url: any;
    };
}
