import { NodeTemplate } from 'thorium-framework';
import { Icon } from '../icon'
import style from './style.module.css';

export const Button = (props:{
  textContent:string
  action?(event:MouseEvent):void;
  icon?:string;
}) => {

  return <button class = {style.Button}>
    <p 
      class = { style.ButtonText }
      _textContent = {props.textContent}
      _onmousedown = {(props.action ? props.action : null)}
    />
  </button>

}