export declare class Warning {
<<<<<<< Updated upstream
=======
    context: import("thorium-store-context/dist/store-context").IStoreContext;
    valueStateManager: import("thorium-store-context/dist/store-context").IStoreState<string>;
    typeStateManager: import("thorium-store-context/dist/store-context").IStoreState<"warning" | "message" | "alert">;
    constructor();
    static get settings(): {
        message: string;
    };
>>>>>>> Stashed changes
    static get toolbox(): {
        title: string;
        icon: string;
    };
    render(): HTMLInputElement;
    save(blockContent: any): {
        url: any;
    };
}
