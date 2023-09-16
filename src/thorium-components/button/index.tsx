import { CustomElement } from 'thorium-framework';
import { Icon , IconProps , IconContainerElement} from '../icon'
import style from './style.module.css';

import { CustomElementDefultProps } from '../../components'

export type ControlsProps = {
  buttons:any[];
};

export type ControlsElement<Children = Record<string , CustomElement<Element,{}>>> = CustomElement< HTMLDivElement , {
  name:"controls";
  children:Children
} >

export const Controls = (props:ControlsProps):ControlsElement => {
  return <div name = "controls" childrens = {props.buttons} >{props.buttons}</div>
}

export type ButtonTextElement = CustomElement<HTMLParagraphElement , {}>;

export type ButtonElement< ControlsChildren = Record<string , CustomElement<Element,{}>> > = CustomElement<HTMLButtonElement , {
  controls():ControlsElement<ControlsChildren>;
  icon():IconContainerElement;
  children:{
    icon?:IconContainerElement;
    controls?:ControlsElement<ControlsChildren>;
    text?:ButtonTextElement;
  }
}>

export type ButtonProps = {
  textContent?:string;
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

export const Button = (props:ButtonProps):ButtonElement => {

  return <button 
      _onmousedown = {(props.action ? props.action : null)}
      _icon = {getButtonIcon}
      _controls = {getButtonControls}
      class = {( props.className ? `${style.Button} ${props.className}` : style.Button)}
      childrens = {[
        ( 'icon' in props && props.icon ? <Icon type = { props.icon.type } path={ props.icon.path } /> : null ),
        ( 'controls' in props && props.controls ? <Controls buttons = {props.controls} /> : null )
      ]}
    >
    <p 
      name = 'text'
      class = { style.ButtonText }
      _textContent = {props.textContent}
    />
  </button>

}
