export type ContextName = "root-context" | "app-context" | "page-context" | "workspace" | "workbench" | "manager" | "sidesheet" | "sidesheet-content" | "inspector";
export declare function useContext(contextName: ContextName): import("thorium-framework/modules/context").IStoreContext;
