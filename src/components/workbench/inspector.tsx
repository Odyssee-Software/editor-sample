import { DOM , CustomElement , NodeTemplate , useState , pageContext } from "thorium-framework";
import { IStoreState } from "thorium-framework/modules/context";
import styles from './style.module.css';

import { Button } from "@thorium-components/button";
import { Input } from "@thorium-components/input";

export type IInspectorElement = CustomElement<HTMLDivElement , {
  header():CustomElement<HTMLDivElement , {}>;
  content():CustomElement<HTMLDivElement , {}>;
  render( template:NodeTemplate<any> ):void;
  show():void;
  hide():void;
  children:{
    header : CustomElement<HTMLDivElement , {}>;
    content : CustomElement<HTMLDivElement , {}>;
  };
}>

export const Inspector = () => {

  const context = pageContext().extends( 'inspector' );

  const { state:inspector, setter:setInspector } = context.set<IInspectorElement | null>( 'inspector' , null ) as IStoreState<IInspectorElement>;
  const { state:idleState , setter:setIdleState } = context.set< 'true' | 'false' >( 'idle-state' , 'false' )  as IStoreState<'true' | 'false'>;
  const { state:keepOpen , setter:setKeepOpen } = context.set< boolean >( 'keep-open' , false ) as IStoreState<boolean>;

  // let [inspector , setInspector] = useState<IInspectorElement | null>( null );
  // let [idleState , setIdleState] = useState< 'true' | 'false' >( 'false' );
  // let [keepOpen , setKeepOpen] = useState<boolean>( false );
  
  return (<div 
    context = "inspector"
    class = {styles.Inspector}
    show = {idleState.value}
    _header = {function(this:IInspectorElement){ return this.children.header;}}
    _content = {function(this:IInspectorElement){ return this.children.content;}}
    _afterMounting = {( target:IInspectorElement ) => { 

      idleState.subscribe( target , ( newValue ):any => {
        if(newValue == 'false' && keepOpen.value == true)return ;
        else target.setAttribute('show' , `${newValue}`);
      })

      setInspector(target); 
    }}
    _show = {function(this:IInspectorElement){ setIdleState('true') }}
    _hide = {function(this:IInspectorElement){ setIdleState('false') }}
    _render = {( template:NodeTemplate<any> ) => {

      if(inspector.value){
        for(let e of [...inspector.value.content().children].reverse()){ e.remove() }
        DOM.render( template , inspector.value.content() );
      }

    }}
  >
    <div name = "header" context = "header" >
      <div name = "switch" >
        <label >Garder ouvert :</label>
        {/* <Input 
          type = "range" 
          min = "0" 
          max = "0" 
          value = "0"
          onchange = {(event) => {
            let target = event.target as CustomElement<HTMLInputElement , {}>;
            if(target.value == '0')setKeepOpen(false);
            else if(target.value == '1')setKeepOpen(true);
          }}
        /> */}
        <input 
          type="range" 
          min = "0" 
          max = "1" 
          _value = "0"
          _onchange = {( event:Event ) => {

            let target = event.target as CustomElement<HTMLInputElement , {}>;
            if(target.value == '0')setKeepOpen(false);
            else if(target.value == '1')setKeepOpen(true);

          }}
        />
      </div>
      <Button 
        textContent="&#10539;" 
        action = {() => {
          if(inspector.value)inspector.value.hide()
        }}
      />
    </div>
    <div name = "content" context = "content" ></div>
  </div>);

}