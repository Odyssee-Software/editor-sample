import style from './style.module.css';
export const Icon = (props) => {
    return <div style={`--background:url(${props.path})`} class={style.IconContainer} name='icon-container'>
    <icon name='icon' class={(props.type == 'mask' ? style.Iconmask : style.Iconbackground)}/>
  </div>;
};
//# sourceMappingURL=index.jsx.map