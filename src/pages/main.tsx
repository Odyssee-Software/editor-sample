import { PageRouter , Page , PageLink } from "thorium-framework";
import { Workspace } from '@components/workspace';

import { configureNoteEditorBlock } from "@components/note-editor";
import Header from '@editorjs/header';
import * as tools from '../components/editor/tools';

const Home = () => {
  return <div>
    <h1>Home</h1>
    <PageLink to = "/workspace" title = "workspace" />
    <PageLink to = "/settings" title = "settings" />
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
export default <PageRouter >
  <Page name = "" childrens={[<Home/>]}/>
  <Page name = "workspace" childrens={[<Workspace
    pluginPages={{
      'note' : class {

        constructor(  ){

        }

      },
      'html' : class {

      }
    }}
    pluginBlocks={{
      'h1' : configureNoteEditorBlock( Header as any , {
        placeholder: 'Enter a header',
        levels: [1, 2, 3, 4],
        defaultLevel: 3,
      }),
      'warning' : configureNoteEditorBlock( tools.Warning, { xd : 'lolilol' })
      // 'codeEditor' : configureNoteEditorBlock( tools.CodeEditor , {} ) as any
    }}
  />]}/>
  <Page name = "settings" childrens={[<Settings/>]}/>
</PageRouter>;