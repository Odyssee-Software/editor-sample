import style from './style.module.css';

export type IconProps = {
  type : 'background' | 'mask';
  path : string;
}

export const Icon = (props:IconProps) => {

  return <div style = { `--background:url(${props.path})`} class = { style.IconContainer } >
    <icon class = { ( props.type == 'mask' ? style.Iconmask : style.Iconbackground) } />
  </div>;

}