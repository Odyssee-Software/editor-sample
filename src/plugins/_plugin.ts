import { ToolConstructable, ToolSettings } from "@editorjs/editorjs";

interface IEditorPlugin{
  title:string;
  type:string;
  import:any[];
  export:any[];
  blocks:Record<string,(ToolConstructable|ToolSettings)>
}

export class _plugin implements IEditorPlugin{

  get title():string { return '' };
  get type(): string{ return '' };
  get import():any[] { return [] as any[] };
  get export():any[] { return [] as any[] };
  get blocks():Record<string,(ToolConstructable|ToolSettings)> { return {} };

  constructor(){

  }

}

export type EditorPlugin = Partial<IEditorPlugin> & typeof _plugin & Partial<typeof _plugin> & _plugin;