// import { DOM , useState , CustomElement } from 'thorium-framework';
// import notifier from 'codex-notifier';
// import {ConfirmNotifierOptions, NotifierOptions, PromptNotifierOptions} from 'codex-notifier';

// import { window } from '@neutralinojs/lib'
// import style from './style.module.css';

// import * as Tools from './tools';

// import EditorJS from '@editorjs/editorjs';
// import Header from '@editorjs/header';

// import * as Database from '@modules/database';

// import { os , filesystem as fs } from '@neutralinojs/lib'

// export type EditorState = {
//   configuration : {
//     pageId:string;
//     pageName:string;
//     content:any[]
//   },
//   editor:EditorJS
// }

// /**
//  * Le code ci-dessus est un composant Thorium TypeScript appelé "HelloWorld" qui rend un éditeur en utilisant la
//  * bibliothèque EditorJS et enregistre le contenu dans une base de données lorsqu'il est modifié.
//  * @returns Le code renvoie un élément JSX qui représente un conteneur div avec un composant d'éditeur à l'intérieur.
//  * Le composant d'éditeur est créé à l'aide de la bibliothèque EditorJS et comporte divers outils configurés,
//  * tels que des en-têtes, une console, des avertissements et des erreurs. Le composant d'éditeur dispose également
//  * de gestionnaires d'événements pour les événements onReady et onChange.
// */
// export const HelloWorld = () => {

//   let initEditorJs = async (target:CustomElement<HTMLElement,{}>) => {

//     // Quand la configuration de l'éditeur change
//     // Tout les process en parallèle s'éteigne
//     // editorState.subscribe( target , async () => {

//     //   let processes = await os.getSpawnedProcesses();
//     //   for await(const process of processes){
//     //     await os.updateSpawnedProcess( process.id , 'exit' );
//     //     console.warn(`kill process (${process.id})pid:${process.pid}`);
//     //   }

//     //   let watchers = await fs.getWatchers();
//     //   for await(const watcher of watchers){
//     //     await fs.removeWatcher(watcher.id);
//     //     console.warn(`kill watcher (${watcher.id})path:${watcher.path}`);
//     //   }

//     // })

//     const editor = new EditorJS({
//       holder: target,
//       autofocus: true,
//       tools: {
//         'h1' : {
//           class : Header,
//           config: {
//             placeholder: 'Enter a header',
//             levels: [1, 2, 3, 4],
//             defaultLevel: 3
//           }
//         },
//         console : Tools.Console,
//         warning : Tools.Warning,
//         error : Tools.Alert,
//         codeEditor : Tools.CodeEditor
//       },
//       onReady: () => {

//         // setEditorState({
//         //   configuration : {
//         //     pageId:'',
//         //     pageName:'',
//         //     content:[]
//         //   },
//         //   editor
//         // });

//       },
//       // onChange: async (api, event:CustomEvent | CustomEvent[]) => {

//       //   let { configuration , editor } = editorState.value as EditorState;

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

//       //     console.log( {titleBlock} , {titleText} , {pageName} );

//       //     if(titleText != pageName){
//       //       setEditorState({
//       //         configuration : {
//       //           ...configuration,
//       //           ...{ pageName : titleText }
//       //         },
//       //         editor,
//       //       })
//       //     }

//       //     let insertResult = await Database.update( {
//       //       search : { id : configuration.pageId },
//       //       insert : {
//       //         id : configuration.pageId,
//       //         name : titleText,
//       //         content : save
//       //       }
//       //     })

//       //     console.log({insertResult , insert : {
//       //       id : configuration.pageId,
//       //       name : configuration.pageName,
//       //       content : save
//       //     }})

//       //   }

//       // }
//     });

//   }

//   return <div class = {style.EditorContainer}>
//     <div
//       id = "editorjs"
//       class = {style.Editor}
//       allowEnter="false"
//       _afterMounting = {initEditorJs}
//     />
//   </div>;
  
// }