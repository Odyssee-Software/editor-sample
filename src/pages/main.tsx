import { PageRouter , Page , PageLink , useState } from "thorium-framework";
import { Workspace } from '@components/workspace';

import { configureNoteEditorBlock } from "@components/workbench";
import Header from '@editorjs/header';
import * as tools from '../components/editor/tools';
import { Input2 } from '@thorium-components/input2';

const Home = () => {

  return <div>
    <h1>Home</h1>
    <Input2 value = 'coucou' />
    <PageLink to = "/workspace" title = "workspace" />
    <PageLink to = "/settings" title = "settings" />
  </div>;

}

const Settings = () => {
  return <div>
    <h1>Settings</h1>
    <PageLink to = "/" title = "home" />
  </div>;
}

class _ImportMDPlugin{

  static get title(){ return 'Markdown' }

  constructor(){

  }

  static main(){

    alert('Markdown import custom process')

  }

}

class _ExportPDFPlugin{

  static get title(){ return 'PDF'; }

}

class _ExportHTMLPlugin{

  static get title(){ return 'HTML'; }

}

/* The code is exporting a default component that uses the `PageRouter` and `Page` components from the
"thorium-framework" library. */
export default <PageRouter >
  <Page name = "" childrens={[<Home/>]}/>
  <Page name = "workspace" childrens={[<Workspace
    pluginPages={[
      class {

        static get title(){ return "Notes" }
        static get type(){ return "note" }
        static get import(){
          return [
            _ImportMDPlugin
          ]
        }
        static get export(){ 
          return [
            _ExportPDFPlugin
          ]
        }
        static id = crypto.randomUUID();

        constructor(  ){

        }

      },
      class {

        static get title(){ return 'HTML' }
        static get type(){ return 'html' }
        static get export(){
          return [
            _ExportHTMLPlugin
          ]
        }
        static id = crypto.randomUUID();

        constructor(  ){

        }

      },
      class {

        static get title(){ return 'GPT' }
        static get type(){ return 'gpt' }
        static get export(){
          return [
            _ExportHTMLPlugin
          ]
        }
        static id = crypto.randomUUID();

        constructor(  ){

        }

      }
    ]}
    pluginBlocks={{
      'h1' : configureNoteEditorBlock( Header as any , {
        placeholder: 'Enter a header',
        levels: [1, 2, 3, 4],
        defaultLevel: 3,
      }),
      'warning' : configureNoteEditorBlock( tools.Warning, { xd : 'lolilol' }),
      'codeEditor' : configureNoteEditorBlock( tools.CodeEditor as any, { xd : 'lolilol' }),
    }}
  />]}/>
  <Page name = "settings" childrens={[<Settings/>]}/>
</PageRouter>;