export declare class Warning {
    valueStateManager: [import("thorium-states").State<string>, (value: string) => string];
    typeStateManager: [import("thorium-states").State<"warning" | "message" | "alert">, (value: "warning" | "message" | "alert") => "warning" | "message" | "alert"];
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
