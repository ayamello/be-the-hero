const crypto = require('crypto');
const connection = require('../database/connection');

//'async' de assíncrona e o 'await' para só executar o 'return response.json() após o insert
module.exports = {
    //Listar ongs
    async index(request, response){
        const ongs = await connection('ongs').select('*'); 

        return response.json(ongs);
    },

    //Cadastrar ongs
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body; //acessar o corpo das requisições

        const id = crypto.randomBytes(4).toString('HEX'); //gerar sequência de caracteres aleatórios e converter para String com valores hexadecimais

        await connection('ongs').insert({ //inserindo dados na tabela
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        return response.json({ id });
    },

    //Deletar uma ong
    async delete(request, response) {
        const id = request.headers.authorization;

        await connection('ongs').where('id', id).delete();

        return response.status(204).send();
    },

    //Login
    async login(request, response) {
        const id = request.params;

        
    },

}