var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState } from 'thorium-framework';
import notifier from 'codex-notifier';
import style from './style.module.css';
import * as Tools from './tools';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import * as Database from '@modules/database';
export const [editorState, setEditorState] = useState(null);
/**
 * Le code ci-dessus est un composant Thorium TypeScript appelé "HelloWorld" qui rend un éditeur en utilisant la
 * bibliothèque EditorJS et enregistre le contenu dans une base de données lorsqu'il est modifié.
 * @returns Le code renvoie un élément JSX qui représente un conteneur div avec un composant d'éditeur à l'intérieur.
 * Le composant d'éditeur est créé à l'aide de la bibliothèque EditorJS et comporte divers outils configurés,
 * tels que des en-têtes, une console, des avertissements et des erreurs. Le composant d'éditeur dispose également
 * de gestionnaires d'événements pour les événements onReady et onChange.
*/
export const HelloWorld = () => {
    let initEditorJs = (target) => __awaiter(void 0, void 0, void 0, function* () {
        const editor = new EditorJS({
            holder: target,
            autofocus: true,
            tools: {
                'h1': {
                    class: Header,
                    config: {
                        placeholder: 'Enter a header',
                        levels: [1, 2, 3, 4],
                        defaultLevel: 3
                    }
                },
                console: Tools.Console,
                warning: Tools.Warning,
                error: Tools.Alert,
                codeEditor: Tools.CodeEditor
            },
            onReady: () => {
                setEditorState({
                    configuration: {
                        pageId: '',
                        pageName: '',
                        content: []
                    },
                    editor
                });
            },
            onChange: (api, event) => __awaiter(void 0, void 0, void 0, function* () {
                let { configuration, editor } = editorState.value;
                console.log({ configuration });
                if (!configuration.pageId) {
                    notifier.show({
                        message: "Vous n'avez aucune page sélectionnée",
                        style: 'error',
                        time: 1000
                    });
                }
                else {
                    let save = yield editor.save();
                    let { pageName } = configuration;
                    let { blocks } = save;
                    let [titleBlock] = blocks;
                    let { text: titleText } = titleBlock.data;
                    console.log({ titleBlock }, { titleText }, { pageName });
                    if (titleText != pageName) {
                        setEditorState({
                            configuration: Object.assign(Object.assign({}, configuration), { pageName: titleText }),
                            editor,
                        });
                    }
                    let insertResult = yield Database.update({
                        search: { id: configuration.pageId },
                        insert: {
                            id: configuration.pageId,
                            name: titleText,
                            content: save
                        }
                    });
                    console.log({ insertResult, insert: {
                            id: configuration.pageId,
                            name: configuration.pageName,
                            content: save
                        } });
                }
            })
        });
    });
    return <div class={style.EditorContainer}>
    <div id="editorjs" class={style.Editor} allowEnter="false" _afterMounting={initEditorJs}/>
  </div>;
};
//# sourceMappingURL=index.jsx.map