import EditorJS from '@editorjs/editorjs';
export declare const editorState: import("thorium-framework").State<EditorJS | null>, setEditorState: (value: EditorJS | null) => EditorJS | null;
/**
 * Le code ci-dessus est un composant Thorium TypeScript appelé "HelloWorld" qui rend un éditeur en utilisant la
 * bibliothèque EditorJS et enregistre le contenu dans une base de données lorsqu'il est modifié.
 * @returns Le code renvoie un élément JSX qui représente un conteneur div avec un composant d'éditeur à l'intérieur.
 * Le composant d'éditeur est créé à l'aide de la bibliothèque EditorJS et comporte divers outils configurés,
 * tels que des en-têtes, une console, des avertissements et des erreurs. Le composant d'éditeur dispose également
 * de gestionnaires d'événements pour les événements onReady et onChange.
*/
export declare const HelloWorld: () => any;
