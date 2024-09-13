import { ToolConstructable, ToolSettings } from '@editorjs/editorjs';
import { _plugin } from '../_plugin';

import { Header1 } from './blocks/header1';
import { Header2 } from './blocks/header2';
import { Header3 } from './blocks/header3';
import { Console } from './blocks/console';
import { Warning } from './blocks/warning';
import { Alert } from './blocks/alert';

class _ExportPDFPlugin{

  static get title(){ return 'PDF'; }

}

class _ImportMDPlugin{

  static get title(){ return 'Markdown' }

  constructor(){

  }

  static main(){

    alert('Markdown import custom process')

  }

}

export class Note extends _plugin{

  static get title(){ return "Notes" }
  static get type(){ return "note" }
  static get import(){
    return [
      _ImportMDPlugin
    ]
  }
  static get export(){ 
    return [
      _ExportPDFPlugin
    ]
  }
  static get blocks(){
    return {
      'h1' : Header1,
      'h2' : Header2,
      'h3' : Header3,
      'alert' : Alert,
      'warning' : Warning,
      'console' : Console,
    }
  }
  static id = crypto.randomUUID();

  get title(){ return Note.title };
  get type(){ return Note.type };
  get import(){ return Note.import; }
  get export(){ return Note.export };
  get blocks(){ return Note.blocks };
  get id(){ return Note.id };

  constructor(  ){
    super();
  }

}