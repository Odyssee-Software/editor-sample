import { PageRouter , Page , PageLink } from "thorium-framework";
import { Settings } from '@components/settings';
import { Workspace } from '@components/workspace';

const Home = () => {
  return <div>
    <h1>Home</h1>
    <PageLink to = "/workspace" title = "workspace" />
    <PageLink to = "/settings" title = "settings" />
  </div>;
}


/* The code is exporting a default component that uses the `PageRouter` and `Page` components from the
"thorium-framework" library. */
export default <PageRouter >
  <Page name = "" childrens={[<Home/>]}/>
  <Page name = "workspace" childrens={[<Workspace/>]}/>
  <Page name = "settings" childrens={[<Settings/>]}/>
</PageRouter>;