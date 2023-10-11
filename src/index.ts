import * as Neutralino from "@neutralinojs/lib";
import PageRouter from './pages/main';

import { DOM } from 'thorium-framework';

import * as Database from './modules/database';

console.log(Database);

import './index.css';

window['Neutralino'] = Neutralino;
Neutralino.init();

window['DOM'] = DOM;
window['VirtualDOM'] = DOM.virtual;

console.log(PageRouter);