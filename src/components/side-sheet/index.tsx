import style from './style.module.css';
import { CustomElement, DOM, Page } from 'thorium-framework'
import { Button } from '../button';
import { Divider } from '../divider';
import { Icon } from '../icon';

import { useState } from 'thorium-framework';

import * as path from 'path';

import OptionsIcon from '@fluentui/svg-icons/icons/options_20_filled.svg';
import CloseIcon from '@fluentui/svg-icons/icons/arrow_previous_20_filled.svg';
import PageIcon from '@fluentui/svg-icons/icons/document_20_filled.svg';

import { 
  findAllPages , 
  findPage 
} from '../../modules/database';

import { editorState } from '../editor'

type PageParams = {
  id:string;
  name:string;
}

const PageControl = (page:PageParams) => {
  return <div class = {style.PageControl} >
    <Button 
      textContent={page.name} 
      icon={{ type : 'mask' , path : path.join( 'app' , path.basename(PageIcon) ) }}
      controls={[
        // <Button icon={{ type : 'mask' , path : path.join( 'app' , path.basename(PageIcon) ) }} />
      ]}
      action = {async () => {

        let { value:editor } = editorState;
        let { detail:pageResult } = await findPage( { _id : page.id } );
        let [ pageSettings ] = pageResult as any[];
        let { content } = pageSettings;
        if(editor)editor.render(content);

      }}
    />
  </div>;
}

const SideSheetContent = (props:{}) => {

  return <div class = { style.SideSheetContent }>
    <div>
      <h3>section a</h3>
    </div>
    <Divider/>
    <div>
      <h3>section b</h3>
      <div
        _afterMounting = {async (target:CustomElement<HTMLDivElement , {}>) => {

          let { detail:pages } = await findAllPages<{name:string,_id:string}[]>();

          for await( const page of pages ){
            DOM.render( <PageControl
              id = { page._id } 
              name = {page.name}
            /> , target );
          }
          
        }}
      />
    </div>
    <Divider/>
    <div>
      <h3>section c</h3>
    </div>
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
    <Button textContent='A' icon = {{ type : 'mask' , path : path.join( 'app' , path.basename(OptionsIcon) ) }} />
    <Button textContent='B'/>
    <Button textContent='C'/>
    <Button 
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