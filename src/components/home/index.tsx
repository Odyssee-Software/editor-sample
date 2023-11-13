import { Button } from '@thorium-components/button';
import styles from './style.module.css';

export const Home = () => {
    return <div class={styles.Home}>
      <div class={styles.SideLeftMenu}>
        <h1>Home</h1>
        <div class={styles.SideLeftMenuHeader}>
          <Button textContent='Workspace' pageLink = {{ to : '/workspace' }} />
          <Button textContent='Settings' pageLink = {{ to : '/settings' }} />
        </div>
      </div>
      <div class={styles.Content}>
        <div class={styles.ContentHeader}>

        </div>
      <div class={styles.MainContentHeader}>

      </div>
    </div>
  </div>;
}

