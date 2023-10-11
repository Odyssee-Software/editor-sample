import './styles.module.css';
import styles from './styles.module.css';

console.log("Hello World 🚀");
console.log("Bonjour je suis une ligne supplémentaire.");


let { body } = document;
let h2 = document.createElement("h2");
h2.setAttribute('class' , styles.Title);
h2.innerText = "Title";

console.log(<div>hello</div>);

body.appendChild(h2);

