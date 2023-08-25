import { DOM } from 'thorium-framework';

import { window } from '@neutralinojs/lib'
import style from './style.module.css';

import * as Tools from './tools';

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';

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
      _afterMounting = {(target) => {

        new EditorJS({
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
            warning : Tools.Warning,
            error : Tools.Alert
          }
        })

      }}
    />
  </div>;
}