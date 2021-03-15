const connection = require('../database/connection');

module.exports = {
    //Listar incidents
    async index(request, response){
        const { page = 1 } = request.query; //buscar parametro page, senão existir, utilizar valor padrão 1 (página 1)

        const [count] = await connection('incidents').count() //contar o total de casos
            
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //relacionamento entre a tabela incidents e ongs
            .limit(5) //limitar a quantidade de casos 
            .offset((page - 1) * 5) //a cada página pular 5 registros - ex: página 2, começar no 6º incident, página 3, começar no 11º incident. Exceto a página 1 que tem que começar do 1 
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]); //exibir todos os dados da tabela incidents, mas exibir só os dados escolhidos da tabela ongs 
        
        response.header('X-Total-Count', count['count(*)']); //exibir total de casos no cabeçalho da resposta

        return response.json(incidents);
    },

    //Cadastrar incidents
    async create(request, response) {
        const { title, description, value } = request.body; //acessar o corpo das requisições
        const ong_id = request.headers.authorization; // request.headers = cabeçalho da requisição(guarda informações do contexto da requisição 
                         //empresa/usuário logado,) - por ele dá pra ver qual ong que tá criando o incident

        const [id] = await connection('incidents').insert({ //inserindo dados na tabela
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });
    },

    //Deletar um incident
    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id) //selecionar se o id da tabela = id da const 
        .select('ong_id')
        .first(); //vai retornar apenas um resultado porque só vai ter um registro com o id

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}
