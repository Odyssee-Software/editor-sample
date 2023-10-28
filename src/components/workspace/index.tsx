import { HelloWorld } from "@components/editor";
import { NoteEditor , NoteEditorProps , createNoteEditorBlock , configureNoteEditorBlock , NoteEditorBlockConf } from "@components/note-editor";
import { SideSheet , _SideSheet } from "@components/side-sheet";
import { CustomElement, useState , State } from 'thorium-framework';

import style from './style.module.css';

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

export class _Editor{

}

export class _Workspace{

  element:WorkspaceElement;
  get container(){ return this.element.parentElement }
  sideSheetManager:[State<_SideSheet> , ( value:_SideSheet ) => _SideSheet];
  editorManager:[State<_Editor> , ( value:_Editor ) => _Editor];

  get sideSheet(){ return this.sideSheetManager[0].value }
  get editor(){ return this.editorManager[0].value }

  constructor( props:{
    ref:WorkspaceElement,
    sideSheetManager:[State<_SideSheet> , ( value:_SideSheet ) => _SideSheet]
    editorManager:[State<_Editor> , ( value:_Editor ) => _Editor]
  } ){

    this.element = props.ref;
    this.sideSheetManager = props.sideSheetManager;
    this.editorManager = props.editorManager;

  }

}

export type WorkspaceElement = CustomElement<HTMLDivElement , _Workspace>;

export interface WorkspaceProps{

  pluginPages?:any;
  pluginBlocks:NoteEditorProps['plugins'];

}

export const Workspace = ( props:WorkspaceProps ) => {

  const workspaceManager = useState< _Workspace | null >( null )
  const sideSheetManager = useState<_SideSheet>(_SideSheet);
  const editorManager = useState<_Editor>(_Editor);

  return <div class = {style.WorkspaceContainer} >
    <div
      class = {style.Workspace}
      _afterMounting = {(target:CustomElement<HTMLDivElement , {}>) => {

        let [ state , setState ] = workspaceManager;
        setState( new _Workspace({
          ref : target as WorkspaceElement,
          sideSheetManager,
          editorManager
        }) );

      }}
    >
      <SideSheet 
        sideSheetManager = { sideSheetManager } 
      />
      <NoteEditor
        noteEditorManager = { editorManager }
        plugins={ props.pluginBlocks }
      />
    </div>
    {/* <HelloWorld/> */}
  </div>
}