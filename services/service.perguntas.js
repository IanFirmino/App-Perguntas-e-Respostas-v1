const Pergunta = require('../models/pergunta');

module.exports = {
    criarPergunta,
    todasPerguntas,
    atualizarPergunta,
    deletarPergunta,
    encontrarPergunta
}

async function todasPerguntas(){

    try{
        const perguntas = await Pergunta.findAll();
        
        return [true, perguntas];

    }catch(Err){
        return [false, Err];
    }

}

async function criarPergunta(params){

    try{
        await Pergunta.create({
            titulo: params.titulo,
            descricao: params.descricao
        });
        
        return [true, params];
        
    }catch(Err){
        return [false, Err];
    }

}

async function atualizarPergunta(params){

    try{
        Pergunta.update({
            titulo: params.titulo,
            descricao: params.descricao
        },{
            where: {id: params.id}
        });
        
        return [true, params];

    }catch(Err){
        return [false, Err];
    }

}

async function deletarPergunta(params){

    try{
        Pergunta.destroy({
            where: {id: params.id}
        });
            
        return [true, 200];

    }catch(Err){
        return [false, Err];
    }
}


async function encontrarPergunta(params){

    try{
        const pergunta = await Pergunta.findOne({
            where: {id: params.id}
        });
        
        return [true, pergunta];
        
    }catch(Err){
        return [false, Err];
    }

}

