import { _plugin } from '../_plugin';

export class GPT extends _plugin {

  static get title(){ return 'GPT' }
  static get type(){ return 'gpt' }
  static get import(){
    return [];
  }
  static get export(){
    return [];
  }
  static get blocks(){
    return {};
  }
  static id = crypto.randomUUID();

  get title(){ return GPT.title };
  get type(){ return GPT.type };
  get import(){ return GPT.import; }
  get export(){ return GPT.export };
  get blocks(){ return GPT.blocks };
  get id(){ return GPT.id };

  constructor(  ){
    super();
  }

}