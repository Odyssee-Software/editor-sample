import * as Neutralino from "@neutralinojs/lib";
import './pages/main'

import { DOM , preload , PreloadModule } from 'thorium-framework';

import './index.css';
import styles from './loading.module.css';

declare const window:Window & {
  Neutralino:typeof Neutralino;
  DOM:typeof DOM;
  VirtualDOM:typeof DOM.virtual;
};

window['Neutralino'] = Neutralino;
window['DOM'] = DOM;
window['VirtualDOM'] = DOM.virtual;

interface ITestModule{
  lol:string;
}

/* The `let testModule:PreloadModule` statement is declaring a variable called `testModule` with the
type `PreloadModule`. */
let testModule:PreloadModule = {

  main(){

    return new Promise((next) => {

      document.body.innerHTML = `<div class = "${styles.Overlay}" >
        <div class = "${styles.Container}">
          <div class="${styles.Ellipsis}"><div></div><div></div><div></div><div></div></div>
          <div class="${styles.Text}">Preload Working</div>
          <p>Welcome in Editor</p>
        </div>
      </div>`;

      setTimeout(() => {
        document.body.innerHTML = "";
        next( true );
      }, 2000);

    })

  }

}

/* The `preload().push( testModule );` statement is adding the `testModule` object to the
`preloadStack` array. This means that the `testModule` will be executed when the `preloadStack` is
executed using the `execute()` method. */
preload().push( testModule );

Neutralino.init();