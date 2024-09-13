import style from './style.module.css';
import Thorium, { CustomElement, DOM, Page, applicationContext } from 'thorium-framework';
import { storeContext, useContext } from 'thorium-framework/modules/context';
import { Button , ButtonElement } from '@thorium-components/button';
import { Controls } from '@thorium-components/controls';
import { Divider } from '@thorium-components/divider';
import { Icon } from '@thorium-components/icon';
import { ContextualMenu } from '@components/contextual-menu';

import * as DatabaseService from 'editor-database-service/client/dist';

import { OpenSpring } from '../../animations/spring';

import { useState , State } from 'thorium-framework/modules/states';

import { SideSheetHeader } from './header';
import { SideSheetContent } from './content';
import { SideSheetActionBar } from './action-bar';

import { openSearchPageDialog } from '../../dialogs/search';
import { openEditorSettings } from '../../dialogs/settings-editor';
import { openPlugginsSettings } from '../../dialogs/settings-pluggins';
import { openConnectorsSettings } from '../../dialogs/settings-connectors';
import { openTemplatesSettings } from '../../dialogs/settings-templates';
import { openImportSettings } from '../../dialogs/settings-import';
import { openTrashSettings } from '../../dialogs/settings-trash';

import { 
  ThoriumMenu , 
  ThoriumMenuItem,
  ThoriumTreeView,
  ThoriumTreeItem,
  ThoriumPromise,
  ThoriumButton,
  ThoriumFlipper
} from 'thorium-components';

import * as path from 'path';

import OptionsIcon from '@fluentui/svg-icons/icons/options_20_filled.svg';
import CloseIcon from '@fluentui/svg-icons/icons/arrow_previous_20_filled.svg';
import PageIcon from '@fluentui/svg-icons/icons/document_20_filled.svg';

