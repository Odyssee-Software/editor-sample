export declare class Warning {
    context: import("thorium-store-context/dist/store-context").IStoreContext;
    valueStateManager: void | import("thorium-store-context/dist/store-context").IStoreState<string>;
    typeStateManager: void | import("thorium-store-context/dist/store-context").IStoreState<"warning" | "message" | "alert">;
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
