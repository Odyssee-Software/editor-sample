export declare class Warning {
    context: import("thorium-framework/modules/context").IStoreContext;
    valueStateManager: import("thorium-framework/modules/context").IStoreState<string>;
    typeStateManager: import("thorium-framework/modules/context").IStoreState<"warning" | "message" | "alert">;
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
