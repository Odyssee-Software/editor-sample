import { DOM , CustomElement } from 'thorium-framework';
import style from './style.module.css';

import { minimalSetup, EditorView , basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { createTheme } from '@uiw/codemirror-themes';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { tags as t } from '@lezer/highlight';

import { Button , Controls } from '../../../button';

const myTheme = createTheme({
  theme: 'light',
  settings: {
    background: '#ffffff',
    foreground: '#75baff',
    caret: '#5d00ff',
    selection: '#036dd626',
    selectionMatch: '#036dd626',
    lineHighlight: '#8a91991a',
    gutterBackground: '#fff',
    gutterForeground: '#8a919966',
  },
  styles: [
    { tag: t.comment, color: '#787b8099' },
    { tag: t.variableName, color: '#0080ff' },
    { tag: [t.string, t.special(t.brace)], color: '#5c6166' },
    { tag: t.number, color: '#5c6166' },
    { tag: t.bool, color: '#5c6166' },
    { tag: t.null, color: '#5c6166' },
    { tag: t.keyword, color: '#5c6166' },
    { tag: t.operator, color: '#5c6166' },
    { tag: t.className, color: '#5c6166' },
    { tag: t.definition(t.typeName), color: '#5c6166' },
    { tag: t.typeName, color: '#5c6166' },
    { tag: t.angleBracket, color: '#5c6166' },
    { tag: t.tagName, color: '#5c6166' },
    { tag: t.attributeName, color: '#5c6166' },
  ],
});

export class CodeEditor {

  static get toolbox() {
    return {
      title: 'CodeEditor',
      // icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
      icon: '👩🏼‍💻'
    };
  }

  static get enableLineBreaks() {
    return true;
  }

  render(){

    return DOM.render( <div 
      class = { style.CodeEditorContainer } >
        <div class = { style.CodeEditorMenu } >
          <Controls buttons = {[
            <Button textContent='code' />,
            <Button textContent='style' />,
            <Button textContent='view' />
          ]}/>
        </div>
        <div
          class = {style.CodeEditor}
          _afterMounting = {(target:CustomElement<HTMLDivElement,{lol():string}>) => {
            
            let editor = new EditorView({
              doc: 'Hello World',
              extensions: [
                // theme
                vscodeDark,
                // setup
                basicSetup,
                // language
                javascript({ jsx: true , typescript : true })
              ],
              parent: target,
            });

          }}
        />
      </div> 
    );
  }

  save(blockContent){
    return {
      url: blockContent.value
    }
  }
}