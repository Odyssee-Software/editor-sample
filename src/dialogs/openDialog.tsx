import { DOM, Fragment, JSXNodeTemplate } from 'thorium-framework'
import {openDialog} from "web-dialog";

export function OpenDialog( props:{ 
  header?:any , 
  content?:any , 
  footer?:any 
} ){

  return openDialog({
    $content : DOM.render( <template style={{
      height: "100%",
      width: "100%",
      display : "grid",
      gridTemplateRows : "min-content minmax(0,1fr) min-content",
      gap : "10px"
    }}>
    {[
      props.header ? <header style = {{ borderBottom : '1px solid lightgray' , display : 'grid' , padding : "10px" }}>
        {[props.header]}
      </header> : null,
      props.content ? <article style = {{ padding : "10px" }}>
        {[props.content]}
      </article> : null,
      props.footer ? <footer style = {{ borderTop : '1px solid lightgray' , display : 'grid' , padding : "10px" }}>
        {[props.footer]}
      </footer> : null
    ]}
    </template>).element as any

  })

}