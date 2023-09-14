import { DOM , useState , CustomElement } from 'thorium-framework';

import { window } from '@neutralinojs/lib'
import style from './style.module.css';

import * as Tools from './tools';

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';

import * as Database from '../../modules/database';

export const [editorState,setEditorState] = useState<EditorJS | null>(null);

/**
 * Le code ci-dessus est un composant Thorium TypeScript appelé "HelloWorld" qui rend un éditeur en utilisant la
 * bibliothèque EditorJS et enregistre le contenu dans une base de données lorsqu'il est modifié.
 * @returns Le code renvoie un élément JSX qui représente un conteneur div avec un composant d'éditeur à l'intérieur.
 * Le composant d'éditeur est créé à l'aide de la bibliothèque EditorJS et comporte divers outils configurés,
 * tels que des en-têtes, une console, des avertissements et des erreurs. Le composant d'éditeur dispose également
 * de gestionnaires d'événements pour les événements onReady et onChange.
*/
export const HelloWorld = () => {

  let initEditorJs = async (target:CustomElement<HTMLElement,{}>) => {

    let pageHomeConfig = {
      id : '69efe424-277c-4450-8ad1-401bb0509506',
      name : 'Home'
    };

    let [ pageHome ] = (await Database.find<[Record<string,any>]>({ id : pageHomeConfig.id })).detail;
    if(!pageHome){
      await Database.insert( pageHomeConfig );
    }

    const editor = new EditorJS({
      holder: target,
      autofocus: true,
      tools: {
        'h1' : {
          class : Header,
          config: {
            placeholder: 'Enter a header',
            levels: [1, 2, 3, 4],
            defaultLevel: 3
          }
        },
        console : Tools.Console,
        warning : Tools.Warning,
        error : Tools.Alert,
        codeEditor : Tools.CodeEditor
      },
      onReady: () => {

        setEditorState(editor);

      },
      onChange: async (api, event:CustomEvent | CustomEvent[]) => {

        let insertResult = await Database.update( {
          search : { name : pageHomeConfig.name },
          insert : {
            id : pageHomeConfig.id,
            name : pageHomeConfig.name,
            content : await editor.save()
          }
        } )

        let treatEvent = (event : CustomEvent) => {

          if('target' in event.detail){
            let { name } = event.detail.target;
            if( name == 'codeEditor' )event.preventDefault();
          }

        }

        if(Array.isArray(event))for(const singleEvent of event){ treatEvent(singleEvent) }
        else treatEvent(event);

      }
    });

  }

  return <div class = {style.EditorContainer}>
    <div
      id = "editorjs"
      class = {style.Editor}
      allowEnter="false"
      _afterMounting = {initEditorJs}
    />
  </div>;
  
}