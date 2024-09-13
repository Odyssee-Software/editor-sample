import { DOM } from 'thorium-framework'
import { 
  ThoriumButton,
  ThoriumBadge,
  ThoriumTextField
} from 'thorium-components'
import { CustomElement , useState , pageContext } from 'thorium-framework';
import { useContext } from 'thorium-framework/modules/context';

import { OpenDialog } from '../openDialog';
import { useApplication , ApplicationContext , GlobalInterface } from '@context/index'

export function openCurrentPageSettings(){

  let app = useApplication<ApplicationContext>();

  let global = useContext<GlobalInterface>( pageContext["value"] );

  global.pageEdition = true;

  let page = app.pagePointer;

  return OpenDialog({
    header : <div><h1>Page</h1></div>,
    content : <div>
      {[ app.pagePointer?.value == null ? <h1>Pas de page sélectionnée</h1> : <div>
        <div>
          <div style = {{ display : "grid" , gridTemplateColumns : "1fr" }} >
            <div style = {{ display : "grid" , gridColumn : 1 , gridRow : 1 }} >
              <ThoriumTextField value = {page?.name} disabled = {global.pageEdition as any} />
            </div>
            <div style = {{ display : "grid" , alignItems : "flex-end" , gridColumn : 1 , gridRow : 1 , zIndex : 2 , pointerEvents : "none" }}>
              <ThoriumButton text = "&#9998;" onmousedown={() => { global.pageEdition = global.pageEdition["value"] ? false : true } } style = {{ height : "30px" , margin : "auto 10px auto auto" , pointerEvents : "all" }} />
            </div>
          </div>
          <h1 text = {page?.name} />
          <ThoriumBadge text = {page?.type} />
        </div>
        <div>
          <span text = { `blocks : ${page?.content.blocks.length}` } />
        </div>
      </div> ]}
    </div>
  })

}