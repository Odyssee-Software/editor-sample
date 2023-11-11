import style from './style.module.css';
import { CustomElement, DOM, Page } from 'thorium-framework';
import { storeContext } from 'thorium-framework/modules/context';
import { Button , ButtonElement } from '@thorium-components/button';
import { Controls } from '@thorium-components/controls';
import { Divider } from '@thorium-components/divider';
import { Icon } from '@thorium-components/icon';
import { ContextualMenu } from '@components/contextual-menu';

import { OpenSpring } from '../../animations/spring';

import { useState , State } from 'thorium-framework/modules/states';

import { SideSheetHeader } from './header';
import { SideSheetContent } from './content';
import { SideSheetActionBar } from './action-bar';

import * as path from 'path';

import OptionsIcon from '@fluentui/svg-icons/icons/options_20_filled.svg';
import CloseIcon from '@fluentui/svg-icons/icons/arrow_previous_20_filled.svg';
import PageIcon from '@fluentui/svg-icons/icons/document_20_filled.svg';

import { 
  findAllPages , 
  findPage 
} from '@modules/database';

// import { EditorState } from '@components/editor'

export class _SideSheet{

  element:SideSheetElement;
  get container(){ return this.element.parentElement as CustomElement<HTMLDivElement , {}> }

  constructor(props:{
    ref:SideSheetElement
  }){

    this.element = props.ref;

  }

  close(){
    let attribute = this.container.getAttribute('close');
    if(attribute && attribute == 'true')attribute = 'false';
    else if(attribute && attribute == 'false')attribute = 'true';
    this.container.setAttribute('close' , attribute as string);
  }

  static afterMounting( manager ){

    return ( target ) => {

      return manager.sideSheet = new _SideSheet({
        ref : target
      });

    }

  }

}

export type SideSheetElement = CustomElement<HTMLDivElement , {
  close():void;
}>

export const SideSheet = (props:{
  pluginPages:any[];
}) => {

  const [workspace] =  storeContext().getContextByName( 'workspace' );
  const context = workspace.extends( 'sidesheet' );

  return <div class = { style.SideSheetContainer } close = "false" context = "side-sheet" 
    _close = {function(this:SideSheetElement){
      let attribute = this.getAttribute('close');
      if(attribute && attribute == 'true')attribute = 'false';
      else if(attribute && attribute == 'false')attribute = 'true';
      this.setAttribute('close' , attribute as string);
    }}
  >
    <div 
      class = { style.SideSheet } 
      // _afterMounting = { _SideSheet.afterMounting( props.manager ) }
    >
      <SideSheetHeader/>
      <Divider/>
      <SideSheetContent
        // manager = { props.manager }
        pluginPages = { props.pluginPages }
      />
      <Divider/>
      <SideSheetActionBar/>
    </div>
    <div 
      class = { style.SideSheetExpand }
      name = "expander"
      _onmousedown = {(event) => {
        let target:CustomElement<HTMLDivElement,{}> = event.target;
        target.context<SideSheetElement>('side-sheet').close();
      }}
    >
    </div>
  </div>;

};