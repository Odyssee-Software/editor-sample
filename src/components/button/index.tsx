import { NodeTemplate } from 'thorium-framework';
import { Icon , IconProps } from '../icon'
import style from './style.module.css';

export type ControlsProps = {
  buttons:typeof Button[];
}

export const Controls = (props:ControlsProps) => {
  // return <div name = "controls" childrens = {props.buttons} ></div>
}

export type ButtonProps = {
  textContent?:string;
  action?(event:MouseEvent):void;
  icon?:IconProps;
  controls?:ControlsProps['buttons']
};

export const Button = (props:ButtonProps) => {

  return <button 
      _onmousedown = {(props.action ? props.action : null)}
      class = {style.Button}
      childrens = {[
        ( 'icon' in props && props.icon ? <Icon type = { props.icon.type } path={ props.icon.path } /> : <div></div> ),
        // ( 'controls' in props && props.controls ? <Controls buttons = {props.controls} /> : <div></div> )
      ]}
    >
    <p 
      class = { style.ButtonText }
      _textContent = {props.textContent}
    />
  </button>

}
