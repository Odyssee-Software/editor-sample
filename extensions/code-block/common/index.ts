import { Extension , IExtension } from 'thorino-ipc';

const Application = () => {

  return {
    'ensureRepertoryIntegrity' : () => {},
    'launchCompilationWatcher' : () => {},
    'openEditor' : () => {},
    'createCodeBlock' : () => {},
    'deleteCodeClock' : () => {},
    'installNpmModule' : () => {},
    'findNpmModule' : () => {}
  }

}

export default Extension( Application() ) as IExtension;