import { HelloWorld } from "../editor";
import { SideSheet } from "../side-sheet";

import style from './style.module.css';

export const Workspace = () => {
  return <div class = {style.Workspace} >
    <SideSheet/>
    <HelloWorld/>
  </div>
}