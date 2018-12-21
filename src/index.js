import './style.css';
import Unicorn from './unicorn.png';
import printMe from './print.js';

function component() {
  let element = document.createElement('div');

  element.innerHTML = 'Hello world';
  element.classList.add('hello');

  let myUnicorn = new Image();
  myUnicorn.src = Unicorn;
  myUnicorn.style.maxWidth = '500px';

  element.appendChild(myUnicorn);

  return element;
}

document.body.appendChild(component());

console.log('test');


if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!');
    printMe();
  });
}
