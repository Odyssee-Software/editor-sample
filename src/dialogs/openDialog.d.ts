export declare function OpenDialog(props: {
    header?: any;
    content?: any;
    footer?: any;
}): {
    $dialog: import("web-dialog/web-dialog").WebDialog<any>;
    resolver: Promise<any>;
};
