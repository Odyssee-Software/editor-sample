import { DesignSystem , PaternArea , NodeTemplate , CustomElement } from 'thorium-framework';
import { State } from 'thorium-framework/modules/states';
import styles from './style.module.css';

export type Input2Element = CustomElement<HTMLDivElement , {
  value:string;
  container:Input2Element["children"]["input-container"];
  input:Input2Element["container"]["children"]["input"];
  children:{
    "input-container" : CustomElement<HTMLDivElement , {
      children : {
        "input" : CustomElement<HTMLInputElement , {}>
      }
    }>
  }
}>;

export type _InputContainer = Input2Element['children']['input-container'];
export type _Input = _InputContainer['children']['input'];

export const Input2Patern = DesignSystem().register( 'thorium' , {
  baseName : 'input',
  attr : { },
  observedAttibutes : [],
  childrens : [<PaternArea/>],
  proto : {},
  __getter__ : {
    container : ( target:Input2Element | undefined ) => { return target?.children['input-container'] },
    input : ( target:Input2Element | undefined ) => { return target?.container.children.input },
    value : ( target:Input2Element | undefined ) => { return target?.input.value }
  },
  __setter__ : {
    value : ( value : string , target:Input2Element | undefined ) => { if(target)target.input.value = value }
  }
})

export const Input2Connector = Input2Patern.connector();

export interface Input2Props{
  label?:string;
  value:string | [State<string> , (value:string) => string];
};

export const Input2 = ( props : Input2Props ):NodeTemplate<Input2Element> => {

  console.log({props})

  return (<Input2Connector
    attr = {{ context : "input" }}
    childrens={[
      <div name = "input-container" class = { styles.InputContainer1 } >
        <input
          class = { styles.Input }
          name = "input"
          _value = { ( Array.isArray(props.value) ? props.value[0] : props.value) }
          _onkeyup = {(event:Event) => {

            let target = event.target as _Input;
            let container = target.parentElement as _InputContainer;

            if(container.classList.contains(styles.InputContainer2)){
              container.classList.remove( styles.InputContainer2 );
              container.classList.add( styles.InputContainer1 );
            }
            else if(container.classList.contains(styles.InputContainer1)){
              container.classList.remove( styles.InputContainer1 );
              container.classList.add( styles.InputContainer2 );
            }

            if(Array.isArray(props.value)){
              let [ state , setState ] = props.value;
              setState( target.value );
              console.log('state change' , state)
            }

          }}
          _afterMounting = {function( this:_Input ){

            if(Array.isArray(props.value)){
              let [ state , setState ] = props.value;
              (state as State<any>).subscribe( this , ( newValue ) => {
                this.value = newValue;
              } )
            }

          }}
        />
      </div>
    ]}
  />);
  
}