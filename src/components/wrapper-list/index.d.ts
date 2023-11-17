import { IStoreState } from 'thorium-framework/modules/context';
import { CustomElementDefultProps } from '@thorium-components/index';
export type WrapperItemProps = {};
export type WrapperOptions = {
    items: IStoreState<string[]>['state']['mutator'] | string[];
    label?: string;
} & CustomElementDefultProps;
export declare const WrapperList: (props: WrapperOptions) => any;
