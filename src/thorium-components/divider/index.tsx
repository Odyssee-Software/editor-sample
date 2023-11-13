import style from './style.module.css';

import { CustomElement } from 'thorium-framework';

export type DividerElement = CustomElement<HTMLDivElement , {}>

export const Divider = ():DividerElement => {
  return <div class = { style.Divider } ></div>
}