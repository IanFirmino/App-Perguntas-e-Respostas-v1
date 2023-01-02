const express = require('express');
const router = express.Router();
const PerguntaService = require('../services/service.perguntas');
const RespostaService = require('../services/service.respostas');
const RespostaModel = require('../models/resposta');

router.get('/responder/:id', responderPergunta);
router.get('/:id', listarRespostas);
router.post('/salvar', salvarResposta);

module.exports = router;

async function listarRespostas(req, res){
    perguntaId = req.params.id === undefined ? req.body.id : req.params.id;

    const pergunta = await PerguntaService.encontrarPergunta({
            id: perguntaId
    });

    respostas = await RespostaModel.findAll({
        where: {
            perguntaId: perguntaId
        }
    });
    
    res.render("respostas",{
        respostas: respostas,
        pergunta: pergunta[1]
    });
}

async function responderPergunta(req, res){
    const perguntaid = req.params.id;

    console.log(perguntaid);
    pergunta = await PerguntaService.encontrarPergunta({
        id: perguntaid
    });

    console.log(pergunta[1].titulo);
        
    res.render("responder", {
        id: pergunta[1].id,
        titulo: pergunta[1].titulo,
        descricao: pergunta[1].descricao
    });
}

async function salvarResposta(req, res){
    const perguntaId = req.body.id
    const resposta = req.body.resposta

    await RespostaService.criarResposta({
        perguntaId: perguntaId,
        resposta: resposta
    });

    await listarRespostas(req, res);

}

