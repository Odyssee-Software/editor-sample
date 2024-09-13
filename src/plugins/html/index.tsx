import { _plugin } from '../_plugin';

import { CodeEditor } from './blocks/code-editor';

class _ExportHTMLPlugin{

  static get title(){ return 'HTML'; }

}

export class HTML extends _plugin{

  static get title(){ return 'HTML' }
  static get type(){ return 'html' }
  static get import(){
    return [];
  }
  static get export(){
    return [
      _ExportHTMLPlugin
    ]
  }
  static get blocks(){
    return {
      'code editor' : CodeEditor
    };
  }
  static id = crypto.randomUUID();

  get title(){ return HTML.title };
  get type(){ return HTML.type };
  get import(){ return HTML.import };
  get export(){ return HTML.export };
  get blocks(){ return HTML.blocks };
  get id(){ return HTML.id };

  constructor(  ){
    super();
  }

}