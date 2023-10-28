import { CustomElement, useState , State } from 'thorium-framework';
import styles from './style.module.css';

import { afterMounting } from './editor-afterMounting';
import EditorJS, { ToolConfig , ToolConstructable , ToolSettings , BlockToolConstructable , BlockToolConstructorOptions , BlockTool } from '@editorjs/editorjs';
import { API as EditorJsAPI } from '@editorjs/editorjs/types';
import { ExternalToolSettings } from '@editorjs/editorjs/types/tools';
import Header from '@editorjs/header';

import { Inspector , IInspectorElement } from './inspector';
import { _Editor } from '@components/workspace';

export {
  ToolConfig,
  ToolConstructable,
  ToolSettings,
  BlockToolConstructable,
  BlockToolConstructorOptions,
  ExternalToolSettings
}

export type TEditorStateManager = [State<IEditor | null>, (value: IEditor | null) => IEditor | null];

export interface IEditor{
  configuration : {
    pageId:string;
    pageName:string;
    content:any[]
  },
  editor:EditorJS
}

export interface INoteEditorBlock<T>{
  config:T|null;
  toolbox:{
    title:string;
    icon:string;
  }
  enableLineBreaks:boolean;
  settings:any[];
  render():CustomElement<any,any>;
  save():Record<string,any>;
}

export interface IConfiguredNoteEditorBlock extends ExternalToolSettings{}

export type NoteEditorBlockConf = ToolConfig;

export const configureNoteEditorBlock = ( binder:ToolConstructable , config:NoteEditorBlockConf ):IConfiguredNoteEditorBlock => {
  
  return {
    class : createNoteEditorBlock( binder ),
    config : config as ToolConfig
  };

}

export function createNoteEditorBlock( binder:ToolConstructable ):ToolConstructable{

  return class CustomEditorBlock extends binder{

    static get toolbox(){ return binder['toolbox'] }
    static get enableLineBreaks(){ return binder['enableLineBreaks'] }
    static get settings(){ return binder['settings'] }

    #_elementState = useState<CustomElement<HTMLElement,any> | null>(null);
    get state(){ return this.#_elementState[0]; }
    setElement( element:CustomElement<HTMLElement,any> ){
      this.#_elementState[1]( element );
      return this.state.value;
    };

    get parentElement(){ return document.querySelectorAll(`div.${styles.EditorContainer}`)[0] as CustomElement<HTMLDivElement , {}> }

    get element():CustomElement<HTMLElement,any>{ return this['_element'] };
    get inspector(){ return document.querySelectorAll(`div.${styles.Inspector}[context=inspector]`)[0] as IInspectorElement }
    api:BlockToolConstructorOptions['api'] | null = null;
    bloc:BlockToolConstructorOptions['block'];
    config:BlockToolConstructorOptions['config']|null = null;
    data:BlockToolConstructorOptions['data'];

    constructor( config:BlockToolConstructorOptions ){
      
      super( config );

      Object.assign( this , config );

      let initBlock = () => {
        if(this.element)this.element.onmousedown = (event:MouseEvent) => {
          console.log({ selection : 'block selected' , inspector : this.inspector , config : this.config , element : this.element });
          this.inspector.innerHTML = JSON.stringify( this.config );
          if(this["onSelect"])this["onSelect"]( event );
        }
      }

      initBlock();

      this.state.subscribe( this.parentElement , ( element:CustomElement<HTMLElement,any> ) => {

        element.onmousedown = (event:MouseEvent) => {
          console.log({ selection : 'block selected' , inspector : this.inspector , config : this.config , element : this.element });
          if( this.inspector )this.inspector.show();
          if(this["renderSettings"])this.inspector.render( this["renderSettings"]( { config : this.config , settings : CustomEditorBlock.settings} ) );
          if(this["onSelect"])this["onSelect"]( event );
        }

      })

    }

  } as unknown as ToolConstructable;

}

export interface NoteEditorProps{

  noteEditorManager:[ State<_Editor> , (_NoteEditor) => _Editor ]
  plugins:Record<string,(ToolConstructable|ToolSettings)>;

}

export const NoteEditor = ( props:NoteEditorProps ) => {

  let { noteEditorManager , plugins } = props;
  const editorStateManager:TEditorStateManager = useState<IEditor | null>(null);

  return <div class = {styles.EditorContainer}>
    <div
      id = "editorjs"
      class = {styles.Editor}
      allowEnter="false"
      _afterMounting = { afterMounting( editorStateManager , props ) }
    />
    <Inspector/>
  </div>;

}