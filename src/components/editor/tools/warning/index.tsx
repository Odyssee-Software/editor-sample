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

    return this["setElement"]( DOM.render( <div class = { style.MessageContainer } >
      <input 
        type = "message"
        _afterMounting = {( target:CustomElement< HTMLInputElement , {} > ) => {

          this.valueStateManager.state.subscribe( this['parentElement'] , ( newValue ) => {
            target.value = String(newValue);
            return newValue;
          } )

          this.typeStateManager.state.subscribe( this['parentElement'] , (newType) => {
            target.setAttribute('type' , newType);
            return newType;
          })

          this.valueStateManager.setter( Warning.settings.message );

        }}
        _onkeyup = {(event:Event) => {

          let target = event.target as CustomElement< HTMLInputElement , {} >;
          this.valueStateManager.setter( target.value );

        }}
      />
    </div> ) );

  }

  renderSettings( props ){

    let { settings , config } = props;

    if(settings){

      return <div>
        <div>
          <label _textContent = { 'content' } />
          <input
            _value  = { this.valueStateManager.state }
            _afterMounting = {( target:CustomElement<HTMLInputElement , {}> ) => {

              this.valueStateManager.state.subscribe( this['parentElement'] , ( newValue ) => {
                target.value = String(newValue);
                return newValue;
              })

            }}
            _onkeyup = {(event:Event) => {

              let target = event.target as CustomElement<HTMLInputElement , {}>;
              this.valueStateManager.setter( target.value )

            }}
          />
        </div>
        <div>
          <label _textContent = "type" />
          <select
            _value = { this.typeStateManager.state }
            _onchange = {(event:Event) => {

              let target = event.target as CustomElement< HTMLSelectElement , {} >;
              this.typeStateManager.setter( target.value as any )

            }}
          >
            <option _value = "message" _textContent = "message"></option>
            <option _value = "warning" _textContent = "warning"></option>
            <option _value = "alert" _textContent = "alert"></option>
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