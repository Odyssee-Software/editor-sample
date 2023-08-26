import { NodeTemplate } from 'thorium-framework';
import { Icon , IconProps } from '../icon'
import style from './style.module.css';

export const Button = (props:{
  textContent:string
  action?(event:MouseEvent):void;
}) => {

  return <button class = {style.Button}>
    <p 
      class = { style.ButtonText }
      _textContent = {props.textContent}
      _onmousedown = {(props.action ? props.action : null)}
    />
  </button>

}

export const ButtonIcon = (props:{
  textContent?:string
  action?(event:MouseEvent):void;
  icon:IconProps;
}) => {

  return <button class = {style.Button}
    _onmousedown = {(event) => {
      (props.action ? props.action(event) : null)
    }}
  >
    <Icon type = { props.icon.type } path={ props.icon.path } />
    <p 
      class = { style.ButtonText }
      _textContent = {( props && props.textContent ? props.textContent : '' )}
    />
  </button>

}

