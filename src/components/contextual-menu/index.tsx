import { CustomElement } from 'thorium-framework';
import { ContextualMenu as ContextualMenuBase , ContextualMenuProps } from '@thorium-components/contextual-menu';

import * as dynamics from 'dynamics.js';

const afterountingContextualMenu = ( target:CustomElement<HTMLDivElement,{}> ) => {

  let children = Object.values(target.children);

  dynamics.animate(target, {
    scale: 1,
    opacity: 1
  }, {
    type: dynamics.spring,
    frequency: 200,
    friction: 270,
    duration: 800
  })

  let i = 0;
  for(const element of children){

    dynamics.css( element , {
      opacity : 0,
      translateY : 20
    } )

    dynamics.animate( element , {
      opacity : 1,
      translateY : 0
    } , {
      type: dynamics.spring,
      frequency: 300,
      friction: 435,
      duration: 1000,
      delay : 100 + ( i * 2 )
    } )

    i += i + 1;

  }

}

export const ContextualMenu = ( props:ContextualMenuProps ) => {

  return ContextualMenuBase({
    ...props , 
    afterMouning : afterountingContextualMenu 
  });

}