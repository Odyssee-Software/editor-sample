import style from './style.module.css';
export const ContextualMenu = (props) => {
    let positionElement = props.target.getBoundingClientRect();
    let { position } = props;
    let top;
    let left;
    let transform;
    if (position == 'top') {
        top = positionElement.top;
        left = positionElement.left + (positionElement.width / 2);
        transform = 'transform:translate(-50% , -100%);';
    }
    else if (position == 'right') {
        top = positionElement.top + (positionElement.height / 2);
        left = positionElement.left + positionElement.width;
        transform = 'transform:translate(0 , -50%);';
    }
    else if (position == 'bottom') {
        top = positionElement.top + positionElement.height;
        left = positionElement.left + (positionElement.width / 2);
        transform = 'transform:translate(-50% , 0);';
    }
    else if (position == 'left') {
        top = positionElement.top + (positionElement.height / 2);
        left = positionElement.left;
        transform = 'transform:translate(-100% , -50%);';
    }
    let injectStyle = `left:${left}px;top:${top}px;${transform}`;
    return <div name='contextual-menu-container' context='contextual-menu-container' class={style.ContextualMenuContainer} style={injectStyle}>
    <div name='contextual-menu' childrens={props.childrens} class={style.ContextualMenu} position={position} _afterMounting={(props.afterMouning ? props.afterMouning : null)}/>
  </div>;
};
//# sourceMappingURL=index.jsx.map