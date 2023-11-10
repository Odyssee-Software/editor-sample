// import { HelloWorld } from "@components/editor";
import { Workbench , WorkbenchProps , createNoteEditorBlock , configureNoteEditorBlock , NoteEditorBlockConf , IEditor, _Workbench } from "@components/workbench";
import { SideSheet , _SideSheet } from "@components/side-sheet";
import { CustomElement, useState , pageContext } from 'thorium-framework';

import style from './style.module.css';
import { storeContext } from "thorium-framework/modules/context";

export const APPAPI = {

  Workspace:() => {

    return {

      SideSheet : () => {

        return {

        }

      },
      Editor : () => {

        return {

        }

      }

    }

  }

}

export class _Workspace{

  element:WorkspaceElement;
  get container(){ return this.element.parentElement }
  workbenchManager;
  get workbench(){ return this.workbenchManager.state }
  set workbench( value ){ this.workbenchManager.setter( value ) }
  get states(){
    return {
      workbench : this.workbenchManager[0]
    }
  }

  constructor( props:{
    ref:WorkspaceElement,
    workbenchManager
  } ){

    this.element = props.ref;
    this.workbenchManager = props.workbenchManager;

  }

}

export type WorkspaceElement = CustomElement<HTMLDivElement , _Workspace>;

export interface WorkspaceProps{

  pluginPages:any[];
  pluginBlocks:WorkbenchProps['plugins'];

}

export const WorkspaceContext = () => {
  storeContext().getContextByName('workspace');
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