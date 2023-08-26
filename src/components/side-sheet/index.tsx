import style from './style.module.css';
import { CustomElement } from 'thorium-framework'
import { Button , ButtonIcon } from '../button';
import { Divider } from '../divider';
import { Icon } from '../icon';

import * as path from 'path';

import OptionsIcon from '@fluentui/svg-icons/icons/options_20_filled.svg'
import CloseIcon from '@fluentui/svg-icons/icons/arrow_previous_20_filled.svg'

const SideSheetContent = (props:{}) => {

  return <div class = { style.SideSheetContent }>
    <h3>section a</h3>
    <Divider/>
    <h3>section b</h3>
    <Divider/>
    <h3>section c</h3>
  </div>;

}

const SideSheetActionBar = () => {

  return <div class = { style.SideSheetActionBar }>
    <Button textContent='Action A'/>
    <Button textContent='Action B'/>
  </div>;

}

const SideSheetHeader = () => {

  return <div class = { style.SideSheetHeader }>
    <ButtonIcon textContent='A' icon = {{ type : 'mask' , path : path.join( 'app' , path.basename(OptionsIcon) ) }} />
    <Button textContent='B'/>
    <Button textContent='C'/>
    <ButtonIcon 
      icon = {{ type : 'mask' , path : path.join( 'app' , path.basename(CloseIcon) ) }} 
      action = {(event) => {
        let { target } = event;
        /* The line `let sideSheet = (target as CustomElement<any,{}>).context('side-sheet');` is
        retrieving the context of the custom element with the name 'side-sheet'. */
        let sideSheet = (target as CustomElement<any,{}>).context('side-sheet');
        sideSheet.close();
      }}
    />
  </div>;

}

const SideSheetHidener = () => {

  return <div class = { style.SideSheetHidener } >

  </div>;
  
}

export type TSideSheet = CustomElement<HTMLDivElement , {
  close():void;
}>

export const SideSheet = (props:{}) => {

  return <div class = { style.SideSheetContainer } close = "false" context = "side-sheet" 
    _close = {function(this:TSideSheet){
      let attribute = this.getAttribute('close');
      console.log(attribute);
      if(attribute && attribute == 'true')attribute = 'false';
      else if(attribute && attribute == 'false')attribute = 'true';
      this.setAttribute('close' , attribute as string);
    }}
  >
    <div class = { style.SideSheet } >
      <SideSheetHeader/>
      <Divider/>
      <SideSheetContent/>
      <Divider/>
      <SideSheetActionBar/>
    </div>
    <div 
      class = { style.SideSheetExpand }
      name = "expander"
      _onmousedown = {(event) => {
        let target:CustomElement<HTMLDivElement,{}> = event.target;
        target.context<TSideSheet>('side-sheet').close();
      }}
    >
    </div>
  </div>;

};