import { 
  findAllPages , 
  findPage 
} from '@modules/database';
import { useApplication } from '@context/index';

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

  let app = useApplication();
  let plugins = app.plugins;
  let pages = DatabaseService.findAllPages();

  console.log({ ici : <div>
    <ThoriumTreeView style={{ color : "white" , display : "grid" , gap : "4px" , padding : "5px" }}>
      {[
        <ThoriumTreeItem _onmousedown={openSearchPageDialog} >Search</ThoriumTreeItem>,
        <ThoriumTreeItem _onmousedown={openEditorSettings} >Settings</ThoriumTreeItem>,
        <ThoriumTreeItem _onmousedown={openPlugginsSettings} >Pluggins</ThoriumTreeItem>,
        <ThoriumTreeItem _onmousedown={openConnectorsSettings} >Connectors</ThoriumTreeItem>,
        <ThoriumTreeItem _onmousedown={openConnectorsSettings} >Blocks</ThoriumTreeItem>
      ]}
      <ThoriumMenuItem>Create Page</ThoriumMenuItem>
    </ThoriumTreeView>
  </div> })

  return <div 
    style = {{ minWidth : "300px" , gridRow : '1/3' }}
    className = { style.SideSheetContainer } 
    // close = "false" 
    context = "side-sheet" 
    // _close = {function(this:SideSheetElement){
    //   let attribute = this.getAttribute('close');
    //   if(attribute && attribute == 'true')attribute = 'false';
    //   else if(attribute && attribute == 'false')attribute = 'true';
    //   this.setAttribute('close' , attribute as string);
    // }}
  >
    <div className = { style.SideSheet } >
      <div>
        <ThoriumMenu style={{ color : "white" , display : "grid" , gap : "4px" , padding : "5px" }} >
          {[
            <ThoriumMenuItem _onmousedown={openSearchPageDialog} >Search</ThoriumMenuItem>,
            <ThoriumMenuItem _onmousedown={openEditorSettings} >Settings</ThoriumMenuItem>,
            <ThoriumMenuItem _onmousedown={openPlugginsSettings} >Pluggins</ThoriumMenuItem>,
            <ThoriumMenuItem _onmousedown={openConnectorsSettings} >Connectors</ThoriumMenuItem>,
            <ThoriumMenuItem _onmousedown={openConnectorsSettings} >Blocks</ThoriumMenuItem>
          ]}
          <ThoriumMenuItem>Create Page</ThoriumMenuItem>
        </ThoriumMenu>
      </div>
      <ThoriumPromise promise = { DatabaseService.findAllPages } callback={( result ) => {

        // let sections = Object.keys(app.plugins.value).reduce(( array:any[] , key ) => {

        //   let plugin = app.plugins[key];

        //   let pages = result.detail.reduce(( sectionPages:any , page ) => {
        //     if(plugin.type == page.type)sectionPages.push( <ThoriumTreeItem 
        //       slot="item" 
        //       oncontextmenu={(event) => {

        //       event.preventDefault();

        //       console.log({ event : event.button })
        //       let { button } = event;

        //       if(button == 2){

        //         DOM.render( <ThoriumMenu style = {{
        //           position : "absolute" , 
        //           left : `${event.clientX}px` , 
        //           top : `${event.clientY}px` , 
        //           zIndex : 100 , 
        //           height : "fit-content"
        //         }} 
        //         afterMounting={function( target ){

        //             function deleteMenu( event:MouseEvent ){

        //               if(!target.contains( event.target as HTMLElement )){
        //                 target.remove();
        //                 window.removeEventListener( 'mouseup' , deleteMenu );
        //               }

        //             }

        //             window.addEventListener('mouseup' , deleteMenu)

        //         }}
        //         childrens={[
        //           <ThoriumMenuItem text = {"Coucou"} />,
        //           <ThoriumMenuItem text = {"Import"} childrens={[
        //             <ThoriumMenu childrens = {[
        //               <ThoriumMenuItem text = {"Coucou"} />,
        //               <ThoriumMenuItem text = {"Coucou"} />,
        //               <ThoriumMenuItem text = {"Coucou"} />,
        //             ]}/>
        //           ]} />,
        //           <ThoriumMenuItem text = {"Export"} childrens={[
        //             <ThoriumMenu childrens = {[
        //               <ThoriumMenuItem text = {"Coucou"} />,
        //               <ThoriumMenuItem text = {"Coucou"} />,
        //               <ThoriumMenuItem text = {"Coucou"} />,
        //             ]}/>
        //           ]} />,
        //           <ThoriumMenuItem text = {"Coucou"} />,
        //           <ThoriumMenuItem text = {"Coucou"} />,
        //         ]} >
        //         </ThoriumMenu> , document.body )

        //       }

        //       }}
        //       onmousedown={() => {

        //         app.pagePointer = page;
        //         app.navigation = [ "home" , plugin.name , page.name ];

        //       }}
        //     >{page.name}</ThoriumTreeItem> );
        //     return sectionPages;
        //   } , []);

        //   array.push(<ThoriumTreeItem slot="item" childrens = {pages}>{plugin.name}</ThoriumTreeItem>);
        //   return array;

        // } , []);

        return <div>
          <ThoriumTreeView>
            {[Object.keys( app.plugins.value || [] ).reduce(( array:any[] , key ) => {
              let plugin = app.plugins[key];

              array.push(<thorium-tree-item slot="item">
                {plugin.name}
                {[result.detail.reduce(( sectionPages:any , page ) => {
                  if(plugin.type == page.type)sectionPages.push( <thorium-tree-item 
                    slot="item" 
                    _oncontextmenu={(event) => {

                    event.preventDefault();

                    console.log({ event : event.button })
                    let { button } = event;

                    if(button == 2){

                      DOM.render( <ThoriumMenu style = {{
                        position : "absolute" , 
                        left : `${event.clientX}px` , 
                        top : `${event.clientY}px` , 
                        zIndex : 100 , 
                        height : "fit-content"
                      }} 
                      afterMounting={function( target ){

                          function deleteMenu( event:MouseEvent ){

                            if(!target.contains( event.target as HTMLElement )){
                              target.remove();
                              window.removeEventListener( 'mouseup' , deleteMenu );
                            }

                          }

                          window.addEventListener('mouseup' , deleteMenu)

                      }}
                      childrens={[
                        <ThoriumMenuItem text = {"Coucou"} />,
                        <ThoriumMenuItem text = {"Import"} childrens={[
                          <ThoriumMenu childrens = { plugin.import.reduce(( result , importOption ) => {
                            result.push(<ThoriumMenuItem textContent = {importOption.title} />)
                            return result
                          } , []) }/>
                        ]} />,
                        <ThoriumMenuItem text = {"Export"} childrens={[
                          <ThoriumMenu childrens = { plugin.export.reduce(( result , exportOption ) => {
                            result.push( <ThoriumMenuItem textContent = {exportOption.title} /> );
                            return result;
                          } , []) }/>
                        ]}/>,
                        <ThoriumMenuItem text = {"Coucou"} />,
                        <ThoriumMenuItem text = {"Coucou"} />,
                      ]} >
                      </ThoriumMenu> , document.body )

                    }

                    }}
                    _onmousedown={() => {

                      app.pagePointer = { ...page , plugin };
                      app.navigation = [ "home" , plugin.name , page.name ];

                    }}
                  >{page.name}</thorium-tree-item> );
                  return sectionPages;
                } , [])]}
              </thorium-tree-item>);
              return array;

            } , [])]}
          </ThoriumTreeView>
        </div>
        
      }} />
      {/* <SideSheetContent
        // manager = { props.manager }
        pluginPages = { props.pluginPages }
      /> */}
      <div>
        <ThoriumMenu style={{ color : "white" , display : "grid" , gap : "4px" , padding : "5px" }} >
          <ThoriumMenuItem _onmousedown={openTemplatesSettings} >Templates</ThoriumMenuItem>
          <ThoriumMenuItem _onmousedown={openImportSettings} >Import</ThoriumMenuItem>
          <ThoriumMenuItem _onmousedown={openTrashSettings} >Trash</ThoriumMenuItem>
        </ThoriumMenu>
      </div>
      <SideSheetActionBar/>
    </div>
    <div 
      className = { style.SideSheetExpand }
      name = "expander"
      _onmousedown = {(event) => {
        let target = event.target as CustomElement<HTMLDivElement,{}>;
        target.context<SideSheetElement>('side-sheet').close();
      }}
    >
    </div>
  </div>;

};