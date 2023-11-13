import { DesignSystem, PaternArea } from 'thorium-framework';
import { Icon } from '../icon';
import { Controls } from '../controls';
import style from './style.module.css';
const getButtonIcon = function () {
    return this.children.icon;
};
const getButtonControls = function () {
    return this.children.controls;
};
export const ButtonPatern = DesignSystem().register('thorium', {
    baseName: 'button',
    attr: {},
    childrens: [<PaternArea></PaternArea>],
    proto: {},
    __getter__: {
        buttonElement: (target) => {
            let [button] = target.children;
            return button;
        },
        textElement: (target) => {
            return target.buttonElement.children['text'];
        },
        text: (target) => {
            return target.textElement.innerText;
        }
    },
    __setter__: {
        text: (value, target) => {
            target.textElement.innerText = value;
        }
    },
});
export const ButttonConnector = ButtonPatern.connector();
function isURL(url) {
    let result = false;
    try {
        let u = new URL(url);
        result = true;
    }
    catch (error) {
        result = false;
    }
    finally {
        return result;
    }
}
export const Button = (props) => {
    return <ButttonConnector attr={{ class: style.ButtonContainer }} childrens={[
            <button id={(props.id ? props.id : null)} part="button" _onmousedown={(event) => {
                    if (props.action)
                        props.action(event);
                    if (props.pageLink) {
                        if (isURL(props.pageLink.to))
                            location.replace(props.pageLink.to);
                        else
                            location.href = `#${props.pageLink.to}`;
                    }
                }} _icon={getButtonIcon} _controls={getButtonControls} class={(props.className ? `${style.Button} ${props.className}` : style.Button)} childrens={[
                    ('icon' in props && props.icon ? <Icon type={props.icon.type} path={props.icon.path}/> : null),
                    (props.textContent ? <p name="text" part="text" class={style.ButtonText} _textContent={props.textContent}/> : null),
                    ('controls' in props && props.controls ? <Controls buttons={props.controls}/> : null),
                ]} _afterMounting={(target) => {
                    if (props._afterMounting)
                        props._afterMounting(target);
                }}>
      </button>
        ]}/>;
};
//# sourceMappingURL=index.jsx.map