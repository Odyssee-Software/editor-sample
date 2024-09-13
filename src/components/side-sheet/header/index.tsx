import * as path from 'path';

import { CustomElement , PageLink } from 'thorium-framework';
import { ThoriumButton } from 'thorium-components';

import styles from './style.module.css';

import OptionsIcon from '@fluentui/svg-icons/icons/options_20_filled.svg';
import CloseIcon from '@fluentui/svg-icons/icons/arrow_previous_20_filled.svg';

export const SideSheetHeader = () => {

  return <div className = { styles.SideSheetHeader }>
    <ThoriumButton textContent='Settings'/>
    <ThoriumButton textContent='C'/>
    <ThoriumButton 
      onmousedown = {(event) => {
        
        let { target } = event;
        /* The line `let sideSheet = (target as CustomElement<any,{}>).context('side-sheet');` is
        retrieving the context of the custom element with the name 'side-sheet'. */
        let sideSheet = (target as CustomElement<any,{}>).context('side-sheet');
        sideSheet.close();

      }}
    />
  </div>;

}