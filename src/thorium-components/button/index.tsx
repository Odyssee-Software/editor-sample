import { DOM , CustomElement , DesignSystem , PaternArea , PageLink } from 'thorium-framework';
import { Icon , IconProps , IconContainerElement} from '../icon';
import { Controls , ControlsElement , ControlsProps } from '../controls';
import style from './style.module.css';

import { CustomElementDefultProps } from '../'

export type ButtonTextElement = CustomElement<HTMLParagraphElement , {}>;

export type ButtonElement< ControlsChildren = Record<string , CustomElement<Element,{}>> > = CustomElement<HTMLButtonElement , {
  controls():ControlsElement<ControlsChildren>;
  icon():IconContainerElement;
  children:{
    icon?:IconContainerElement;
    controls?:ControlsElement<ControlsChildren>;
    text?:ButtonTextElement;
  };
  buttonElement:ButtonContentElement;
  textElement:ButtonContentTextElement;
  iconElement;
  controlsElement;
  text:string;
}>

export type ButtonProps = {
  textContent?:string;
  pageLink?:{ to:string , title:string };
  action?(event:MouseEvent):void;
  icon?:IconProps;
  controls?:ControlsProps['buttons'],
  className?:string;
} & CustomElementDefultProps;

const getButtonIcon = function( this:ButtonElement ){
  return this.children.icon;
}

const getButtonControls = function( this:ButtonElement ){
  return this.children.controls;
}

// export const Button = (props:ButtonProps):ButtonElement => {

//   return <button 
//       _onmousedown = {(props.action ? props.action : null)}
//       _icon = {getButtonIcon}
//       _controls = {getButtonControls}
//       class = {( props.className ? `${style.Button} ${props.className}` : style.Button)}
//       childrens = {[
//         ( 'icon' in props && props.icon ? <Icon type = { props.icon.type } path={ props.icon.path } /> : null ),
//         ( 'controls' in props && props.controls ? <Controls buttons = {props.controls} /> : null )
//       ]}
//     >
//     <p 
//       name = 'text'
//       class = { style.ButtonText }
//       _textContent = {props.textContent}
//     />
//   </button> 

// }

export type ButtonChildAreaElement = CustomElement<HTMLUnknownElement , {
  children : {
    ['button']
  }
}>;

export type ButtonContentTextElement = CustomElement<HTMLParagraphElement , {

}>

export type ButtonContentElement = CustomElement<HTMLButtonElement , {
  children : {
    ['icon'] : {},
    ['controls'] : {},
    ['text'] : ButtonContentTextElement
  }
}>

export const ButtonPatern = DesignSystem().register('thorium' , {
  baseName : 'button',
  attr : {},
  childrens : [<PaternArea></PaternArea>],
  proto : {},
  __getter__ : {
    buttonElement : (target:ButtonElement | undefined):ButtonContentElement => {
      let [button] = (target as ButtonElement).children;
      return button as ButtonContentElement;
    },
    textElement : (target:ButtonElement | undefined):ButtonTextElement => {
      return (target as ButtonElement).buttonElement.children['text'];
    },
    text : (target:ButtonElement | undefined) => {
      return (target as ButtonElement).textElement.innerText;
    }
  },
  __setter__ : {
    text : ( value:string , target:ButtonElement | undefined ) => {
      (target as ButtonElement).textElement.innerText = value;
    }
  },
});

export const ButttonConnector = ButtonPatern.connector<any>();

export const Button = (props:ButtonProps):ButtonElement => {

  return <ButttonConnector
    attr = {{class : style.ButtonContainer}}
    childrens={[
      <button 
        id = { (props.id ? props.id : null) }
        part = "button"
        _onmousedown = {(props.action ? props.action : null)}
        _icon = {getButtonIcon}
        _controls = {getButtonControls}
        class = {( props.className ? `${style.Button} ${props.className}` : style.Button)}
        childrens = {[
          ( 'icon' in props && props.icon ? <Icon type = { props.icon.type } path={ props.icon.path } /> : null ),
          ( props.textContent ? <p name = "text" part = "text" class = { style.ButtonText } _textContent = {props.textContent} /> : null ),
          ( 'pageLink' in props && props.pageLink ? <PageLink to = { props.pageLink.to } title={ props.pageLink.title } /> : null),
          ( 'controls' in props && props.controls ? <Controls buttons = {props.controls} /> : null ),
        ]}
        _afterMounting = {(target) => {

          if(props._afterMounting)props._afterMounting(target);

        }}
      >
      </button>
    ]}
  />;

}
