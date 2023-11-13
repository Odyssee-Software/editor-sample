/**
 * This TypeScript code defines an application that uses the `thorino-ipc` library and the `nedb`
 * database to insert data into a database.
 * @returns The code is returning an object with a single method called `insert`.
 */
import { Extension , IExtension } from 'thorino-ipc';
import Datastore from 'nedb';

import { TPage } from 'types-pages'; 

import { 
  createPage , 
  findPage ,
  findAllPages , 
  updatePage,
} from './pages';

const Application = () => {

  console.log('Application');

  const Database = new Datastore({ filename: 'datafile.db', autoload: true });

  return {
    /* The `insert` function is a method that takes in two parameters: `req` and `res`. */
    insert : ( req , res ) => {
      let { chanel , data } = req;
      Database.insert( data , (err,result) => { res.send( ( err ? err : result ) ) })
    },
    find : ( req , res ) => {
      let { chanel , data } = req;
      Database.find( data , (err,result) => { res.send( ( err ? err : result ) ) })
    },
    update : (req , res ) => {
      let { chanel , data } = req;
      let { search , insert } = data;

      updatePage( search , insert )
      .then(( result ) => res.send(result))
      .catch(( error ) => res.send(error));

    },
    'find-page' : ( req , res ) => {

      let { chanel , data } = req;

      findPage( data )
      .then( (result) => res.send( result ) )
      .catch( (error) => res.send( error ) )

    },
    'find-all-pages' : ( req , res ) => {

      findAllPages( )
      .then( (result) => res.send( result ) )
      .catch( (error) => res.send( error ) )

    },
    'create-page' : ( req , res ) => {

      let { chanel , data } = req;
      createPage( data as TPage )
      .then( (result) => res.send( result ) )
      .catch( (error) => res.send( error ) )

    }
  }
  
}

export default Extension( Application() ) as IExtension;