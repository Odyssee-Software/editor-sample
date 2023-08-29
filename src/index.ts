import * as Neutralino from "@neutralinojs/lib";
import PageRouter from './pages/main';

import * as Database from './modules/database';

console.log(Database);

import './index.css';

window['Neutralino'] = Neutralino;
Neutralino.init();

console.log(PageRouter);