const Resposta = require('../models/resposta');

module.exports = {
    criarResposta,
    listarRespostas
}

async function criarResposta(params){

    try {
        await Resposta.create({
            perguntaId: params.perguntaId,
            resposta: params.resposta
        });
            
        return [true, 200];
        
    }catch(Err){
        return [false, Err];
    }

}

async function listarRespostas(){

    try{
        respostas = await Resposta.findAll();

        return [true, respostas];
        
    }catch(Err){
        return [false, Err];
    }

}
