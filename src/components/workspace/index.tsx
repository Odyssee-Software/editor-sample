// import { HelloWorld } from "@components/editor";
import { Workbench , WorkbenchProps , createNoteEditorBlock , configureNoteEditorBlock , NoteEditorBlockConf , IEditor, _Workbench } from "@components/workbench";
import { SideSheet , _SideSheet } from "@components/side-sheet";
import { CustomElement, useState , pageContext } from 'thorium-framework';

import style from './style.module.css';
import { storeContext } from "thorium-framework/modules/context";

export interface WorkspaceProps{

  pluginPages:any[];
  pluginBlocks:WorkbenchProps['plugins'];

}

export const Workspace = ( props:WorkspaceProps ) => {

  const workspaceContext = pageContext().extends( 'workspace' );

  return <div class = {style.WorkspaceContainer} >
    <div
      class = {style.Workspace}
      _afterMounting = {(target:CustomElement<HTMLDivElement , {}>) => {
        console.log({ API : workspaceContext })
      }}
    >
      <SideSheet 
        pluginPages = { props.pluginPages }
      />
      <Workbench
        plugins={ props.pluginBlocks }
      />
    </div>
  </div>
}