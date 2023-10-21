import "./styles.module.css"
import styles from "./styles.module.css"

import { DOM , useState , CustomElement} from 'thorium-framework';

let MyComponent = () => {

  let [ number , setState ] = useState<number>( 0 );

  return <div class = {styles.MyComponent} >
    <button _textContent = "-" _onmousedown = { () => { setState( number.value - 1 ) } } />
    <input 
      _afterMounting = {(target:CustomElement<HTMLInputElement , {}>) => {

        target.value = `${number.value}`;

        number.subscribe( target , ( newValue ) => {
          if(newValue != Number(target.value))target.value = `${newValue}`;
        });

      }} 
      _onchange = {function( this:CustomElement<HTMLInputElement , {}> ){ 
        setState( Number(this.value) )
      }}
    />
    <button _textContent = "+" _onmousedown = { () => { setState( number.value + 1 ) } } />
  </div>

}

DOM.render( <MyComponent/> , document.body );