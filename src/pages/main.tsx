import { PageRouter , Page , PageLink , useState , DOM, CustomElement } from "thorium-framework";
import { Workspace } from '@components/workspace';

import { configureNoteEditorBlock } from "@components/workbench";
import Header from '@editorjs/header';
import * as tools from '../components/editor/tools';
import { Input2 } from '@thorium-components/input2';
import { BlockAPI } from "@editorjs/editorjs";
import { Divider } from "@thorium-components/divider";

import { SideSheet } from '@components/side-sheet';

import { Note } from '../plugins/note';
import { HTML } from '../plugins/html';
import { GPT } from '../plugins/gpt';

import {
  ThoriumCard,
  ThoriumButton,
  ThoriumBreadcrumb,
  ThoriumBreadcrumbItem,
} from 'thorium-components';

import { openCurrentPageSettings } from "../dialogs/settings-current-page";
import { useApplication } from "@context/index";

import { Workbench } from '../components/workbench'

let HomeIcon = `<svg viewBox="-2 0 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff">
<g id="SVGRepo_bgCarrier" stroke-width="0"/>
<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
<g id="SVGRepo_iconCarrier"> <title>home [#1392]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-381.000000, -720.000000)" fill="white"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M339.875,578.013 L336.6875,578.013 L336.6875,574.013 L330.3125,574.013 L330.3125,578.013 L327.125,578.013 L327.125,568.799 L333.489375,562.809 L339.875,568.819 L339.875,578.013 Z M341.94475,568.013 L333.47025,560 L325,567.999 L325,580.013 L332.4375,580.013 L332.4375,576.013 L334.5625,576.013 L334.5625,580.013 L342,580.013 L342,579.983 L342,568.013 L341.94475,568.013 Z" id="home-[#1392]"> </path> </g> </g> </g> </g>
</svg>`;

const ViewContent = () => {

  let app = useApplication();

  let reload = () => {
    
  }

  return <div style = {{ display : 'grid' , zIndex : 0 }} >
    <div style = {{ display : 'grid' }} _afterMounting={(target) => {

      if(app.navigation.subscribe)app.navigation.subscribe( target , ( newValue ) => {
        console.log({ newValue })

        let [ home , plugin , page ] = newValue;

        for(let e of Object.values( target.children ).reverse()){
          e.remove();
        }

        if(page) DOM.render( < Workbench/> , target );
        else DOM.render( <Home/> , target );

      } )

    }}>
      {[
        app.navigation.value?.length == 1 ? 
          <Home/> :
          < Workbench/>
      ]}
    </div>
  </div>

}

const Home = () => {

  return <div style = {{ display : "grid" , padding : "20px" , alignItems : 'center' , justifyContent : 'center' }} >
    <ThoriumCard style={{ height : 'fit-content' , display : "grid" , padding : "10px" , color : "white" , alignItems : 'center' , justifyContent : 'center' }} >
      <h1>🚀 Bienvenue dans Thorium Editor ! 🚀</h1>
      <section>
        <p>Bonjour et bienvenue dans votre nouvel espace de création et d'organisation, Thorium Editor ! Nous sommes ravis de vous accueillir dans notre monde de productivité simplifiée et de créativité débridée.</p>
      </section>
      <section>
        <p>Thorium Editor a été conçu pour vous offrir une expérience de prise de notes sans effort, où votre inspiration peut s'épanouir sans être entravée par des complications inutiles. Que vous soyez un écrivain, un créateur de contenu, un étudiant ou simplement quelqu'un qui aime garder ses pensées organisées, Thorium Editor est là pour vous accompagner à chaque étape de votre voyage.</p>
        <p>Avec sa conception intuitive, ses fonctionnalités puissantes et son interface épurée, Thorium Editor vous permet de capturer vos idées les plus brillantes et de les organiser avec facilité. De la prise de notes rapide à la structuration complexe de projets, Thorium Editor s'adapte à vos besoins pour vous offrir une expérience de prise de notes fluide et personnalisée.</p>
        <p>Que vous utilisiez Thorium Editor pour écrire votre prochain roman, préparer des présentations percutantes, prendre des notes en classe ou simplement griffonner des idées, nous sommes convaincus que vous trouverez dans notre éditeur un fidèle compagnon de création.</p>
      </section>
      <section>
        <p>Alors, plongez dans l'univers de Thorium Editor et laissez libre cours à votre imagination ! Que vos idées prennent leur envol et que votre créativité trouve son expression la plus authentique.</p>
        <p>Nous vous souhaitons une expérience extraordinaire avec Thorium Editor. N'hésitez pas à explorer, créer et innover !</p>
      </section>
      <p>L'équipe de Thorium Editor</p>

      <div style={{ display : "inline-flex", padding : "10px" , gap: "10px" , justifyContent : "flex-end" }} >
        <ThoriumButton>
          <PageLink to = "/settings" title = "Settings" />
        </ThoriumButton>
        <ThoriumButton appearance="accent" >
          <PageLink to = "/workspace" title = "Jump into your workspace" />
        </ThoriumButton>
      </div>

    </ThoriumCard>
  </div>;

}

const Settings = () => {
  return <div>
    <h1>Settings</h1>
    <PageLink to = "/" title = "home" />
  </div>;
}

