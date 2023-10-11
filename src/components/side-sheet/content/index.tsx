import { CustomElement, DOM, pageContext , DesignSystem , CustomElementPatern , PaternArea } from 'thorium-framework';
import { Button , ButtonElement } from '@thorium-components/button';
import { Controls } from '@thorium-components/controls';
import { Divider } from '@thorium-components/divider';
import { Icon } from '@thorium-components/icon';
import { ContextualMenu } from '@components/contextual-menu';

import { 
  createPage ,
  findAllPages , 
  findPage 
} from '@modules/database';
import { TPage } from 'pages';

import { editorState , EditorState, setEditorState } from '@components/editor'

import { OpenSpring } from '../../../animations/spring';

const { register:Patern } = DesignSystem();

import styles from './style.module.css';

import * as path from 'path'; 

import PageIcon from '@fluentui/svg-icons/icons/document_20_filled.svg';

export type PageParams = {
  id:string;
  name:string;
};

export type PageControlElement = CustomElement<HTMLDivElement , {
  children:{
    "page-selector" : ButtonElement<{
      "page-edit" : ButtonElement,
      "page-delete" : ButtonElement,
      "page-options" : ButtonElement,
    }>
  }
}>

const PaternPageControl = DesignSystem().register( "thorium" as any , {
  baseName : 'page-selector',
  childrens : [<PaternArea></PaternArea>],
  observedAttibutes : [],
  __getter__ : {
    area : ( target:any ) => { 
      let [area] = target.shadowRoot.children;
      return area;
    }
  },
  __setter__ : {}
});

const PageControlConnector = PaternPageControl.connector();

const PageContr = (page:PageParams):PageControlElement => {

  return <PageControlConnector
    attr = {{class : styles.PageControl}}
    childrens={[
      <Button
        id = {page.id}
        name = "page-selector"
        textContent={page.name} 
        icon={{ type : 'mask' , path : path.join( 'app' , path.basename(PageIcon) ) }}
        controls={[
          <Button name = "page-edit" textContent='✍️' action = {() => { }} />,
          <Button name = "page-delete" textContent='🗑️' action = {() => { }} />,
          <Button name = "page-options" textContent='⠸' action = {( event ) => {
            let { target } = event;

            let { virtual:VirtualDOM } = DOM;

            VirtualDOM.createNodeElement( <ContextualMenu target = {target as Element} position='right' childrens = {[
              <Button textContent='Edit' />,
              <Button textContent='Copy' />,
              <Divider/>,
              <Button textContent='Edit' />,
              <Button textContent='Copy' />,
              <Divider/>,
              <Button textContent='Edit' />,
              <Button textContent='Copy' />
            ]} /> , document.body )
          }} />
        ]}
        action = {async () => {

          let { value:state } = editorState;
          let { detail:pageResult } = await findPage( { id : page.id } );
          let [ pageSettings ] = pageResult as any[];
          let { content } = pageSettings;
          
          setEditorState( {
            ...editorState.value , 
            configuration : {
              pageId : page.id,
              pageName : page.name,
              content : content,
            }
          } as any )

          let { editor } = state as EditorState;
          if(editor)editor.render(content);

        }}
        _afterMounting = {(target) => {
          editorState.subscribe( target , (stateConfig) => {

            let { configuration } = stateConfig as EditorState;
  
            let pageId = page.id;
            let {text:textElement} = target.children;
            let {innerHTML:text} = textElement;
            if(pageId == configuration.pageId && text != configuration.pageName){
              textElement.innerText = configuration.pageName;
            }
  
          } )
        }}
      />
    ]}
  />;
}

const PageControl = (page:PageParams):PageControlElement => {
  return <div class = {styles.PageControl} >
    <Button
      name = "page-selector"
      textContent={page.name} 
      icon={{ type : 'mask' , path : path.join( 'app' , path.basename(PageIcon) ) }}
      controls={[
        <Button name = "page-edit" textContent='✍️' action = {() => { }} />,
        <Button name = "page-delete" textContent='🗑️' action = {() => { }} />,
        <Button name = "page-options" textContent='⠸' action = {( event ) => {
          let { target } = event;
          let { virtual:VirtualDOM } = DOM;
          VirtualDOM.createNodeElement( <ContextualMenu target = {target as Element} position='right' childrens = {[
            <Button textContent='Edit' />,
            <Button textContent='Copy' />,
            <Divider/>,
            <Button textContent='Edit' />,
            <Button textContent='Copy' />,
            <Divider/>,
            <Button textContent='Edit' />,
            <Button textContent='Copy' />
          ]} /> , document.body )
         }} />
      ]}
      action = {async () => {

        let { value:state } = editorState;
        let { detail:pageResult } = await findPage( { _id : page.id } );
        let [ pageSettings ] = pageResult as any[];
        let { content } = pageSettings;
        
        setEditorState( {
          ...editorState.value , 
          configuration : {
            pageId : page.id,
            pageName : page.name,
            content : content,
          }
        } as any )

        let { editor } = state as EditorState;
        if(editor)editor.render(content);

      }}
    />
  </div>;
}

export const SideSheetContent = (props:{}) => {

  let UserPages = () => {

    let PageControls = () => {

      return <div
        name = 'pages-control'
        _afterMounting = {async (target:CustomElement<HTMLDivElement , {}>) => {

          let { virtual:VirtualDOM } = DOM;
          let { detail:pages } = await findAllPages();

          for await( const page of pages ){
            VirtualDOM.createNodeElement( <PageContr
              id = { page.id } 
              name = {page.name}
            /> , target );
          };

           OpenSpring( target );
          
        }}
        _addPageController = {function( this , page ){
          let { virtual:VirtualDOM } = DOM;
          VirtualDOM.createNodeElement( <PageContr
            id = { page._id } 
            name = {page.name}
          /> , this );
        }}
      />;

    }
    
    return <div context = 'pages-user'>
      <nav class = {styles.UserPagesNav} >
        <h3>▸ Pages</h3>
        <Controls buttons={[
          <Button textContent='+' action = {async (event:MouseEvent) => {

            let target = event.target as CustomElement<HTMLButtonElement , {}>;
            let context = target.context('pages-user');
            let [pagesControl] = context.querySelectorAll('div[name="pages-control"]');

            if(pagesControl){

              let pageId = crypto.randomUUID();
              let pageName = '';

              (pagesControl as any).addPageController({ id : pageId , name : pageName });

              let content = [{"data":{"level":1,"text":""},"id":"ZZBRUsbQIP","type":"h1"}];

              setEditorState( {
                ...editorState.value , 
                configuration : {
                  id : pageId,
                  name : pageName,
                  content : { blocks : content},
                }
              } as any );

              await createPage(editorState.value?.configuration as Record<string,any>);

              editorState.value?.editor.render({
                blocks : content
              });

            }

          }} />,
        ]} />
      </nav>
      <PageControls/>
    </div>

  }

  return <div class = { styles.SideSheetContent }>
    <div>
      <h3>▸ Options</h3>
    </div>
    <Divider/>
    <UserPages/>
    <Divider/>
    <div>
      <h3>▸ Spaces</h3>
    </div>
  </div>;

}