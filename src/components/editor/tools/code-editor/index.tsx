import { DOM , CustomElement , useState , State } from 'thorium-framework';
import style from './style.module.css';

import { minimalSetup, EditorView , basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { createTheme } from '@uiw/codemirror-themes';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { tags as t } from '@lezer/highlight';

import { Button } from '@thorium-components/button';
import { Controls } from '@thorium-components/controls';
import { OutputBlockData , OutputData } from '@editorjs/editorjs';

import { filesystem as fs , os , events } from '@neutralinojs/lib';
import * as path from 'path';

import { editorState } from '../../'

let tsConfigFile = {
  "compilerOptions": {
    "jsx": "preserve",
    "module": "ES6",
    "target": "ES2016",
    "declaration": true,
    "sourceMap": true,
    "removeComments": false,
    "preserveConstEnums" : true,
    "skipLibCheck": true,
    "moduleResolution":"node",
    "strict": true,
    "noImplicitAny": false,
    "baseUrl": ".",
  },
  "include": ["./src/*"],
}


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

type EditorContainerElement = CustomElement<HTMLDivElement , {
  children : {
    "editor" : CustomElement<HTMLDivElement,{

    }>
  }
}>

export const TypescriptEditor = ( props : { editorState:State<CodeEditor> } ):EditorContainerElement => {

  return <div name = 'typescript-code-editor' display = "false" class = { style.TypescriptEditor } >
    <div
      name = "editor"
      class = {style.CodeEditor}
      _afterMounting = {async (target:CustomElement<HTMLDivElement , {}>) => {

        let { editorState } = props;
        let { value:state } = editorState;
        let { codeBlockEnvPaths } = state;

        let editor = new EditorView({
          doc: '',
          extensions: [
            // theme
            vscodeDark,
            // setup
            basicSetup,
            // language
            javascript({ jsx: true , typescript : true }),
            EditorView.updateListener.of((v) => {

              target.useContext<CodeEditorElement>(( context ) => {

                let { value:state } = context.state;
                let envs = state.codeBlockEnvPaths;

                if (v.docChanged) {
                  let editorContent = editor.state.doc;
                  fs.writeFile( envs.indexSrcPath , editorContent.toString() );
                }

              })
              
            })
          ],
          parent: target,
        });

        editor.dispatch({
          changes: {
              from: 0,
              to: editor.state.doc.length,
              insert: await fs.readFile( codeBlockEnvPaths.indexSrcPath )
          }
        })
        

      }}
    />
</div>;

}

export const StyleEditor = ( props:{editorState:State<CodeEditor>} ):EditorContainerElement => {

  return <div name = 'style-code-editor' display = "false" class = { style.StyleEditor } >
    <div
      class = {style.CodeEditor}
      _afterMounting = {async (target:CustomElement<HTMLDivElement,{}>) => {

        let { editorState } = props;
        let { value:state } = editorState;
        let { codeBlockEnvPaths } = state;
        
        let editor = new EditorView({
          doc: '',
          extensions: [
            // theme
            vscodeDark,
            // setup
            basicSetup,
            // language
            css(),
            EditorView.updateListener.of((v) => {

              target.useContext<CodeEditorElement>(( context ) => {

                let { value:state } = context.state;
                let envs = state.codeBlockEnvPaths;

                if (v.docChanged) {
                  let editorContent = editor.state.doc;
                  fs.writeFile( envs.styleSrcPath , editorContent.toString() );
                }

              })
              
            })
          ],
          parent: target,
        });

        editor.dispatch({
          changes: {
              from: 0,
              to: editor.state.doc.length,
              insert: await fs.readFile( codeBlockEnvPaths.styleSrcPath )
          }
        });

      }}
    />
  </div>;
}

export const HTMLViewer = ( props : {editorState:State<CodeEditor>} ) => {

  let { value:state } = props.editorState;

  return <div name = "html-code-viewer" display = { false } class = { style.CodeViewer } >
    <div>
      <iframe name = "viewer" _afterMounting = {async ( target:CustomElement< HTMLIFrameElement , {} > ) => { 

        target.srcdoc = `<html>
          <head>
          </head>
          <body>
            <h1>Hello</h1>
            <script src = "codeBlock/${state.codeBlockId}/dist/build.js"></script>
          </body>
        </html>`;

        createWatcher( state.codeBlockEnvPaths , () => {
          target.srcdoc = `<html>
            <head>
            </head>
            <body>
              <h1>Hello</h1>
              <script src = "codeBlock/${state.codeBlockId}/dist/build.js"></script>
            </body>
          </html>`;
        } )

      }} />
    </div>
  </div>;

}


export type CodeEditorElement = CustomElement<HTMLDivElement , {
  state:State<CodeEditor>;
  get_typescriptEditor():CustomElement<HTMLElement,{}>;
  show_typescritEditor():void;
  show_codeViewer():void;
  get_styleEditor():CustomElement<HTMLElement,{}>;
  show_styleEditor():void;
  get_codeViewer():CustomElement<HTMLElement,{}>;
  show_codeViewer():void;
  hide_all():void;
}>

const action_ButtonCode = ( event:MouseEvent ) => {
  let target = event.target as CustomElement<HTMLButtonElement,{}>;
  let context = target.context<CodeEditorElement>('code-editor-container');
  context.show_typescritEditor();
}

const action_ButtonStyle = ( event:MouseEvent ) => {
  let target = event.target as CustomElement<HTMLButtonElement,{}>;
  let context = target.context<CodeEditorElement>('code-editor-container');
  context.show_styleEditor();
}

const action_ButtonView = ( event:MouseEvent ) => {
  let target = event.target as CustomElement<HTMLButtonElement,{}>;
  let context = target.context<CodeEditorElement>('code-editor-container');
  context.show_codeViewer();
}

const get_typescriptEditor = function( this:CodeEditorElement ){
  return this.querySelectorAll(`div.${style.TypescriptEditor}`)[0];
}

const show_typescriptEditor = function( this:CodeEditorElement ){
  let typescriptEditor = this.get_typescriptEditor();
  if(typescriptEditor){
    this.hide_all();
    typescriptEditor.setAttribute('display' , 'true');
  }
}

const get_styleEditor = function( this:CodeEditorElement ){
  return this.querySelectorAll(`div.${style.StyleEditor}`)[0];
}

const show_styleEditor = function( this:CodeEditorElement ){
  let styleEditor = this.get_styleEditor();
  if(styleEditor){
    this.hide_all();
    styleEditor.setAttribute('display' , 'true');
  }
}

const get_codeViewer = function( this:CodeEditorElement ){
  return this.querySelectorAll(`div.${style.CodeViewer}`)[0];
}

const show_codeViewer = function( this:CodeEditorElement ){
  let codeViewer = this.get_codeViewer();
  if(codeViewer){
    this.hide_all();
    codeViewer.setAttribute('display' , 'true');
  }
}

export interface ICodeBlockEditorConfigData extends OutputData {
  codeBlockId:`${string}-${string}-${string}-${string}-${string}`;
};

export interface ICodeBlockEditorConfig extends OutputBlockData{
  data : ICodeBlockEditorConfigData
}

export interface IEnvironements{
  _publicPath:string[];
  publicPath:string;
  _codeBlockEnvPath:string[];
  codeBlockEnvPath:string;
  _envPath:string[];
  envPath:string;
  _envSrcPath:string[];
  envSrcPath:string;
  _envDistPath:string[];
  envDistPath:string;
  _tsconfigSrcPath:string[];
  tsconfigSrcPath:string;
  _indexSrcPath:string[];
  indexSrcPath:string;
  _globalsDTsPath:string[];
  globalsDTsPath:string;
  _styleSrcPath:string[];
  styleSrcPath:string;
}

export const defineEnvironement = ( codeBlockId:string ):IEnvironements => {

  return {
    get _publicPath(){ return ['public'] },
    get publicPath(){ return this._publicPath.join('/') },
    get _codeBlockEnvPath(){ return [ ...this._publicPath , 'codeBlock' ] },
    get codeBlockEnvPath(){ return this._codeBlockEnvPath.join('/') },
    get _envPath(){ return [ ...this._codeBlockEnvPath , codeBlockId ] },
    get envPath(){ return this._envPath.join('/') },
    get _envSrcPath(){return [ ...this._envPath , 'src' ]},
    get envSrcPath(){return this._envSrcPath.join('/')},
    get _envDistPath(){return [ ...this._envPath , 'dist' ]},
    get envDistPath(){return this._envDistPath.join('/')},
    get _tsconfigSrcPath(){ return [ ...this._envPath , 'tsconfig.json' ] },
    get tsconfigSrcPath(){ return this._tsconfigSrcPath.join('/') },
    get _indexSrcPath(){ return [ ...this._envSrcPath , 'index.tsx' ] },
    get indexSrcPath(){ return this._indexSrcPath.join('/') },
    get _globalsDTsPath(){ return [ ...this._envSrcPath , 'Globals.d.ts' ] },
    get globalsDTsPath(){ return this._globalsDTsPath.join('/') },
    get _styleSrcPath(){ return [ ...this._envSrcPath , 'styles.module.css' ] },
    get styleSrcPath(){ return this._styleSrcPath.join('/') }
  }
  
}

let isDirectoryExist = async ( path:string ) => {
  let result = false;
  try{
    await fs.readDirectory( path );
    result = true;
  }
  catch(error){
    result = false;
  }
  finally{
    return result;
  }
}

let isFileExist = async ( path:string ) => {
  let result = false;
  try{
    await fs.readFile( path );
    result = true;
  }
  catch(error){
    result = false;
  }
  finally{
    return result;
  }
}

let isCodeBlockDirectoryExist = ( env:IEnvironements ) => {
  return isDirectoryExist( env.codeBlockEnvPath );
}

let createCodeBlockDirectory = ( env:IEnvironements ) => {
  return fs.createDirectory( env.codeBlockEnvPath )
}

let isEnvRootDirectoryExist = ( env:IEnvironements ) => {
  return isDirectoryExist( env.envPath );
}

let createEnvRootDirectory = ( env:IEnvironements ) => {
  return fs.createDirectory( env.envPath )
}

let isSourceDirectoryExist = ( env:IEnvironements ) => {
  return isDirectoryExist( env.envSrcPath );
}

let createSourceDirectory = ( env:IEnvironements ) => {
  return fs.createDirectory( env.envSrcPath );
}

let isSourceFileExist = ( env:IEnvironements ) => {
  return isFileExist( env.indexSrcPath );
}

let createSourceFileExist = ( env:IEnvironements ) => {
  let content = [
    `import "./styles.module.css"`,
    `import styles from "./styles.module.css"`,
    ``,
    `console.log("Hello World 😃");`
  ].join('\n');
  return fs.writeFile( env.indexSrcPath , content );
}

let isStyleFileExist = ( env:IEnvironements ) => {
  return isFileExist( env.styleSrcPath );
}

let createStyleFileExist = ( env:IEnvironements ) => {
  return fs.writeFile( env.styleSrcPath , `.MyComponent{}` );
}

let isTsConfigExist = ( env:IEnvironements ) => {
  return isFileExist( env.tsconfigSrcPath );
}

let createTSConfig = ( env:IEnvironements ) => {
  return fs.writeFile( env.tsconfigSrcPath , JSON.stringify(tsConfigFile , null , '\t') );
}

let isGlobalsDTsFileExist = ( env:IEnvironements ) => {
  return isFileExist( env.globalsDTsPath );
}

let createGlobalsDTs = ( env:IEnvironements ) => {
  let content = [
    `declare module "*.module.css";`,
    `declare module "*.svg";`,
    `declare module "*.jpeg";`,
    `declare module "*.png";`
  ];
  return fs.writeFile( env.globalsDTsPath , content.join('\n') );
}

let pairConfiguration = async ( env:IEnvironements ):Promise<[boolean , () => Promise<any>][]> => {

  return [
    [ await isCodeBlockDirectoryExist(env) , () => { return createCodeBlockDirectory( env ) } ],
    [ await isEnvRootDirectoryExist(env) , () => { return createEnvRootDirectory( env ) } ],
    [ await isSourceDirectoryExist(env) , () => { return createSourceDirectory( env ) } ],
    [ await isSourceFileExist(env) , () => { return createSourceFileExist( env ) } ],
    [ await isSourceFileExist(env) , () => { return createSourceFileExist( env ) } ],
    [ await isGlobalsDTsFileExist(env) , () => { return createGlobalsDTs( env ) } ],
    [ await isStyleFileExist(env) , () => { return createStyleFileExist(env) } ],
    [ await isTsConfigExist(env) , () => { return createTSConfig( env ) } ],
  ];

}

let createWatcher = ( env:IEnvironements , callback:(ev:CustomEvent<any>)=>void ):Promise<{watcherId:number,event:events.Response}> => {
  return new Promise(async ( resolve , reject ) => {
    
    try{

      let osEnv = await os.getEnvs();
      let watcherId = await fs.createWatcher( path.join( osEnv.PWD , env.envSrcPath) );
      let event = await events.on('watchFile' , async (evt) => {
        if(watcherId == evt.detail.id)await callback(evt);
      })

      resolve({ watcherId , event });

    }
    catch(error){
      reject(error);
    }
    
  })
}

let disposeWatcher = ( watcherId:number ):Promise<number> => {
  events.on('watchFile' , (evt) => {
    if(watcherId == evt.detail.id) {
      console.log(evt.detail);
    }
  })
  return fs.removeWatcher( watcherId );
}

export class CodeEditor {

  state:State<CodeEditor>|null = null;
  codeBlockId:ICodeBlockEditorConfigData['codeBlockId'] = crypto.randomUUID();
  codeBlockEnvPaths:IEnvironements = defineEnvironement(this.codeBlockId);
  watcherPidStateManager = useState<number>(-1);
  get watcherIdState(){ 
    let [ state ] = this.watcherPidStateManager;
    return state;
  };
  set watcherId(pid:number){ 
    let [ state , setter ] = this.watcherPidStateManager;
    setter(pid);
  }
  get watcherId(){ 
    return this.watcherIdState.value;
  }

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

  constructor( config:ICodeBlockEditorConfig ){

    let { data } = config;
    Object.assign( this , data );
    this.codeBlockEnvPaths = defineEnvironement(this.codeBlockId);
    let [ state ] = useState<CodeEditor>(this);
    this.state = state;

  }

  onChange(){

    // Update file
    // Compile
    // Render compilation in script

  }

  async ensureRepertoryIntegrity():Promise<boolean>{
    
    let pairConf = await pairConfiguration( this.codeBlockEnvPaths );
    for await(const pair of pairConf){
      let [ verif , create ] = pair;
      if(!verif)await create();
    }

    let verifCompleted = !pairConf.reduce(( arr:boolean[] , pair ) => {
      let [ verif , create ] = pair;
      arr.push(verif);
      return arr;
    } , []).includes(false);

    if(!verifCompleted)return this.ensureRepertoryIntegrity();
    else return true;

  }

  launchCompilationWatcher( ):Promise<os.SpawnedProcess>{
    return new Promise( async (resolve , reject) => {
      let { PWD } = await os.getEnvs();
      let command = `npx --yes thorium-cli@1.0.50 --entryDir=${path.join( PWD , this.codeBlockEnvPaths.envSrcPath )} --outputDir=${ path.join( PWD , this.codeBlockEnvPaths.envDistPath ) } --watch`;
      console.warn(`Exec : ${command}` , { background: true })
      os.spawnProcess( command )
      .then(( result ) => {
        console.log( { consoleResult : result } )
        resolve( result )
      })
      .catch(reject)
    })

  }

  compile(){

  }

  updateViewer(){

  }

  render(){

    const _self = this;

    Promise.all([
      this.ensureRepertoryIntegrity(),
      this.launchCompilationWatcher(),
    ])
    .then(( result ) => {

      let [ integrityResult , watcher ] = result;
      _self.watcherId = watcher.id;

    })
    .catch((error) => {
      console.warn({ possibleResult2 : error })
    })

    return DOM.render<CodeEditorElement>( <div 
      _state = { this.state }
      context = "code-editor-container"
      class = { style.CodeEditorContainer }
      _get_typescriptEditor = {get_typescriptEditor}
      _show_typescritEditor = {show_typescriptEditor}
      _get_styleEditor = {get_styleEditor}
      _show_styleEditor = {show_styleEditor}
      _get_codeViewer = {get_codeViewer}
      _show_codeViewer = {show_codeViewer}
      _hide_all = {function(this:CustomElement<HTMLElement,{}>){
        let [container] = this.querySelectorAll(`.${style.CodeEditorCodeWorkspace}`);
        for(const child of container.children){
          let value = child.getAttribute('display');
          if(value == 'true')child.setAttribute('display','false');
        }
      }}
      _onunmount = {() => {
        alert('Unmount');
      }}
      _afterMounting = {(target:CodeEditorElement) => {

        let _virtualConf = {
          id : crypto.randomUUID(),
        }

        alert('afterMounting')

      }}
      >
        <div class = { style.CodeEditorMenu } >
          <label _textContent = {this.codeBlockId} ></label>
          <Controls buttons = {[
            <Button textContent='settings ⛔️' />,
            <Button textContent='open Editor ⛔️' />,
            <Button textContent='code' action = {action_ButtonCode} />,
            <Button textContent='style' action = {action_ButtonStyle} />,
            <Button textContent='view' action = {action_ButtonView} />
          ]}/>
        </div>
        <div class = { style.CodeEditorCodeWorkspace }>
          <TypescriptEditor editorState = {this.state as State<CodeEditor>} />
          <StyleEditor editorState = {this.state as State<CodeEditor>} />
          <HTMLViewer editorState = {this.state as State<CodeEditor>} />
        </div>
      </div> 
    );
  }

  save(blockContent:CodeEditorElement){

    console.log({blockContent});

    return {
      codeBlockId: this.codeBlockId
    }

  }

}