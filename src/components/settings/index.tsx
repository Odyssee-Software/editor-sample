import { Button } from '@thorium-components/button';
import { StoreContext } from 'store-context';
import { DOM , CustomElement , DesignSystem , PaternArea } from 'thorium-framework';
import style from './style.module.css';

export const SettingsButton = () => {
  return <div>
    <Button textContent='Enregister' />
  </div>
}

export const ButtonSettingsPatern = DesignSystem().register('thorium' , {
  baseName : 'button-settings',
  attr : {},
  childrens : [<PaternArea></PaternArea>],
  proto : {},
  __getter__ : {},
  __setter__ : {},
});

export const Settings = () => {
    return <div class={style.Settings}>
      <div class={style.SettingsHeader}>
          <h1>Settings</h1>
          <div class={style.Button}>
            <Button 
            textContent='Workspace' 
            pageLink = {{ to : '/workspace' }}/>
          </div>
        </div>
        <div class={style.SettingsContent}>
          <div class={style.InputItem}>
            <label for='plugin'>Plugin</label>
            <input type='file'></input>
          </div>
          <SettingsButton />
        </div>
    </div>;
}