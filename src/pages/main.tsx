import { PageRouter ,Page } from "thorium-framework";
import { Workspace } from '@components/workspace';

/* The code is exporting a default component that uses the `PageRouter` and `Page` components from the
"thorium-framework" library. */
export default <PageRouter >
  <Page name = "" childrens={[<Workspace/>]}/>
</PageRouter>;