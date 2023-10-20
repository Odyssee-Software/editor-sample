import { CustomElement } from "thorium-framework";
import { CustomElementDefultProps } from "..";

import { ButtonElement } from '@thorium-components/button';
import { DividerElement } from '@thorium-components/divider';

import style from './style.module.css';

export type ContextualMenuElement = CustomElement<HTMLDivElement , {

} >

export type ContextualMenuProps = { 
  target:Element,
  position:'top'|'right'|'bottom'|'left';
  childrens : ButtonElement|DividerElement[];
  afterMouning?(target:CustomElement<HTMLDivElement , {}>):void;
} & CustomElementDefultProps;

export const ContextualMenu = ( props:ContextualMenuProps ):ContextualMenuElement => {

  let positionElement = props.target.getBoundingClientRect();

  let { position } = props;
  let top;
  let left;
  let transform;

  if( position == 'top' ){
    top = positionElement.top;
    left = positionElement.left + (positionElement.width / 2);
    transform = 'transform:translate(-50% , -100%);';
  }
  else if(position == 'right'){
    top = positionElement.top + ( positionElement.height / 2 );
    left = positionElement.left + positionElement.width;
    transform = 'transform:translate(0 , -50%);'
  }
  else if( position == 'bottom' ){
    top = positionElement.top + positionElement.height;
    left = positionElement.left + (positionElement.width / 2);
    transform = 'transform:translate(-50% , 0);';
  }
  else if( position == 'left' ){
    top = positionElement.top + ( positionElement.height / 2 );
    left = positionElement.left;
    transform = 'transform:translate(-100% , -50%);';
  }

  let injectStyle = `left:${left}px;top:${top}px;${transform}`;

  return <div name = 'contextual-menu-container' context = 'contextual-menu-container' class = {style.ContextualMenuContainer} style = {injectStyle} >
    <div name = 'contextual-menu' childrens = {props.childrens} class = {style.ContextualMenu} position={position} _afterMounting = {( props.afterMouning ? props.afterMouning : null )} />
  </div>;

}