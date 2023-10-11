import * as path from 'path';

import { CustomElement , PageLink } from 'thorium-framework';
import { Button } from '@thorium-components/button';

import styles from './style.module.css';

import OptionsIcon from '@fluentui/svg-icons/icons/options_20_filled.svg';
import CloseIcon from '@fluentui/svg-icons/icons/arrow_previous_20_filled.svg';

export const SideSheetHeader = () => {

  return <div class = { styles.SideSheetHeader }>
    <Button textContent='Settings' icon = {{ type : 'mask' , path : path.join( 'app' , path.basename(OptionsIcon) ) }} pageLink = {{ to : '/settings' }} />
    <Button textContent='Google' pageLink = {{ to : 'https://www.google.be/' }} />
    <Button textContent='C'/>
    <Button 
      icon = {{ type : 'mask' , path : path.join( 'app' , path.basename(CloseIcon) ) }}
      action = {(event) => {
        let { target } = event;
        /* The line `let sideSheet = (target as CustomElement<any,{}>).context('side-sheet');` is
        retrieving the context of the custom element with the name 'side-sheet'. */
        let sideSheet = (target as CustomElement<any,{}>).context('side-sheet');
        sideSheet.close();
      }}
    />
  </div>;

}