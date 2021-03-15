const knex = require('knex'); //importação do knex
const configuration = require('../../knexfile'); //imporatação das configurações do bd contidas no knexfile

const connection = knex(configuration.development); //criação de conexão 

module.exports = connection; //exportação da conexão