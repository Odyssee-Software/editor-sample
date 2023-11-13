import { CustomElement } from 'thorium-framework';
import style from './style.module.css';

export type IconProps = {
  type : 'background' | 'mask';
  path : string;
}

export type IconElement = CustomElement<HTMLUnknownElement , {

}>

export type IconContainerElement = CustomElement<HTMLDivElement , {
  children : {
    icon : IconElement;
  }
}>

export const Icon = (props:IconProps) => {

  return <div style = { `--background:url(${props.path})`} class = { style.IconContainer } name = 'icon-container' >
    <icon name = 'icon' class = { ( props.type == 'mask' ? style.Iconmask : style.Iconbackground) } />
  </div>;

}