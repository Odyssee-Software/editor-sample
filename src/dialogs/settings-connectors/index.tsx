import { DOM } from 'thorium-framework'
import { 
  ThoriumButton
} from 'thorium-components'
import { CustomElement } from 'thorium-framework';

import { OpenDialog } from '../openDialog';

export function openConnectorsSettings(){

  return OpenDialog({
    header : <div><h1>Connectors</h1></div>,
    content : <div>This is some content for the dialog!</div>,
    footer : <div style = {{display : 'inline-flex' , justifyContent : "flex-end" , gap : "10px" , padding : "10px"}}>
      <ThoriumButton appearance="accent" >Create your own connector</ThoriumButton>
    </div>
  })

}