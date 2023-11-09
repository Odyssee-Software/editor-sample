import { DOM , CustomElement , DesignSystem , PaternArea } from 'thorium-framework';

export type InputProps = {
    placeholder:string
}

export const InputPatern = DesignSystem().register('thorium' , {
    baseName : 'input',
    attr : {},
    childrens : [],
    proto : {},
    
});
  
export const InputConnector = InputPatern.connector<any>();

