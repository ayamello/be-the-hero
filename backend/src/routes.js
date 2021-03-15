//Importações
const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController')

const connection = require('./database/connection');

const routes = express.Router(); // desacoplar o módulo de rotas do express em uma nova variável

routes.post('/session', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);
routes.delete('/ongs/:id', OngController.delete);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);

module.exports = routes; // exportar rotas para deixá-las disponíveis para serem acessadas pelo arquivo principal - index.js