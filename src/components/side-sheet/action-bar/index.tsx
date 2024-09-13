import { ThoriumButton } from 'thorium-components';
import styles from './style.module.css';

export const SideSheetActionBar = () => {

  return <div className = { styles.SideSheetActionBar }>
    <ThoriumButton textContent='Action A'/>
    <ThoriumButton textContent='Action B'/>
  </div>;

}