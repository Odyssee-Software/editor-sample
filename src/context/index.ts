import { rootContext , appContext , storeContext , TStoreUUID , useContext } from 'thorium-framework/modules/context';

import { Note } from '../plugins/note';
import { HTML } from '../plugins/html';
import { GPT } from '../plugins/gpt';
import { Page } from 'editor-page-types';
import EditorJS , { ToolConstructable, ToolSettings } from '@editorjs/editorjs';
import { EditorPlugin } from '../plugins/_plugin';

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

interface ApplicationUser{
  username:string;
}

interface ApplicationConfiguration{
  version:number;
}

interface ApplicationPlugins{
  [pluginName:string] : EditorPlugin;
}

interface ApplicationConnectors{
  [connectorKey:string] : any;
}

export interface ApplicationContext{
  user : ApplicationUser;
  configuration : ApplicationConfiguration;
  plugins : ApplicationPlugins;
  connectors : ApplicationConnectors;
  pagePointer : (Page & { plugin : EditorPlugin }) | null;
  /** La propriété `pickerPointer` dans l'interface `ApplicationContext` est déclarée comme type `any`.
  Cela signifie que `pickerPointer` peut contenir n'importe quel type de valeur, qu'il s'agisse
  d'une chaîne, d'un nombre, d'un objet, d'une fonction ou de tout autre type de données. Il s'agit
  d'un espace réservé pour une valeur qui peut être attribuée ultérieurement dans la logique de
  l'application. */
  pickerPointer : any;
  navigation: string[];
  editor:{
    configuration : {
      id:string;
      name:string;
      content:any[],
      type : string
    },
    editor : EditorJS
  } | null;
}

export function useApplication<T = ApplicationContext>(){
  return useContext<T>( appContext.value );
}

let app = useApplication<ApplicationContext>();

app.user = { 
  username : "Guillaume" 
};

app.configuration = { 
  version : 1,
};

app.plugins = {
  note : Note,
  html : HTML,
  gpt : GPT
};

app.connectors = {};

app.pagePointer = null;

app.pickerPointer = null;

app.navigation = [ "home" ];

app.editor = null;

export interface GlobalInterface{
  pageEdition:boolean;
}

console.log({ app })