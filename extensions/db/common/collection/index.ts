import Datastore , { DataStoreOptions } from 'nedb';
export { DataStoreOptions };
export class Collection extends Datastore{

  static create( collectionOptions:DataStoreOptions ){
    return new Collection(collectionOptions);
  }

  static delete(){

  }

  static load(){

  }

}