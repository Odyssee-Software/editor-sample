import { CustomElement, useState } from 'thorium-framework';
import { pageContext, storeContext , listContext } from 'thorium-framework/modules/context';
import { uuid } from 'thorium-framework/modules/huid';
import { State } from 'thorium-framework/modules/states';
import styles from './style.module.css';
import { useContext } from '@context/index';

// import { afterMounting } from './editor-afterMounting';
import EditorJS, { ToolConfig , ToolConstructable , ToolSettings , BlockToolConstructable , BlockToolConstructorOptions , BlockTool, BlockAPI } from '@editorjs/editorjs';
import { API as EditorJsAPI } from '@editorjs/editorjs/types';
import { ExternalToolSettings } from '@editorjs/editorjs/types/tools';
import Header from '@editorjs/header';
import { os , filesystem as fs } from '@neutralinojs/lib';

import { Inspector , IInspectorElement } from './inspector';

import * as Tools from '../editor/tools';
import notifier from 'codex-notifier';

import * as Database from '@modules/database';

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
    id:string;
    name:string;
    content:any[],
    type?:any;
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

  let blockId = uuid.encode( uuid.componentId );

  return class CustomEditorBlock extends binder{

    static get toolbox(){ return binder['toolbox'] }
    static get enableLineBreaks(){ return binder['enableLineBreaks'] }
    static get settings(){ return binder['settings'] }

    blockContext = useContext( 'workbench' ).extends( `custom-block-${blockId}` );
    elementState = this.blockContext.set<CustomElement<HTMLElement,any> | null>( blockId , null);
    get state(){ return this.elementState; }
    setElement( element:CustomElement<HTMLElement,any> ){
      this.elementState.setter( element );
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

      let onmousedown = ( event:MouseEvent ) => {
        console.log({ selection : 'block selected' , inspector : this.inspector , config : this.config , element : this.element , block : this });

          if( this.inspector )this.inspector.show();
          if(this["renderSettings"])this.inspector.render( this["renderSettings"]( { config : this.config , settings : CustomEditorBlock.settings} ) );
          if(this["onSelect"])this["onSelect"]( event );
      }

      let initBlock = () => {
        if(this.element)this.element.onmousedown = onmousedown;
      }

      initBlock();

      let { state , setter:setElement } = this.state;

      state.subscribe( this.parentElement , ( element:CustomElement<HTMLElement,any> ) => {

        element.onmousedown = onmousedown;

      })

    }

  } as unknown as ToolConstructable;

}

export class _Workbench{

  element;
  get container(){ return this.element.parentElement as CustomElement<HTMLDivElement , {}> }
  editorManager;
  get editor(){ return this.editorManager[0].value }
  set editor( value ){ this.editorManager[1]( value ) }
  get states(){
    return {
      editor : this.editorManager[0]
    }
  }

  constructor( props:{ ref , editorManager } ){

    this.element = props.ref;
    this.editorManager = props.editorManager;

  }

  static afterMounting( plugins ){

    return ( target ) => {

      const [workbench] = storeContext().getContextByName( 'workbench' );
      const { state:Editor , setter:setEditor , subscribe } = workbench.set< IEditor >( 'manager' , null as any );

      Editor.subscribe( target , async ( value ) => {

        let processes = await os.getSpawnedProcesses();
        for await(const process of processes){
          await os.updateSpawnedProcess( process.id , 'exit' );
          console.warn(`kill process (${process.id})pid:${process.pid}`);
        }
  
        let watchers = await fs.getWatchers();
        for await(const watcher of watchers){
          await fs.removeWatcher(watcher.id);
          console.warn(`kill watcher (${watcher.id})path:${watcher.path}`);
        }

        return value as any;
  
      })
  
      const editor_instance = new EditorJS({
        holder: target,
        autofocus: true,
        tools : plugins,
        onReady: () => {

          setEditor({
            configuration : {
              id:'',
              name:'',
              content:[],
              type : 'note'
            },
            editor : editor_instance
          })
  
          // manager.workspace.workbench.editor = {
          //   configuration : {
          //     pageId:'',
          //     pageName:'',
          //     content:[]
          //   },
          //   editor
          // };
  
        },
        onChange: async (api, event:CustomEvent | CustomEvent[]) => {
  
          let { configuration , editor } = Editor;
  
          if(!configuration.id){
  
            notifier.show({
              message: "Vous n'avez aucune page sélectionnée",
              style : 'error',
              time: 1000
            });
  
          }else{
  
            let save = await editor.save();
            
            let { name:pageName } = configuration;
            let { blocks } = save;
            let titleBlock = api.blocks.getBlockByIndex(0) as BlockAPI;

            // Si le block n'est pas un titre
            if(titleBlock.name != 'h1'){

              notifier.show({
                message: "La page doit avoir un titre.",
                style : 'error',
                time: 1000
              });

              api.blocks.convert( titleBlock.id as string , 'h1' , { text : 'Title' , level : 1 } );

              return ;
              
            }
  
            let { text:titleText } = blocks[0].data;
  
            if(titleText != pageName){

              setEditor({
                configuration : {
                  ...configuration,
                  ...{ 
                    name : titleText,
                    type : 'note'
                  }
                },
                editor,
              });

            }
  
            let insertResult = await Database.update( {
              search : { id : configuration.id },
              insert : {
                id : configuration.id,
                name : titleText,
                content : save,
                type : 'note'
              }
            })
  
            console.log({insertResult , insert : {
              id : configuration.id,
              name : configuration.name,
              content : save
            }})
  
          }
  
        }
      });
      
      return workbench;

    }

  }

}

export interface WorkbenchProps{

  // manager:any;
  plugins:Record<string,(ToolConstructable|ToolSettings)>;

}

export const Workbench = ( props:WorkbenchProps ) => {

  const [workspace] = storeContext().getContextByName( 'workspace' );
  const context = workspace.extends( 'workbench' );

  let { plugins } = props;

  return <div class = {styles.EditorContainer}>
    <div
      id = "editorjs"
      class = {styles.Editor}
      allowEnter="false"
      _afterMounting = { _Workbench.afterMounting( plugins ) }
    />
    {/* <Inspector/> */}
  </div>;

}