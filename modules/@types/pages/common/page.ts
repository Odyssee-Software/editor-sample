import { OutputData , OutputBlockData } from '@editorjs/editorjs';
import { TPageConfiguration } from './page-configuration';

export type TPageBlock = {
  id:string;
  type:string;
  data:OutputBlockData
}

export type TPageContent = {
  blocks:TPageBlock[];
  time:number;
  version:string;
}

export type TPage = {
  type:string;
  id:string;
  _id:string;
  name:string;
  content:OutputData;
  configuration:TPageConfiguration;
};