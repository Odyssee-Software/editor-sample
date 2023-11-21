import { storeContext } from 'thorium-framework/modules/context';

export type ContextName = 
  "root-context" | 
  "app-context" | 
  "page-context" |
  "workspace" |
  "workbench" |
  "manager" |
  "sidesheet" |
  "sidesheet-content" |
  "inspector"
;

export function useContext( contextName:ContextName ){

  let [result] = storeContext().getContextByName( contextName );
  return result;

}