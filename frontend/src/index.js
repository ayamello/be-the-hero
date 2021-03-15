import React from 'react';
import ReactDOM from 'react-dom'; //ireactdom = integração do react com o navegador
import App from './App'; //importando o app.js

ReactDOM.render(<App />, document.getElementById('root')); //renderizando(colocando em tela) o app 
               //App entre tags (<>) pois é um componente e com letra maiúscula
               //um componente no react é uma função que retorna html