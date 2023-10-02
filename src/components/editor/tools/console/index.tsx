import { DOM } from 'thorium-framework';
import { createTerminal } from 'terminatorator';
import { computer } from '@neutralinojs/lib';
import style from './style.module.css';
// import Datastore from 'nedb';

import { insert , find } from '@modules/database';

export class Console{

  static get toolbox() {
    return {
      title: 'Console',
      icon : `C`
      // icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
    };
  }

  render(){
    return DOM.render( <div class = { style.Terminal }>
      <div _afterMounting = {async (target) => {

        let { name } = await computer.getOSInfo();
        // const new Datastore();

        createTerminal( target , {
          welcome: `・●・ DATABASE CONSOLE ・●・`, // will be printed on start
          theme: 'interlaced', // || 'modern' || 'white' - can be changed at runtime
            // using the `theme` command
          commands: {
            '/usr/local/bin/database': {
              handler : async ( args , session ) => {
                
                let response = {};

                try{
                  if('insert' in args)response = (await insert( JSON.parse(args.insert) )).detail;
                  else if('find' in args)response = (await find( JSON.parse(args.find) )).detail;
                }
                catch(error){
                  console.log(error);
                }
                finally{
                  return JSON.stringify(response);
                }

              },
              args : {
                'x' : 'test'
              }
            }
          }, // see `Adding custom commands` below
          files: {}, // see `Files` below
          history: 'cli-history', // the localStorage key used to store terminal history
          user: name // which user to be logged in as
        })

      }} />
    </div> )
  }

  save(blockContent){
    return {
      url: blockContent.value
    }
  }

}