import { PageRouter , Page , PageLink , useState , DOM, CustomElement } from "thorium-framework";
import { Workspace } from '@components/workspace';

import { configureNoteEditorBlock } from "@components/workbench";
import Header from '@editorjs/header';
import * as tools from '../components/editor/tools';
import { Input2 } from '@thorium-components/input2';
import { BlockAPI } from "@editorjs/editorjs";
import { Divider } from "@thorium-components/divider";

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
      'h1' : configureNoteEditorBlock( class extends Header{

        renderSettings( props ){

          let api = this['api'] as EditorJS.API;
          let data = this['data'] as { text : string , level : number };
          let block = this['block'] as typeof Header;
          let { settings , config } = props;

          if(!this['blockContext'].get('text'))this['blockContext'].set<string | null>( 'text' , data.text );
          if(!this['blockContext'].get('level'))this['blockContext'].set<number | null>( 'level' , data.level );

          let { state:text , setter:setText } = this['blockContext'].get('text');
          let { state:level , setter:setLevel } = this['blockContext'].get('level');

          return <div>
            <nav>
              <h1 _textContent = { String(block.name).toUpperCase() } />
            </nav>
            <div>
              <label>text</label>
              <input 
                _value = { text }
                _afterMounting = {( target ) => {

                  text.subscribe( target , ( newValue ) => {
                    api.blocks.update( block.id , { text : newValue , level : level } );
                  })

                }}
                _onkeyup = {(event:Event) => {

                  let target = event.target as CustomElement<HTMLInputElement , {}>;
                  let value = target.value;
                  setText( value );

                }}
              />
            </div>
            <div>
              <label>level</label>
              <select 
                _afterMounting = {(target) => {

                  level.subscribe( target , ( newLevel ) => {
                    api.blocks.update( block.id , { text : text , level : newLevel } )
                  })

                }}
                _onchange = {(event:Event) => {

                  let target = event.target as CustomElement<HTMLSelectElement , {}>;
                  let value = target.value;
                  setLevel(Number( value ))

                }} 
                childrens = { Array.from( config.levels , (l) => {

                  return (
                    l == level ?
                    <option _textContent = {l} selected = {"true"}/>
                    :
                    <option _textContent = {l}/>
                  );
                }) } 
              />
            </div>
          </div>;

        }

      } as any , {
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