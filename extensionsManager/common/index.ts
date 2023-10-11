import { Extension , IExtension } from 'thorino-ipc';

const ExtensionsManager = () => {

  return {
    'deploy' : () => {},
    'load' : () => {},
    'unload' : () => {}
  }

}

export default Extension( ExtensionsManager() ) as IExtension;