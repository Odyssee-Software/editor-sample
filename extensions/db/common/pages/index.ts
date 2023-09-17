import { Cluster } from "../cluster/index";

const cluster = Cluster.create( { filename : 'database/pages.db' , autoload : true } );

export type TPage = {
  _id?:string;
  name:string;
}

export const findAllPages = async ( ) => {
  return new Promise((next , reject) => {
    cluster.find({} , (error , results) => {
      if(error)reject(error);
      else next(results);
    })
  })
}

export const createPage = async (pageOption:{ name:string }) => {

  let preSearch:boolean = await new Promise((next,reject) => {

    cluster.findOne(pageOption , (error , result) => {
      console.log({error , result})
      if(error)reject(error);
      next(result);
    });

  });

  return preSearch ? preSearch : (() => {

    return new Promise((next,reject) => {
      cluster.insert(pageOption , (error , result) => {
        if(error)reject(error);
        else next(result);
      })
    })

  })()

}

export const updatePage = async ( query:Record<string,any> , insert:Record<string,any> ) => {
  return new Promise((next,reject) => {
    cluster.update(query , insert , {} , async (error,result) => {
      await cluster.persistence.compactDatafile();
      if(error)reject(error);
      else next(result);
    })
  })
}

export const findPage = ( query:Record<string,any> ) => {
  return new Promise((next,reject) => {
    cluster.find( query , (error,result) => {
      if(error)reject(error);
      else next(result)
    } )
  })
}