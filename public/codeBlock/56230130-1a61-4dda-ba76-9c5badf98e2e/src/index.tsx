import "./styles.module.css"
import styles from "./styles.module.css";

import { DOM , CustomElement , useState } from 'thorium-framework';

interface ButtonProps{
  text:string;
  action(event:MouseEvent):void;
}

let Button = ( props:ButtonProps  ) => {

  let [colorId,setColorId] = useState(0);
  let colors = [ 'red' , 'blue' , 'green' ];

  return <div>
    <button 
      _onmousedown = {( event:MouseEvent ) => {

        setColorId( colorId.value + 1 );
        props.action(event);

      }}  
      _afterMounting = {(target) => {

        colorId.subscribe(  )

      }}
      _textContent = {props.text}
    />
  </div>;
  
}

DOM.render( <Button
  text = {"TATA"}
  action = {( event ) => {



  }}
/> , document.body )