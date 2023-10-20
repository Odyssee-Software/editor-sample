import { Dispatcher } from "thorino-ipc";

export const ExtensionsManager = Dispatcher( 'extensions.manager' );

export const Deploy = ( sourceCode:string ) => {
  return ExtensionsManager( 'deploy' , sourceCode )
}

export const Load = () => {
  return ExtensionsManager( 'load' , {} )
}

export const Unload = () => {
  return ExtensionsManager( 'unload' , {} )
}