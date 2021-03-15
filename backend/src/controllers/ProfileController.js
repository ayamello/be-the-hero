const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const ong_id = request.headers.authorization; //acessar os dados da ong logada
        
        const incidents = await connection('incidents') //procurar todos os casos da ong
            .where('ong_id', ong_id)
            .select('*')
        
            return response.json(incidents);        
    }
}