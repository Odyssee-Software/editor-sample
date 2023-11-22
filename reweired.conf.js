/**
  * @param config - Le paramètre config est un objet qui représente la configuration d'une construction webpack.
  * Il contient diverses propriétés et valeurs qui définissent la manière dont le processus de construction doit être
  * exécuté. Dans cet extrait de code, l'objet config est modifié en ajoutant une propriété alias
  * à la propriété resolve.
  * @returns La fonction configuration renvoie l'objet config modifié.
*/
const configuration = ( config ) => {

  /* Cette ligne utilise une affectation par déstructuration pour
  extraire la valeur de la propriété entry de l'objet config et l'assigner à une nouvelle variable
  appelée compilationTargetPath. Elle représente l'url target de compilation. */
  let { entry:compilationTargetPath } = config;

  config.resolve = {
    ...config.resolve,
    alias : {
      '@components' : path.resolve( compilationTargetPath , 'components'),
      '@thorium-components' : path.resolve( compilationTargetPath , 'thorium-components'),
      '@modules' : path.resolve( compilationTargetPath , 'modules'),
      '@utils' : path.resolve( compilationTargetPath , 'utils'),
      '@context' : path.resolve( compilationTargetPath , 'context'),
      '@preload' : path.resolve( compilationTargetPath , 'preload'),
    }
  }

  return config;

}

module.exports.default = configuration;