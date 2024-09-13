import * as Neutralino from "@neutralinojs/lib";
import "web-dialog";
import './context';
import './pages/main';

import { DOM , preload , PreloadModule , pages } from 'thorium-framework';

import * as database from 'editor-database-service/client/dist/index';

import './index.css';
import styles from './loading.module.css';
import notifier from "codex-notifier";

declare const window:Window & {
  Neutralino:typeof Neutralino;
  DOM:typeof DOM;
};

window['Neutralino'] = Neutralino;
window['DOM'] = DOM;
window["Database"] = database;

interface ITestModule{
  lol:string;
}

/* The `let testModule:PreloadModule` statement is declaring a variable called `testModule` with the
type `PreloadModule`. */
let testModule:PreloadModule = {

  main(){

    return new Promise((next) => {

      let overlay = document.createElement('div');
      overlay.setAttribute('class' , styles.Overlay );
      overlay.innerHTML = `<div class = "${styles.Container}">
        <div class="${styles.Ellipsis}"><div></div><div></div><div></div><div></div></div>
        <div class="${styles.Text}">Preload Working</div>
        <p>Welcome in Editor</p>
      </div>`;

      document.body.appendChild(overlay);

      setTimeout(() => {
        overlay.remove();
        next( true );
      }, 2000);

    })

  }

}

let testConcurentModule:PreloadModule = {

  main(){
    return new Promise((next) => {
      let counter = 1;
      let interval = setInterval(() => {

        if(counter == 6){
          clearInterval( interval );
          next( true );
        }
        else {
          notifier.show( {
            message: `Concurent loading count : ${counter}`,
            time : 1000
          } );
          counter = counter + 1;
        }

      } , 1000)
    })
  }

}

pages().onHashChange = () => {
  notifier.show( {
    message: `Hash change catched`,
    time : 1000
  } );
}

pages().onRenderPage = () => {
  notifier.show( {
    message: `Render page catched`,
    time : 1000
  } );
}

/* The `preload().push( testModule );` statement is adding the `testModule` object to the
`preloadStack` array. This means that the `testModule` will be executed when the `preloadStack` is
executed using the `execute()` method. */
// preload().push( testModule );
// preload().push( testConcurentModule );

Neutralino.init();