/* The code is exporting a default component that uses the `PageRouter` and `Page` components from the
"thorium-framework" library. */
export default <PageRouter>
  <Page name = "" childrens= {[
    <div style={{ display : 'grid' , gridTemplateColumns : "min-content minmax(0,1fr)" , gridTemplateRows : "min-content minmax(0,1fr)" }} >
      <SideSheet pluginPages={[]} />
      <div style={{ 
        gridColumn : "2" , 
        gridRow : "1" , 
        display : 'inline-flex' , 
        justifyContent : 'space-between' , 
        padding : "5px 10px" , 
        borderBottom : "1px solid lightgray",
        background: "rgba(255, 255, 255, 0.75)",
        boxShadow: "1px 1px 10px rgba( 31, 38, 135, 0.37 )",
        backdropFilter: "blur(4px)",
        borderRadius: "var(--sidesheet-border-radius)",
        border: "1px solid rgba(255, 255, 255, 0.18)"
        }} >
        <div style = {{ display : "inline-flex" , alignItems : "center" }} >
          <ThoriumBreadcrumb style = {{backgroundColor:'var(--neutral-fill-rest)' , padding : "3px 10px" , borderRadius : "3px" }} afterMounting={( target ) => {

            let app = useApplication();

            if(app.navigation.subscribe)app.navigation.subscribe( target , ( newValue ) => {

              console.log({ newValue })

              for(let e of [...target.children as any].reverse()){
                e.remove();
              }

              for(let e of newValue){

                if(e == 'home')DOM.render(<thorium-breadcrumb-item>
                  <div slot = "end" text={"/home"}></div>
                  <ThoriumButton slot = "start" _innerHTML={HomeIcon} style = {{ height : "20px" , width : "20px" }} onmousedown = {() => {
    
                    let app = useApplication();
                    app.navigation = [ "home" ]
    
                  }}/>
                </thorium-breadcrumb-item> , target)
                else DOM.render( <thorium-breadcrumb-item text = {e} /> , target );
                
              }

            })

          }} >
            <ThoriumBreadcrumbItem>
              <div slot = "end" text={"/home"}></div>
              <ThoriumButton slot = "start" _innerHTML={HomeIcon} style = {{ height : "20px" , width : "20px" }} onmousedown = {() => {

                let app = useApplication();
                app.navigation = [ "home" ]

              }}/>
            </ThoriumBreadcrumbItem>
          </ThoriumBreadcrumb>
        </div>
        <div style = {{ display : 'inline-flex' ,  gap : '5px' }} >
          <ThoriumButton disabled = {true}></ThoriumButton>
          <ThoriumButton disabled = {true} ></ThoriumButton>
          <ThoriumButton disabled = {true} ></ThoriumButton>
          <ThoriumButton disabled = {true}></ThoriumButton>
          <ThoriumButton _onmousedown={openCurrentPageSettings} >...</ThoriumButton>
        </div>
      </div>
      <ViewContent/>
    </div>
  ]} />
  <Page name = "workspace" childrens={[<Workspace
    pluginPages={[ Note, HTML, GPT ]}
    pluginBlocks={{
      'h1' : configureNoteEditorBlock( class extends Header{

        renderSettings( props ){

          let api = this['api'] as EditorJS.API;
          let data = this['data'] as { text : string , level : number };
          let block = this['block'] as typeof Header;
          let { settings , config } = props;

          if(!this['blockContext'].get('text'))this['blockContext'].set<string | null>( 'text' , data.text );
          if(!this['blockContext'].get('level'))this['blockContext'].set<number | null>( 'level' , data.level );

          let { state:text , setter:setText } = this['blockContext'].get('text');
          let { state:level , setter:setLevel } = this['blockContext'].get('level');

          return <div>
            <nav>
              <h1 _textContent = { String(block.name).toUpperCase() } />
            </nav>
            <div>
              <label>text</label>
              <input 
                value = { text }
                _afterMounting = {( target ) => {

                  text.subscribe( target , ( newValue ) => {
                    api.blocks.update( block.id , { text : newValue , level : level } );
                  })

                }}
                _onkeyup = {(event:Event) => {

                  let target = event.target as CustomElement<HTMLInputElement , {}>;
                  let value = target.value;
                  setText( value );

                }}
              />
            </div>
            <div>
              <label>level</label>
              <select 
                _afterMounting = {(target) => {

                  level.subscribe( target , ( newLevel ) => {
                    api.blocks.update( block.id , { text : text , level : newLevel } )
                  })

                }}
                _onchange = {(event:Event) => {

                  let target = event.target as CustomElement<HTMLSelectElement , {}>;
                  let value = target.value;
                  setLevel(Number( value ))

                }} 
                childrens = { Array.from( config.levels , (l:string) => {

                  return (
                    l == level ?
                    <option _textContent = {l} selected = { true }/>
                    :
                    <option _textContent = {l}/>
                  );
                }) } 
              />
            </div>
          </div>;

        }

      } as any , {
        placeholder: 'Enter a header',
        levels: [1, 2, 3, 4],
        defaultLevel: 3,
      }),
      'warning' : configureNoteEditorBlock( tools.Warning, { xd : 'lolilol' }),
      'codeEditor' : configureNoteEditorBlock( tools.CodeEditor as any, { xd : 'lolilol' }),
    }}
  />]}/>
  <Page name = "settings" childrens={[<Settings/>]}/>
</PageRouter>;