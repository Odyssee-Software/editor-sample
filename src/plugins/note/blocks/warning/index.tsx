import { CustomElement, DOM , useState } from 'thorium-framework';
import { storeContext } from 'thorium-framework/modules/context';
import style from './style.module.css';

export class Warning {

  context = storeContext().getContextByName('workbench')[0]
  valueStateManager = this.context.set<string>( crypto.randomUUID() , "" );
  typeStateManager = this.context.set<'message' | 'warning' | 'alert'>( crypto.randomUUID() , 'message');
  // get valueState(){ return this.valueStateManager[0] };
  // get value(){ return this.valueStateManager[0].value };
  // get setValue(){ return this.valueStateManager[1] };

  constructor(){

  }

  static get settings(){
    return {
      message : 'mettez un message'
    }
  }

  static get toolbox() {
    return {
      title: 'Warning',
      icon : '⚠️'
      // icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
    };
  }

  render(){

    return this["setElement"]( DOM.render( <div className = { style.MessageContainer } >
      <input 
        type = "message"
        _afterMounting = {( target:CustomElement< HTMLInputElement , {} > ) => {

          this.valueStateManager[0].subscribe( this['parentElement'] , ( newValue ) => {
            target.value = String(newValue);
            return newValue;
          } )

          this.typeStateManager[0].subscribe( this['parentElement'] , (newType) => {
            target.setAttribute('type' , newType);
            return newType;
          })

          this.valueStateManager[1]( Warning.settings.message );

        }}
        _onkeyup = {(event:Event) => {

          let target = event.target as CustomElement< HTMLInputElement , {} >;
          this.valueStateManager[1]( target.value );

        }}
      />
    </div> ) );

  }

  renderSettings( props ){

    let block = this['block'];
    let { settings , config } = props;

    if(settings){

      return <div>
        <nav>
          <h1 _textContent = { String(block.name).toUpperCase() } />
        </nav>
        <div>
          <label _textContent = { 'content' } />
          <input
            value  = { this.valueStateManager[0] as any }
            _afterMounting = {( target:CustomElement<HTMLInputElement , {}> ) => {

              this.valueStateManager[0].subscribe( this['parentElement'] , ( newValue ) => {
                target.value = String(newValue);
                return newValue;
              })

            }}
            _onkeyup = {(event:Event) => {

              let target = event.target as CustomElement<HTMLInputElement , {}>;
              this.valueStateManager[1]( target.value )

            }}
          />
        </div>
        <div>
          <label _textContent = "type" />
          <select
            value = { this.typeStateManager[0] as any }
            _onchange = {(event:Event) => {

              let target = event.target as CustomElement< HTMLSelectElement , {} >;
              this.typeStateManager[1]( target.value as any )

            }}
          >
            <option value = "message" _textContent = "message"></option>
            <option value = "warning" _textContent = "warning"></option>
            <option value = "alert" _textContent = "alert"></option>
          </select>
        </div>
      </div>;

    }

  }

  save(blockContent){
    return {
      url: blockContent.value
    }
  }

}