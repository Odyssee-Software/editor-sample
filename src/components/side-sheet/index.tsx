import style from './style.module.css';

import { Button } from '../button';
import { Divider } from '../divider';

const SideSheetContent = (props:{}) => {

  return <div class = { style.SideSheetContent }>

  </div>;

}

const SideSheetActionBar = () => {

  return <div class = { style.SideSheetActionBar }>
    <Button textContent='Action A'/>
    <Button textContent='Action B'/>
  </div>;

}

const SideSheetHeader = () => {

  return <div class = { style.SideSheetHeader }>
    <Button textContent='A'/>
    <Button textContent='B'/>
    <Button textContent='C'/>
    <Button textContent='D'/>
  </div>;

}

export const SideSheet = (props:{}) => {

  return <div class = { style.SideSheet }>
    <SideSheetHeader/>
    <Divider/>
    <SideSheetContent/>
    <Divider/>
    <SideSheetActionBar/>
  </div>;

};