import { HelloWorld } from "@components/editor";
import { SideSheet } from "@components/side-sheet";

import style from './style.module.css';

export const Workspace = () => {
  return <div class = {style.Workspace} >
    <SideSheet/>
    <HelloWorld/>
  </div>
}