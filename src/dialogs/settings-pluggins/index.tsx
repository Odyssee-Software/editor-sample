import { DOM } from 'thorium-framework'
import { 
  ThoriumButton,
  ThoriumDataGrid
} from 'thorium-components'
import { CustomElement } from 'thorium-framework';

import { OpenDialog } from '../openDialog';
import { useApplication , ApplicationContext } from '@context/index'

export function openPlugginsSettings(){

  let app = useApplication<ApplicationContext>();
  let plugins = Object.values( (app.plugins as any).value).reduce(( result:any[] , plugin:any ) => {

    result.push({ 
      name : plugin.title , 
      type : plugin.type , 
      'import options' : plugin.import?.length || 0 , 
      'export options' : plugin.export?.length || 0 
    });

    return result;
  } , []);

  return OpenDialog({
    header : <div><h1>Pluggins</h1></div>,
    content : <div>
      <ThoriumDataGrid rowsData={plugins} style = {{ color : "black" }} ></ThoriumDataGrid>
    </div>,
    footer : <div style = {{display : 'inline-flex' , justifyContent : "flex-end" , gap : "10px" , padding : "10px"}}>
      <ThoriumButton appearance="accent" >Create your own Pluggin</ThoriumButton>
    </div>
  })

}