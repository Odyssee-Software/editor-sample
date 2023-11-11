import { Button } from '@thorium-components/button';
import { DOM , CustomElement , DesignSystem , PaternArea, useState , State } from 'thorium-framework';
import style from './style.module.css';

interface ISettings{

}

export type SettingsStateMutator = [ State<ISettings> , ( value:ISettings) => ISettings ];

export interface SettingsButtonProps{
  settingsStateMutator:SettingsStateMutator,
  action?(event:MouseEvent):void;
}

export const SettingsButton = ( props:SettingsButtonProps ) => {

  const [ settings ,  updateSettings ] = props.settingsStateMutator;

  updateSettings( { ...settings.value } )

  return <div>
    <Button 
    textContent='Enregister'
    action = {async () => {
      const colorInput = document.getElementById('colorInput');
      const selectedColorDiv = document.getElementById('selectedColor');

      updateSettings({...settings.value, themeColor : colorInput?.children});
      console.log(settings.value);
    }}/>
  </div>
}


export const Settings = () => {

  const [ settings ,  updateSettings ] = useState<any>({
    lol : '',
    mdr : ''
  });


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
          <div class={style.ColorPicker}>
            <input type='color' id='colorInput'></input>
            <div id='selectedColor'></div>
          </div>
          <SettingsButton settingsStateMutator={settings.mutator as SettingsStateMutator}/>
        </div>
    </div>;
}