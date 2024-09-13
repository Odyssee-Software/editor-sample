import { DOM } from 'thorium-framework'
import { 
  ThoriumButton
} from 'thorium-components'
import { CustomElement } from 'thorium-framework';

import { OpenDialog } from '../openDialog';

export function openEditorSettings(){

  return OpenDialog({
    header : <div><h1>Settings</h1></div>,
    content : <div>This is some content for the dialog!</div>,
  })

}