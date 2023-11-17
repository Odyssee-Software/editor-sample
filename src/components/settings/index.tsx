import { PageLink , useState } from "thorium-framework";
import { Button } from '@thorium-components/button';
import { WrapperList } from '@thorium-components/wrapper-list';
import styles from './style.module.css';

export const Settings = () => {

  let state = useState<string[]>('' , [ "un" , "deux" ]);

  return <div class={styles.Settings}>
    <div class={styles.SideLeftMenu}>

    </div>
    <div class={styles.Content}>
      <div class={styles.ContentHeader}>
          
      </div>
      <div class={styles.MainContentHeader}>
          <h3>Settings</h3>
          <div class={styles.ButtonHome}>
              <Button textContent='Home' pageLink = {{ to : '/' }} />
          </div>
      </div>
      <div class={styles.MainContent}>
          <div class={styles.ListItem}>
              < WrapperList items= {state}/>
          </div>
      </div>
    </div>
  </div>;
}