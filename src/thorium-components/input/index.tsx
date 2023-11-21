import { DesignSystem , PaternArea , CustomElement , NodeTemplate } from "thorium-framework";
import { CustomElementDefultProps } from '../index';
export type InputElement = CustomElement< HTMLDivElement , {
  value:string;
  input:CustomElement< HTMLInputElement , {} >
  children:{
    input:CustomElement<HTMLInputElement , {}>
  };
} >;

export const InputPatern = DesignSystem().register('thorium' , {
  baseName : 'button',
  attr : {},
  childrens : [<PaternArea></PaternArea>],
  proto : {},
  __getter__ : {
    input : function( this:InputElement ){

    },
    value : function( this:InputElement ){
      return this.children.input.value;
    } 
  },
  __setter__ : {
    value : function( this:InputElement , value:string){
      this.children.input.value = value;
    }
  },
});

export const InputConnector = InputPatern.connector<any>();

export interface InputProps extends CustomElementDefultProps{
  type?:string;
  placeholder?:string;
  value?:string;
  min?:string;
  max?:string;
  onchange?(event:Event):void;
}

export const Input = ( props:InputProps ):NodeTemplate<InputElement> => {

  return <div>
    <input
      _placeholder = { props.placeholder }
      _value = { props.value }
      _afterMounting = {( target:CustomElement<HTMLInputElement , {}> ) => {

        if(props.type)target.setAttribute('type' , props.type);
        if(props.min)target.setAttribute('min' , props.min);
        if(props.max)target.setAttribute('max' , props.max);

        if(props.onchange)target.onchange = props.onchange;

      }}
    />
  </div>

}