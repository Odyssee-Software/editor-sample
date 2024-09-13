import { DOM , CustomElement , INodeTemplate , useState , pageContext } from "thorium-framework";
import { IStoreState , useContext } from "thorium-framework/modules/context";
import styles from './style.module.css';

import { ThoriumButton } from "thorium-components";
import { Input } from "@thorium-components/input";

export type IInspectorElement = CustomElement<HTMLDivElement , {
  header():CustomElement<HTMLDivElement , {}>;
  content():CustomElement<HTMLDivElement , {}>;
  render( template:INodeTemplate<any> ):void;
  show():void;
  hide():void;
  children:{
    header : CustomElement<HTMLDivElement , {}>;
    content : CustomElement<HTMLDivElement , {}>;
  };
}>

export const Inspector = () => {

  const context = useContext( pageContext.value ).extends( 'inspector' );

  const [ inspector , setInspector ] = useContext( context ).set<IInspectorElement | null>( 'inspector' , null );
  const [ idleState , setIdleState] = useContext( context ).set< 'true' | 'false' >( 'idle-state' , 'false' );
  const [ keepOpen , setKeepOpen ] = useContext( context ).set< boolean >( 'keep-open' , false );

  // let [inspector , setInspector] = useState<IInspectorElement | null>( null );
  // let [idleState , setIdleState] = useState< 'true' | 'false' >( 'false' );
  // let [keepOpen , setKeepOpen] = useState<boolean>( false );
  
  return (<div 
    context = "inspector"
    className = {styles.Inspector}
    // show = {idleState.value}
    // _header = {function(this:IInspectorElement){ return this.children.header;}}
    // _content = {function(this:IInspectorElement){ return this.children.content;}}
    _afterMounting = {( target:IInspectorElement ) => { 

      idleState.subscribe( target , ( newValue ):any => {
        if(newValue == 'false' && keepOpen.value == true)return ;
        else target.setAttribute('show' , `${newValue}`);
      })

      setInspector(target); 
    }}
    // _show = {function(this:IInspectorElement){ setIdleState('true') }}
    // _hide = {function(this:IInspectorElement){ setIdleState('false') }}
    // _render = {( template:INodeTemplate<any> ) => {

    //   console.log( { template } )

    //   if(inspector){

    //     for(let e of [...(inspector as any).content().children].reverse()){ e.remove() }
    //     DOM.render( template , inspector.content() );

    //   }

    // }}
  >
    <div name = "header" context = "header" >
      <div name = "switch" >
        <label >Garder ouvert :</label>
        <input 
          type="range" 
          min = "0" 
          max = "1" 
          value = "0"
          _onchange = {( event:Event ) => {

            let target = event.target as CustomElement<HTMLInputElement , {}>;
            if(target.value == '0')setKeepOpen(false);
            else if(target.value == '1')setKeepOpen(true);

          }}
        />
      </div>
      <ThoriumButton 
        textContent="&#10539;" 
        onmousedown = {() => {
          if(inspector.value)inspector.value.hide()
        }}
      />
    </div>
    <div name = "content" context = "content" ></div>
  </div>);

}