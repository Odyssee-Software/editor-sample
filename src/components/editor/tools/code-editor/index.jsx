var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import { DOM, useState } from 'thorium-framework';
import style from './style.module.css';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { createTheme } from '@uiw/codemirror-themes';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { tags as t } from '@lezer/highlight';
import { Button } from '@thorium-components/button';
import { Controls } from '@thorium-components/controls';
import { filesystem as fs, os, events } from '@neutralinojs/lib';
import * as path from 'path';
let tsConfigFile = {
    "compilerOptions": {
        "jsx": "preserve",
        "module": "ES6",
        "target": "ES2016",
        "declaration": true,
        "sourceMap": true,
        "removeComments": false,
        "preserveConstEnums": true,
        "skipLibCheck": true,
        "moduleResolution": "node",
        "strict": true,
        "noImplicitAny": false,
        "baseUrl": ".",
    },
    "include": ["./src/*"],
};
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
export const TypescriptEditor = (props) => {
    return <div name='typescript-code-editor' display="false" class={style.TypescriptEditor}>
    <div name="editor" class={style.CodeEditor} _afterMounting={(target) => __awaiter(void 0, void 0, void 0, function* () {
            let { editorState } = props;
            let { value: state } = editorState;
            let { codeBlockEnvPaths } = state;
            let editor = new EditorView({
                doc: '',
                extensions: [
                    // theme
                    vscodeDark,
                    // setup
                    basicSetup,
                    // language
                    javascript({ jsx: true, typescript: true }),
                    EditorView.updateListener.of((v) => {
                        target.useContext((context) => {
                            let { value: state } = context.state;
                            let envs = state.codeBlockEnvPaths;
                            if (v.docChanged) {
                                let editorContent = editor.state.doc;
                                fs.writeFile(envs.indexSrcPath, editorContent.toString());
                            }
                        });
                    })
                ],
                parent: target,
            });
            editor.dispatch({
                changes: {
                    from: 0,
                    to: editor.state.doc.length,
                    insert: yield fs.readFile(codeBlockEnvPaths.indexSrcPath)
                }
            });
        })}/>
    </div>;
};
export const StyleEditor = (props) => {
    return <div name='style-code-editor' display="false" class={style.StyleEditor}>
    <div class={style.CodeEditor} _afterMounting={(target) => __awaiter(void 0, void 0, void 0, function* () {
            let { editorState } = props;
            let { value: state } = editorState;
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
                        target.useContext((context) => {
                            let { value: state } = context.state;
                            let envs = state.codeBlockEnvPaths;
                            if (v.docChanged) {
                                let editorContent = editor.state.doc;
                                fs.writeFile(envs.styleSrcPath, editorContent.toString());
                            }
                        });
                    })
                ],
                parent: target,
            });
            editor.dispatch({
                changes: {
                    from: 0,
                    to: editor.state.doc.length,
                    insert: yield fs.readFile(codeBlockEnvPaths.styleSrcPath)
                }
            });
        })}/>
  </div>;
};
export const HTMLViewer = (props) => {
    let { value: state } = props.editorState;
    return <div name="html-code-viewer" display={false} class={style.CodeViewer}>
    <div>
      <iframe name="viewer" _afterMounting={(target) => __awaiter(void 0, void 0, void 0, function* () {
            target.srcdoc = `<html>
          <head>
          </head>
          <body>
            <h1>Hello</h1>
            <script src = "codeBlock/${state.codeBlockId}/dist/build.js"></script>
          </body>
        </html>`;
            createWatcher(state.codeBlockEnvPaths, () => {
                target.srcdoc = `<html>
            <head>
            </head>
            <body>
              <h1>Hello</h1>
              <script src = "codeBlock/${state.codeBlockId}/dist/build.js"></script>
            </body>
          </html>`;
            });
        })}/>
    </div>
  </div>;
};
const action_ButtonCode = (event) => {
    let target = event.target;
    let context = target.context('code-editor-container');
    context.show_typescritEditor();
};
const action_ButtonStyle = (event) => {
    let target = event.target;
    let context = target.context('code-editor-container');
    context.show_styleEditor();
};
const action_ButtonView = (event) => {
    let target = event.target;
    let context = target.context('code-editor-container');
    context.show_codeViewer();
};
const get_typescriptEditor = function () {
    return this.querySelectorAll(`div.${style.TypescriptEditor}`)[0];
};
const show_typescriptEditor = function () {
    let typescriptEditor = this.get_typescriptEditor();
    if (typescriptEditor) {
        this.hide_all();
        typescriptEditor.setAttribute('display', 'true');
    }
};
const get_styleEditor = function () {
    return this.querySelectorAll(`div.${style.StyleEditor}`)[0];
};
const show_styleEditor = function () {
    let styleEditor = this.get_styleEditor();
    if (styleEditor) {
        this.hide_all();
        styleEditor.setAttribute('display', 'true');
    }
};
const get_codeViewer = function () {
    return this.querySelectorAll(`div.${style.CodeViewer}`)[0];
};
const show_codeViewer = function () {
    let codeViewer = this.get_codeViewer();
    if (codeViewer) {
        this.hide_all();
        codeViewer.setAttribute('display', 'true');
    }
};
;
export const defineEnvironement = (codeBlockId) => {
    return {
        get _publicPath() { return ['public']; },
        get publicPath() { return this._publicPath.join('/'); },
        get _codeBlockEnvPath() { return [...this._publicPath, 'codeBlock']; },
        get codeBlockEnvPath() { return this._codeBlockEnvPath.join('/'); },
        get _envPath() { return [...this._codeBlockEnvPath, codeBlockId]; },
        get envPath() { return this._envPath.join('/'); },
        get _envSrcPath() { return [...this._envPath, 'src']; },
        get envSrcPath() { return this._envSrcPath.join('/'); },
        get _envDistPath() { return [...this._envPath, 'dist']; },
        get envDistPath() { return this._envDistPath.join('/'); },
        get _tsconfigSrcPath() { return [...this._envPath, 'tsconfig.json']; },
        get tsconfigSrcPath() { return this._tsconfigSrcPath.join('/'); },
        get _indexSrcPath() { return [...this._envSrcPath, 'index.tsx']; },
        get indexSrcPath() { return this._indexSrcPath.join('/'); },
        get _styleSrcPath() { return [...this._envSrcPath, 'styles.module.css']; },
        get styleSrcPath() { return this._styleSrcPath.join('/'); }
    };
};
let isDirectoryExist = (path) => __awaiter(void 0, void 0, void 0, function* () {
    let result = false;
    try {
        yield fs.readDirectory(path);
        result = true;
    }
    catch (error) {
        result = false;
    }
    finally {
        return result;
    }
});
let isFileExist = (path) => __awaiter(void 0, void 0, void 0, function* () {
    let result = false;
    try {
        yield fs.readFile(path);
        result = true;
    }
    catch (error) {
        result = false;
    }
    finally {
        return result;
    }
});
let isCodeBlockDirectoryExist = (env) => {
    return isDirectoryExist(env.codeBlockEnvPath);
};
let createCodeBlockDirectory = (env) => {
    return fs.createDirectory(env.codeBlockEnvPath);
};
let isEnvRootDirectoryExist = (env) => {
    return isDirectoryExist(env.envPath);
};
let createEnvRootDirectory = (env) => {
    return fs.createDirectory(env.envPath);
};
let isSourceDirectoryExist = (env) => {
    return isDirectoryExist(env.envSrcPath);
};
let createSourceDirectory = (env) => {
    return fs.createDirectory(env.envSrcPath);
};
let isSourceFileExist = (env) => {
    return isFileExist(env.indexSrcPath);
};
let createSourceFileExist = (env) => {
    return fs.writeFile(env.indexSrcPath, `console.log("Hello World 😃");`);
};
let isStyleFileExist = (env) => {
    return isFileExist(env.styleSrcPath);
};
let createStyleFileExist = (env) => {
    return fs.writeFile(env.styleSrcPath, `.MyComponent{}`);
};
let isTsConfigExist = (env) => {
    return isFileExist(env.tsconfigSrcPath);
};
let createTSConfig = (env) => {
    return fs.writeFile(env.tsconfigSrcPath, JSON.stringify(tsConfigFile, null, '\t'));
};
let pairConfiguration = (env) => __awaiter(void 0, void 0, void 0, function* () {
    return [
        [yield isCodeBlockDirectoryExist(env), () => { return createCodeBlockDirectory(env); }],
        [yield isEnvRootDirectoryExist(env), () => { return createEnvRootDirectory(env); }],
        [yield isSourceDirectoryExist(env), () => { return createSourceDirectory(env); }],
        [yield isSourceFileExist(env), () => { return createSourceFileExist(env); }],
        [yield isSourceFileExist(env), () => { return createSourceFileExist(env); }],
        [yield isStyleFileExist(env), () => { return createStyleFileExist(env); }],
        [yield isTsConfigExist(env), () => { return createTSConfig(env); }],
    ];
});
let createWatcher = (env, callback) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let osEnv = yield os.getEnvs();
            let watcherId = yield fs.createWatcher(path.join(osEnv.PWD, env.envSrcPath));
            let event = yield events.on('watchFile', (evt) => __awaiter(void 0, void 0, void 0, function* () {
                if (watcherId == evt.detail.id)
                    yield callback(evt);
            }));
            resolve({ watcherId, event });
        }
        catch (error) {
            reject(error);
        }
    }));
};
let disposeWatcher = (watcherId) => {
    events.on('watchFile', (evt) => {
        if (watcherId == evt.detail.id) {
            console.log(evt.detail);
        }
    });
    return fs.removeWatcher(watcherId);
};
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
    constructor(config) {
        this.state = null;
        this.codeBlockId = crypto.randomUUID();
        this.codeBlockEnvPaths = defineEnvironement(this.codeBlockId);
        let { data } = config;
        Object.assign(this, data);
        this.codeBlockEnvPaths = defineEnvironement(this.codeBlockId);
        let [state] = useState(this);
        this.state = state;
    }
    onChange() {
        // Update file
        // Compile
        // Render compilation in script
    }
    ensureRepertoryIntegrity() {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let pairConf = yield pairConfiguration(this.codeBlockEnvPaths);
            try {
                for (var _d = true, pairConf_1 = __asyncValues(pairConf), pairConf_1_1; pairConf_1_1 = yield pairConf_1.next(), _a = pairConf_1_1.done, !_a; _d = true) {
                    _c = pairConf_1_1.value;
                    _d = false;
                    const pair = _c;
                    let [verif, create] = pair;
                    if (!verif)
                        yield create();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = pairConf_1.return)) yield _b.call(pairConf_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            let verifCompleted = !pairConf.reduce((arr, pair) => {
                let [verif, create] = pair;
                arr.push(verif);
                return arr;
            }, []).includes(false);
            console.warn({ verifCompleted });
            if (!verifCompleted)
                return this.ensureRepertoryIntegrity();
            else
                return true;
        });
    }
    launchCompilationWatcher() {
        console.warn('launchCompilationWatcher');
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let { PWD } = yield os.getEnvs();
            let command = `npx --yes thorium-cli@1.0.50 --entryDir=${path.join(PWD, this.codeBlockEnvPaths.envSrcPath)} --outputDir=${path.join(PWD, this.codeBlockEnvPaths.envDistPath)} --watch`;
            console.warn(`Exec : ${command}`, { background: true });
            os.execCommand(command, { background: true })
                .then((result) => {
                console.log({ consoleResult: result });
                resolve(result);
            })
                .catch(reject);
        }));
    }
    compile() {
    }
    updateViewer() {
    }
    render() {
        Promise.all([
            this.ensureRepertoryIntegrity(),
            this.launchCompilationWatcher()
        ])
            .then((result) => {
            console.warn({ possibleResult1: result });
        })
            .catch((error) => {
            console.warn({ possibleResult2: error });
        });
        return DOM.render(<div _state={this.state} context="code-editor-container" class={style.CodeEditorContainer} _get_typescriptEditor={get_typescriptEditor} _show_typescritEditor={show_typescriptEditor} _get_styleEditor={get_styleEditor} _show_styleEditor={show_styleEditor} _get_codeViewer={get_codeViewer} _show_codeViewer={show_codeViewer} _hide_all={function () {
                let [container] = this.querySelectorAll(`.${style.CodeEditorCodeWorkspace}`);
                for (const child of container.children) {
                    let value = child.getAttribute('display');
                    if (value == 'true')
                        child.setAttribute('display', 'false');
                }
            }} _afterMounting={(target) => {
                let _virtualConf = {
                    id: crypto.randomUUID(),
                };
                alert('afterMounting');
            }}>
        <div class={style.CodeEditorMenu}>
          <Controls buttons={[
                <Button textContent='settings ⛔️'/>,
                <Button textContent='open Editor ⛔️'/>,
                <Button textContent='code' action={action_ButtonCode}/>,
                <Button textContent='style' action={action_ButtonStyle}/>,
                <Button textContent='view' action={action_ButtonView}/>
            ]}/>
        </div>
        <div class={style.CodeEditorCodeWorkspace}>
          <TypescriptEditor editorState={this.state}/>
          <StyleEditor editorState={this.state}/>
          <HTMLViewer editorState={this.state}/>
        </div>
      </div>);
    }
    save(blockContent) {
        console.log({ blockContent });
        return {
            codeBlockId: this.codeBlockId
        };
    }
}
//# sourceMappingURL=index.jsx.map