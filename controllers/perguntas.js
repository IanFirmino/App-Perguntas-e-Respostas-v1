const express = require('express');
const router = express.Router();
const PerguntaService = require('../services/service.perguntas');

router.get("/", listarPerguntas);
router.post("/novapergunta", novaPergunta);
router.get("/alterar/:id", alterar);
router.get("/deletar", deletarPergunta);
router.get("/perguntar", perguntar);
router.post("/alterarPergunta", alterarPergunta)

module.exports = router;

async function perguntar(req, res){
    res.render("perguntar");
}

async function alterar(req, res){

    const params = req.params;

    const pergunta = await PerguntaService.encontrarPergunta(params);

    res.render("alterar", {
        pergunta: pergunta[1]
    });
}

async function listarPerguntas(req, res){

    const perguntas = await PerguntaService.todasPerguntas();

    res.render("perguntas", {
        perguntas: perguntas[1],
        msg: false
    });

}

async function novaPergunta(req, res){

    titulo = req.body.titulo;
    descricao = req.body.descricao;
 
    await PerguntaService.criarPergunta({
        titulo: titulo,
        descricao: descricao
    });
    
    await listarPerguntas(req, res);

}

async function alterarPergunta(req, res){

    id = req.body.titulo;
    titulo = req.body.titulo;
    descricao = req.body.descricao;
    
    await PerguntaService.atualizarPergunta({
        id: id,
        titulo: titulo,
        descricao: descricao
    });
    
    await listarPerguntas(req, res);
}

async function deletarPergunta(req, res){
    const id = req.body.id;

    await PerguntaService.deletarPergunta({
        id: id
    });
        
    await listarPerguntas(req, res);

}




