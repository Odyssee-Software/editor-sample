import { DOM , useState } from 'thorium-framework';

import { window } from '@neutralinojs/lib'
import style from './style.module.css';

import * as Tools from './tools';

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';

import * as Database from '../../modules/database';

export const [editorState,setEditorState] = useState<EditorJS | null>(null);

export const HelloWorld = () => {

  let openDocs = async () => {

    window.create( 'https://neutralino.js.org/' , { 
      title: "Neutralino Documentation",
      x : 400,
      y : 400
    });

  }

  return <div class = {style.EditorContainer}>
    <div
      id = "editorjs"
      class = {style.Editor}
      _afterMounting = {async (target) => {

        let pageHomeConfig = {
          id : '69efe424-277c-4450-8ad1-401bb0509506',
          name : 'Home'
        };

        let [ pageHome ] = (await Database.find<[Record<string,any>]>({ id : pageHomeConfig.id })).detail;
        if(!pageHome){
          await Database.insert( pageHomeConfig );
        }

        let editor = new EditorJS({
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
            error : Tools.Alert
          },
          onReady: () => {
            setEditorState(editor);
          },
          onChange: async (api, event) => {
            console.log('Now I know that Editor\'s content changed!', event);
            console.log(api);

            let insertResult = await Database.update( {
              search : { name : pageHomeConfig.name },
              insert : {
                id : pageHomeConfig.id,
                name : pageHomeConfig.name,
                content : await editor.save()
              }
            } )

            console.log(insertResult);

          }
        });

      }}
    />
  </div>;
  
}