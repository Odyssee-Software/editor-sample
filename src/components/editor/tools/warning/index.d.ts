export declare class Warning {
    static get toolbox(): {
        title: string;
        icon: string;
    };
    render(): HTMLInputElement;
    save(blockContent: any): {
        url: any;
    };
}
