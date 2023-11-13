import * as Neutralino from "@neutralinojs/lib";
import PageRouter from './pages/main';

import { DOM } from 'thorium-framework';

import './index.css';

declare const window:Window & {
  Neutralino:typeof Neutralino;
  DOM:typeof DOM;
  VirtualDOM:typeof DOM.virtual;
};

window['Neutralino'] = Neutralino;
window['DOM'] = DOM;
window['VirtualDOM'] = DOM.virtual;

Neutralino.init();

console.log(PageRouter);