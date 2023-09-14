import { NodeTemplate } from 'thorium-framework';
import { Icon , IconProps } from '../icon'
import style from './style.module.css';

export type ControlsProps = {
  buttons:any[];
}

export const Controls = (props:ControlsProps) => {
  console.log({props : props});
  return <div name = "controls" childrens = {props.buttons} >{props.buttons}</div>
}

export type ButtonProps = {
  textContent?:string;
  action?(event:MouseEvent):void;
  icon?:IconProps;
  controls?:ControlsProps['buttons'],
  className?:string;
};

export const Button = (props:ButtonProps) => {
  console.log('Button',{props});
  return <button 
      _onmousedown = {(props.action ? props.action : null)}
      class = {( props.className ? `${style.Button} ${props.className}` : style.Button)}
      childrens = {[
        ( 'icon' in props && props.icon ? <Icon type = { props.icon.type } path={ props.icon.path } /> : null ),
        ( 'controls' in props && props.controls ? <Controls buttons = {props.controls} /> : null )
      ]}
    >
    <p 
      class = { style.ButtonText }
      _textContent = {props.textContent}
    />
  </button>

}
