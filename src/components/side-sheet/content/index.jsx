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
import { DOM, DesignSystem, PaternArea } from 'thorium-framework';
import { Button } from '@thorium-components/button';
import { Controls } from '@thorium-components/controls';
import { Divider } from '@thorium-components/divider';
import { ContextualMenu } from '@components/contextual-menu';
import { createPage, findAllPages, findPage } from '@modules/database';
import { editorState, setEditorState } from '@components/editor';
import { OpenSpring } from '../../../animations/spring';
const { register: Patern } = DesignSystem();
import styles from './style.module.css';
import * as path from 'path';
import PageIcon from '@fluentui/svg-icons/icons/document_20_filled.svg';
const PaternPageControl = DesignSystem().register("thorium", {
    baseName: 'page-selector',
    childrens: [<PaternArea></PaternArea>],
    observedAttibutes: [],
    __getter__: {
        area: (target) => {
            let [area] = target.shadowRoot.children;
            return area;
        }
    },
    __setter__: {}
});
const PageControlConnector = PaternPageControl.connector();
const PageContr = (page) => {
    return <PageControlConnector attr={{ class: styles.PageControl }} childrens={[
            <Button id={page.id} name="page-selector" textContent={page.name} icon={{ type: 'mask', path: path.join('app', path.basename(PageIcon)) }} controls={[
                    <Button name="page-edit" textContent='✍️' action={() => { }}/>,
                    <Button name="page-delete" textContent='🗑️' action={() => { }}/>,
                    <Button name="page-options" textContent='⠸' action={(event) => {
                            let { target } = event;
                            let { virtual: VirtualDOM } = DOM;
                            VirtualDOM.createNodeElement(<ContextualMenu target={target} position='right' childrens={[
                                    <Button textContent='Edit'/>,
                                    <Button textContent='Copy'/>,
                                    <Divider />,
                                    <Button textContent='Edit'/>,
                                    <Button textContent='Copy'/>,
                                    <Divider />,
                                    <Button textContent='Edit'/>,
                                    <Button textContent='Copy'/>
                                ]}/>, document.body);
                        }}/>
                ]} action={() => __awaiter(void 0, void 0, void 0, function* () {
                    let { value: state } = editorState;
                    let { detail: pageResult } = yield findPage({ id: page.id });
                    let [pageSettings] = pageResult;
                    let { content } = pageSettings;
                    setEditorState(Object.assign(Object.assign({}, editorState.value), { configuration: {
                            pageId: page.id,
                            pageName: page.name,
                            content: content,
                        } }));
                    let { editor } = state;
                    if (editor)
                        editor.render(content);
                })} _afterMounting={(target) => {
                    editorState.subscribe(target, (stateConfig) => {
                        let { configuration } = stateConfig;
                        let pageId = page.id;
                        let { text: textElement } = target.children;
                        let { innerHTML: text } = textElement;
                        if (pageId == configuration.pageId && text != configuration.pageName) {
                            textElement.innerText = configuration.pageName;
                        }
                    });
                }}/>
        ]}/>;
};
const PageControl = (page) => {
    return <div class={styles.PageControl}>
    <Button name="page-selector" textContent={page.name} icon={{ type: 'mask', path: path.join('app', path.basename(PageIcon)) }} controls={[
            <Button name="page-edit" textContent='✍️' action={() => { }}/>,
            <Button name="page-delete" textContent='🗑️' action={() => { }}/>,
            <Button name="page-options" textContent='⠸' action={(event) => {
                    let { target } = event;
                    let { virtual: VirtualDOM } = DOM;
                    VirtualDOM.createNodeElement(<ContextualMenu target={target} position='right' childrens={[
                            <Button textContent='Edit'/>,
                            <Button textContent='Copy'/>,
                            <Divider />,
                            <Button textContent='Edit'/>,
                            <Button textContent='Copy'/>,
                            <Divider />,
                            <Button textContent='Edit'/>,
                            <Button textContent='Copy'/>
                        ]}/>, document.body);
                }}/>
        ]} action={() => __awaiter(void 0, void 0, void 0, function* () {
            let { value: state } = editorState;
            let { detail: pageResult } = yield findPage({ _id: page.id });
            let [pageSettings] = pageResult;
            let { content } = pageSettings;
            setEditorState(Object.assign(Object.assign({}, editorState.value), { configuration: {
                    pageId: page.id,
                    pageName: page.name,
                    content: content,
                } }));
            let { editor } = state;
            if (editor)
                editor.render(content);
        })}/>
  </div>;
};
export const SideSheetContent = (props) => {
    let UserPages = () => {
        let PageControls = () => {
            return <div name='pages-control' _afterMounting={(target) => __awaiter(void 0, void 0, void 0, function* () {
                    var _a, e_1, _b, _c;
                    let { virtual: VirtualDOM } = DOM;
                    let { detail: pages } = yield findAllPages();
                    try {
                        for (var _d = true, pages_1 = __asyncValues(pages), pages_1_1; pages_1_1 = yield pages_1.next(), _a = pages_1_1.done, !_a; _d = true) {
                            _c = pages_1_1.value;
                            _d = false;
                            const page = _c;
                            VirtualDOM.createNodeElement(<PageContr id={page.id} name={page.name}/>, target);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (!_d && !_a && (_b = pages_1.return)) yield _b.call(pages_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    ;
                    OpenSpring(target);
                })} _addPageController={function (page) {
                    let { virtual: VirtualDOM } = DOM;
                    VirtualDOM.createNodeElement(<PageContr id={page._id} name={page.name}/>, this);
                }}/>;
        };
        return <div context='pages-user'>
      <nav class={styles.UserPagesNav}>
        <h3>▸ Pages</h3>
        <Controls buttons={[
                <Button textContent='+' action={(event) => __awaiter(void 0, void 0, void 0, function* () {
                        var _a, _b;
                        let target = event.target;
                        let context = target.context('pages-user');
                        let [pagesControl] = context.querySelectorAll('div[name="pages-control"]');
                        if (pagesControl) {
                            let pageId = crypto.randomUUID();
                            let pageName = '';
                            pagesControl.addPageController({ id: pageId, name: pageName });
                            let content = [{ "data": { "level": 1, "text": "" }, "id": "ZZBRUsbQIP", "type": "h1" }];
                            setEditorState(Object.assign(Object.assign({}, editorState.value), { configuration: {
                                    id: pageId,
                                    name: pageName,
                                    content: { blocks: content },
                                } }));
                            yield createPage((_a = editorState.value) === null || _a === void 0 ? void 0 : _a.configuration);
                            (_b = editorState.value) === null || _b === void 0 ? void 0 : _b.editor.render({
                                blocks: content
                            });
                        }
                    })}/>,
            ]}/>
      </nav>
      <PageControls />
    </div>;
    };
    return <div class={styles.SideSheetContent}>
    <div>
      <h3>▸ Options</h3>
    </div>
    <Divider />
    <UserPages />
    <Divider />
    <div>
      <h3>▸ Spaces</h3>
    </div>
  </div>;
};
//# sourceMappingURL=index.jsx.map