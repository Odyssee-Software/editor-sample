import { IEditor , TEditorStateManager , WorkbenchProps } from './index';
import { CustomElement } from 'thorium-framework';
import { State } from 'thorium-framework/modules/states';
import { os , filesystem as fs } from '@neutralinojs/lib';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';

import * as Tools from '../editor/tools';
import notifier from 'codex-notifier';

// import * as Database from '@modules/database';
import { storeContext } from 'thorium-framework/modules/context';

// export const afterMounting = ( props:WorkbenchProps ) => {

//   const [workbench] = storeContext().getContextByName( 'workbench' );
  
//   return ( target:CustomElement<HTMLElement , {}> ) => {

//     const { state:Editor , setter:setEditor } = workbench.get<IEditor>('manager');

//     /* The `state.subscribe()` function is used to subscribe to changes in the state of the
//     application. In this case, it is subscribing to changes in the `state` object. */
//     Editor.subscribe( target , async ( value ) => {

//       let processes = await os.getSpawnedProcesses();
//       for await(const process of processes){
//         await os.updateSpawnedProcess( process.id , 'exit' );
//         console.warn(`kill process (${process.id})pid:${process.pid}`);
//       }

//       let watchers = await fs.getWatchers();
//       for await(const watcher of watchers){
//         await fs.removeWatcher(watcher.id);
//         console.warn(`kill watcher (${watcher.id})path:${watcher.path}`);
//       }

//       return value;

//     })

//     const editor_instance = new EditorJS({
//       holder: target,
//       autofocus: true,
//       // tools: {
//       //   'h1' : {
//       //     class : Header,
//       //     config: {
//       //       placeholder: 'Enter a header',
//       //       levels: [1, 2, 3, 4],
//       //       defaultLevel: 3
//       //     }
//       //   },
//       //   console : Tools.Console,
//       //   warning : Tools.Warning,
//       //   error : Tools.Alert,
//       //   codeEditor : Tools.CodeEditor
//       // },
//       tools : props.plugins,
//       // onReady: () => {

//       //   // setEditor({
//       //   //   configuration : {
//       //   //     type : 'note',
//       //   //     pageId:'',
//       //   //     pageName:'',
//       //   //     content:[]
//       //   //   },
//       //   //   editor : editor_instance
//       //   // });

//       // },
//       // onChange: async (api, event:CustomEvent | CustomEvent[]) => {

//       //   let { configuration , editor } = Editor as IEditor;

//       //   console.log({configuration});

//       //   if(!configuration.pageId){

//       //     notifier.show({
//       //       message: "Vous n'avez aucune page sélectionnée",
//       //       style : 'error',
//       //       time: 1000
//       //     });

//       //   }else{

//       //     let save = await editor.save();
          
//       //     let { pageName } = configuration;
//       //     let { blocks } = save;
//       //     let [titleBlock] = blocks;

//       //     let { text:titleText } = titleBlock.data;

//       //     // if(titleText != pageName){
//       //     //   setEditor({
//       //     //     configuration : {
//       //     //       ...configuration,
//       //     //       ...{ 
//       //     //         pageName : titleText,
//       //     //         type : 'note'
//       //     //       }
//       //     //     },
//       //     //     editor,
//       //     //   });
//       //     // }

//       //     // let insertResult = await Database.update( {
//       //     //   search : { id : configuration.pageId },
//       //     //   insert : {
//       //     //     id : configuration.pageId,
//       //     //     name : titleText,
//       //     //     type : 'note',
//       //     //     content : save
//       //     //   }
//       //     // })

//       //     // console.log({insertResult , insert : {
//       //     //   id : configuration.pageId,
//       //     //   name : configuration.pageName,
//       //     //   type : 'note',
//       //     //   content : save
//       //     // }})

//       //   }

//       // }
//     });

//   }

// }