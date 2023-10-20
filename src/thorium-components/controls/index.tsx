import { CustomElement } from "thorium-framework";
import styles from './controls.module.css';

export type ControlsProps = {
  buttons:any[];
};

export type ControlsElement<Children = Record<string , CustomElement<Element,{}>>> = CustomElement< HTMLDivElement , {
  name:"controls";
  children:Children
} >

export const Controls = (props:ControlsProps):ControlsElement => {
  return <div name = "controls" class = {styles.Controls} childrens = {props.buttons} >{props.buttons}</div>
}