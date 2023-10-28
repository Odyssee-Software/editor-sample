import { IEditor , TEditorStateManager , NoteEditorProps } from './index';
import { State , CustomElement } from 'thorium-framework';
import { os , filesystem as fs } from '@neutralinojs/lib';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';

import * as Tools from '../editor/tools';
import notifier from 'codex-notifier';

import * as Database from '@modules/database';

export const afterMounting = ( stateManager:TEditorStateManager , props:NoteEditorProps ) => {

  let [state,setEditorState] = stateManager;
  
  return ( target:CustomElement<HTMLElement , {}> ) => {

    /* The `state.subscribe()` function is used to subscribe to changes in the state of the
    application. In this case, it is subscribing to changes in the `state` object. */
    state.subscribe( target , async () => {

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

    })

    const editor = new EditorJS({
      holder: target,
      autofocus: true,
      // tools: {
      //   'h1' : {
      //     class : Header,
      //     config: {
      //       placeholder: 'Enter a header',
      //       levels: [1, 2, 3, 4],
      //       defaultLevel: 3
      //     }
      //   },
      //   console : Tools.Console,
      //   warning : Tools.Warning,
      //   error : Tools.Alert,
      //   codeEditor : Tools.CodeEditor
      // },
      tools : props.plugins,
      onReady: () => {

        setEditorState({
          configuration : {
            pageId:'',
            pageName:'',
            content:[]
          },
          editor
        });

      },
      onChange: async (api, event:CustomEvent | CustomEvent[]) => {

        let { configuration , editor } = state.value as IEditor;

        console.log({configuration});

        if(!configuration.pageId){

          notifier.show({
            message: "Vous n'avez aucune page sélectionnée",
            style : 'error',
            time: 1000
          });

        }else{

          let save = await editor.save();
          
          let { pageName } = configuration;
          let { blocks } = save;
          let [titleBlock] = blocks;

          let { text:titleText } = titleBlock.data;

          console.log( {titleBlock} , {titleText} , {pageName} );

          if(titleText != pageName){
            setEditorState({
              configuration : {
                ...configuration,
                ...{ pageName : titleText }
              },
              editor,
            })
          }

          let insertResult = await Database.update( {
            search : { id : configuration.pageId },
            insert : {
              id : configuration.pageId,
              name : titleText,
              content : save
            }
          })

          console.log({insertResult , insert : {
            id : configuration.pageId,
            name : configuration.pageName,
            content : save
          }})

        }

      }
    });

  }

}