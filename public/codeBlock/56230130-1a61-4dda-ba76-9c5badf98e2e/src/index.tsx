import "./styles.module.css"
import styles from "./styles.module.css";

import { DOM } from 'thorium-framework';

let MonComponent = () => {

  return <div>
    <button _onmousedown = {() => { alert('MDRRRR') }} >YOO lolo</button>
  </div>;
  
}

DOM.render( <MonComponent/> , document.body )