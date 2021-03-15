const express = require('express'); //variável recebendo funcionalidades do módulo express
const cors = require('cors'); //importando o cors
const routes = require('./routes'); //importando as rotas do arquivo routes

const app = express(); //variável app armazenando a aplicação

app.use(cors());
app.use(express.json()); //informar para o app que será usado json para compor as requisições
app.use(routes);

app.listen(3333); 