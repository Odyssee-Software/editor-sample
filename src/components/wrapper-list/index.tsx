import { CustomElement , DOMRender } from 'thorium-framework';
import { IStoreState } from 'thorium-framework/modules/context';
import style from './style.module.css';
import EditorStyle from '../../components/editor/style.module.css';

import { CustomElementDefultProps } from '@thorium-components/index';

export type WrapperItemProps = {

};

export type WrapperOptions = {
    items: IStoreState<string[]>['state']['mutator'] | string[];
    label?:string;
} & CustomElementDefultProps;


export const WrapperList = ( props:WrapperOptions ) => {

    let { items } = props;

    return <div class={style.WrapperList}>
        <select 
            _onchange = {()=>{
                console.log(EditorStyle.Editor)
            }}
            _afterMounting = {( target:CustomElement< HTMLSelectElement , {} > ) => {

                if(items.length == 2 && typeof items[1] == 'function'){

                    let [ state ] = items;

                    (state as IStoreState<string[]>['state']).subscribe( target , ( newList ) => {
    
                        for( const e of [...target.children].reverse() ){
                            e.remove();
                        }
    
                        for(const e of newList){
                            DOMRender( <option _textContent = {e}/> , target ); 
                        }
    
                    })

                    for(const e of (state as IStoreState<string[]>['state']).value as string[]){
                        console.log({e})
                        DOMRender( <option _textContent = {e}/> , target ); 
                    }

                }
                else{

                    for(const e of items as string[]){
                        DOMRender( <option _textContent = {e}/> , target ); 
                    }

                }

            }}/>
    </div>;
}