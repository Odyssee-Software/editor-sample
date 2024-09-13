import { CustomElement, DOM, pageContext , DesignSystem , PaternArea } from 'thorium-framework';
import { useContext } from 'thorium-framework/modules/context';
import { ThoriumButton } from 'thorium-components';
import { Controls } from '@thorium-components/controls';
import { Divider } from '@thorium-components/divider';
import { Icon } from '@thorium-components/icon';
import { ContextualMenu } from '@components/contextual-menu';

import { 
  createPage ,
  findAllPages , 
  findPage 
} from '@modules/database';
import { Page } from 'editor-page-types';

import { OpenSpring } from '../../../animations/spring';

const { register:Patern } = DesignSystem();

import styles from './style.module.css';

import * as path from 'path'; 

import PageIcon from '@fluentui/svg-icons/icons/document_20_filled.svg';
import { storeContext } from 'thorium-framework/modules/context';
import { IEditor } from '@components/workbench';

export type PageParams = {
  id:string;
  name:string;
  plugin:any;
};

export type PageControlElement = CustomElement<HTMLDivElement , {}>

export class _SideSheet_Content{

  element;
  get container(){ return this.element.parentElement as CustomElement<HTMLDivElement , {}> }
  
  constructor( props:{ ref } ){
    this.element = props.ref;
  }

}

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

  console.log({ page })

  return <PageControlConnector
    attr = {{className : styles.PageControl}}
    childrens={[
      <ThoriumButton
        id = {page.id}
        name = "page-selector"
        textContent={page.name} 
        // icon={{ type : 'mask' , path : path.join( 'app' , path.basename(PageIcon) ) }}
        // controls={[
        //   <ThoriumButton name = "page-edit" textContent='✍️' _onmousedown = {() => { }} />,
        //   <ThoriumButton name = "page-delete" textContent='🗑️' _onmousedown = {() => { }} />,
        //   <ThoriumButton name = "page-options" textContent='⠸' _onmousedown = {( event ) => {
        //     let { target } = event;

        //     let { virtual:VirtualDOM } = DOM;

        //     VirtualDOM.createNodeElement( <ContextualMenu target = {target as Element} position='right' childrens = {[
        //       <ThoriumButton textContent='Edit' />,
        //       <ThoriumButton textContent='Copy' />,
        //       <ThoriumButton textContent='Duplicate' />,
        //       <Divider/>,
        //       <ThoriumButton textContent='Delete' />,
        //       ( page.plugin.import || page.plugin.export ? <Divider/> : null ),
        //       ( page.plugin.import ?  <ThoriumButton 
        //         textContent='Import' 
        //         // controls={Array.from( page.plugin.import , ( _importPlugin:any ) => {
        //         //   return (<Button textContent = { _importPlugin.title } action = { _importPlugin.main }/>)
        //         // } )}
        //       /> : null ),
        //       ( page.plugin.export ?  <ThoriumButton 
        //           textContent='Export'
        //           // controls={Array.from( page.plugin.export , ( _exportPlugin:any ) => {
        //           //   return (<ThoriumButton textContent = { _exportPlugin.title }/>)
        //           // } )} 
        //         /> : null ),
        //     ]} /> , document.body )
        //   }} />
        // ]}
        // _onmousedown = {async () => {

        //   const context = useContext( "workbench" );
        //   const { state:editor , setter:setEditor } = context.get<IEditor>( 'manager' );

        //   let { detail:pageResult } = await findPage( { id : page.id } );
        //   let [ pageSettings ] = pageResult as any[];
        //   let { content } = pageSettings;
          
        //   setEditor({
        //     editor : editor.editor,
        //     configuration : {
        //       type : 'note',
        //       id : pageSettings.id,
        //       name : pageSettings.name,
        //       content : pageSettings.content,
        //     }
        //   });

        //   console.log({ editor })

        //   if(editor){
        //     console.log({ editor })
        //     editor.editor.render(content);
        //   }

        // }}
        // _afterMounting = {(target) => {

        //   const { state:editor , setter:setEditor } = useContext( "workbench" ).get<IEditor>( 'manager' );

        //   editor.subscribe( target , (stateConfig) => {

        //     let { configuration } = stateConfig as any;
  
        //     let pageId = page.id;
        //     // let { text:textElement } = target.children;
        //     // let { innerHTML:text } = textElement;
        //     // if(pageId == configuration.id && text != configuration.name){
        //     //   textElement.innerText = configuration.name;
        //     // }

        //     return stateConfig;
  
        //   } )

        // }}
      />
    ]}
  />;
}

export const SideSheetContent = (props:{
  // manager:any;
  pluginPages:any[];
}) => {

  // const [ sideSheet ] = storeContext().getContextByName( 'sidesheet' );
  // console.log({ sideSheet })

  // const { state:content , setter:setContent } = sideSheet.set<any[]>( 'content' , [] );

  let sections = Array.from( props.pluginPages , ( plugin , iterator ) => {

    return [
      <div context = {`pages-${plugin.type}`} >
        <nav className = {styles.UserPagesNav} >
          <h3 _textContent = { `▸ ${plugin.title}` }/>
          <Controls buttons={[
            <ThoriumButton textContent='+' _onmousedown = {async (event:MouseEvent) => {

              let target = event.target as CustomElement<HTMLButtonElement , {}>;
              let context = target.context(`pages-${plugin.type}`);
              let pagesControl = context.querySelectorAll(`div[name="pages-${plugin.type}"]`)[0];

              if(pagesControl){

                let pageId = crypto.randomUUID();
                let pageName = 'New Page';

                (pagesControl as any).addPageController({ id : pageId , name : pageName });

                let content = [{"data":{"level":1,"text":pageName},"id":"ZZBRUsbQIP","type":"h1"}];

                const [ workbench ] = storeContext().getContextByName( 'workbench' );
                let { state:editor , setter:setEditor } = workbench.get<IEditor>( 'manager' );

                setEditor( {
                  ...editor , 
                  configuration : {
                    type : plugin.type,
                    id : pageId as any,
                    name : pageName,
                    content : { blocks : content} as any,
                  }
                } as any )

                // props.manager.editor = {
                //   ...props.manager.editor , 
                //   configuration : {
                //     type : plugin.type,
                //     id : pageId,
                //     name : pageName,
                //     content : { blocks : content},
                //   }
                // };

                await createPage(editor?.value.configuration as Record<string,any>);

                // editorState.value?.editor.render({
                //   blocks : content
                // });

              }

            }} />,
          ]} />
        </nav>
        <div
          name = { `pages-${plugin.type}` }
          _afterMounting = {async (target:CustomElement<HTMLDivElement , {}>) => {

            let { detail:pages } = await findPage({ type : plugin.type });
  
            for await( const page of pages ){

              DOM.createNodeElement( <PageContr
                id = { page.id } 
                name = {page.name}
                plugin = { plugin }
              /> , target );

            };
  
             OpenSpring( target );
            
          }}
          // _addPageController = {function( this , page ){

          //   let { virtual:VirtualDOM } = DOM;
          //   VirtualDOM.createNodeElement( <PageContr
          //     id = { page.id } 
          //     name = {page.name}
          //     plugin = { plugin }
          //   /> , this );

          // }}
        />
      </div>,
      <Divider/>
    ];

  } ).flat()

  return <div className = { styles.SideSheetContent }>
    <div _afterMounting={( target ) => {

      for(let section of sections){
        console.log({ section });
        DOM.render( section , target )
      }

    }} ></div>
  </div>;

}