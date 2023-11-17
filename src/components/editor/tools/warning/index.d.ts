import { IStoreState } from 'thorium-framework/modules/context';
export declare class Warning {
    context: import("thorium-store-context/dist/store-context").IStoreContext;
    valueStateManager: IStoreState<string>;
    typeStateManager: IStoreState<"warning" | "message" | "alert">;
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
