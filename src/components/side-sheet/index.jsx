import style from './style.module.css';
import { Divider } from '@thorium-components/divider';
import { SideSheetHeader } from './header';
import { SideSheetContent } from './content';
import { SideSheetActionBar } from './action-bar';
export const SideSheet = (props) => {
    return <div class={style.SideSheetContainer} close="false" context="side-sheet" _close={function () {
            let attribute = this.getAttribute('close');
            if (attribute && attribute == 'true')
                attribute = 'false';
            else if (attribute && attribute == 'false')
                attribute = 'true';
            this.setAttribute('close', attribute);
        }}>
    <div class={style.SideSheet}>
      <SideSheetHeader />
      <Divider />
      <SideSheetContent />
      <Divider />
      <SideSheetActionBar />
    </div>
    <div class={style.SideSheetExpand} name="expander" _onmousedown={(event) => {
            let target = event.target;
            target.context('side-sheet').close();
        }}>
    </div>
  </div>;
};
//# sourceMappingURL=index.jsx.map