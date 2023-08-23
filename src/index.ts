import * as Neutralino from "@neutralinojs/lib";
import PageRouter from './pages/main';

import './index.css';

window['Neutralino'] = Neutralino;
Neutralino.init();

console.log(PageRouter);