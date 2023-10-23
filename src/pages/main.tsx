<<<<<<< Updated upstream
import { PageRouter ,Page } from "thorium-framework";
import { Workspace } from '../components/workspace';

=======
import { PageRouter , Page , PageLink } from "thorium-framework";
import { Workspace } from '@components/workspace';
import { Settings } from '@components/settings';
import { Home } from '@components/home';


const Menu = () =>{
  return <div>
    <Settings/>
    <Home/>
    <Workspace/>
  </div>
}

/* The code is exporting a default component that uses the `PageRouter` and `Page` components from the
"thorium-framework" library. */
>>>>>>> Stashed changes
export default <PageRouter >
  <Page name = "" childrens={[<Workspace/>]}/>
</PageRouter>;