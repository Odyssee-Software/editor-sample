import { State , CustomElement , DOMRender } from 'thorium-framework';
import { EditorState, editorState } from '@components/editor'
import style from './style.module.css';
import EditorStyle from '../../components/editor/style.module.css';

import { CustomElementDefultProps } from '../'

export type WrapperItemProps = {

};

export type WrapperOptions = {
    items:[State<string[]> , any],
    label?:string
} & CustomElementDefultProps;


export const WrapperList = ( props:WrapperOptions ) => {

    console.log('wrapperList' , props)

    return <div class={style.WrapperList}>
        <select 
            _onchange = {()=>{
                console.log(EditorStyle.Editor)
            }}
            _afterMounting = {( target:CustomElement< HTMLSelectElement , {} > ) => {
                let [ state ] = props.items;

                state.subscribe( target , ( newList ) => {

                    for( const e of [...target.children].reverse() ){
                        e.remove();
                    }

                    for(const e of newList){
                        DOMRender( <option _textContent = {e}/> , target ); 
                    }

                })

                for(const e of state.value){
                    DOMRender( <option _textContent = {e}/> , target ); 
                }

            }}/>
    </div>;
}