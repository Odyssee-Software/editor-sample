import { DOM } from 'thorium-framework'
import { 
  ThoriumButton
} from 'thorium-components'
import { CustomElement } from 'thorium-framework';

import { OpenDialog } from '../openDialog';

export function openImportSettings(){

  return OpenDialog({
    header : <div><h1>Import</h1></div>,
    content : <div>This is some content for the dialog!</div>,
    footer : <div style = {{display : 'inline-flex' , justifyContent : "flex-end" , gap : "10px" , padding : "10px"}}>
      <ThoriumButton appearance="accent" >Import</ThoriumButton>
    </div>
  })

}