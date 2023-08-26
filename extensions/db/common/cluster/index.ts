import { Collection , DataStoreOptions } from '../collection';
import { v4 as uuid4 } from "uuid";

import * as fs from 'fs';

export class Cluster{

  static create( clusterPath:string ){



  }

  static delete(){

  }

  static load(){

  }

  #_collections:Record<string,any> = {};

  addCollection( options:DataStoreOptions ){

    let collectionId = uuid4();

    this.#_collections[collectionId] = new Collection({ filename : `${collectionId}.db` , autoload : true })

  }

  loadCollection(){

  }

  useCollection(){
    
  }

  unloadCollection(){

  }

  deleteCollection(){

  }

}