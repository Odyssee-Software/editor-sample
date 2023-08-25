/**
 * This TypeScript code defines an application that uses the `thorino-ipc` library and the `nedb`
 * database to insert data into a database.
 * @returns The code is returning an object with a single method called `insert`.
 */
import { Extension } from 'thorino-ipc';
import Datastore from 'nedb';

const Application = () => {

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
  }
  
}

Extension( Application() );