// import { HelloWorld } from "@components/editor";
import { Workbench , WorkbenchProps , createNoteEditorBlock , configureNoteEditorBlock , NoteEditorBlockConf , IEditor, _Workbench } from "@components/workbench";
import { SideSheet , _SideSheet } from "@components/side-sheet";
import { CustomElement, useState } from 'thorium-framework';
import { pageContext , useContext } from 'thorium-framework/modules/context';

import style from './style.module.css';
import { storeContext } from "thorium-framework/modules/context";

export interface WorkspaceProps{

  pluginPages:any[];
  pluginBlocks:WorkbenchProps['plugins'];

}

export const Workspace = ( props:WorkspaceProps ) => {

  console.log({ pageContext : pageContext.value , context : useContext( pageContext.value ) })

  const workspaceContext = useContext( pageContext.value ).extends( 'workspace' );

  return <div className = {style.WorkspaceContainer} >
    <div
      className = {style.Workspace}
      _afterMounting = {(target:CustomElement<HTMLDivElement , {}>) => {
        console.log({ API : workspaceContext })
      }}
    >
      <SideSheet 
        pluginPages = { props.pluginPages }
      />
      <Workbench/>
    </div>
  </div>
}