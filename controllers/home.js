const express = require('express');
const router = express.Router();
const {v4: uuidv4} = require('uuid')
const {sendLoginMail} = require('../mail/mail');
const usuarioService = require('../services/service.usuarios');
const perguntaService = require('../services/service.perguntas');

router.get("/", home);
router.post("/login", login);
router.post("/verificar", verificarTokenLogin);

module.exports = router

function home(req, res){
    res.render("index");
}

async function login(req, res){
    const email = req.body.email;
    const token = uuidv4();
    
    try{
        await sendLoginMail({
            to: email,
            token: token
        });
        
        await usuarioService.criarUsuario({
                email: email,
                token: token
        });
        
        res.render("verificar", {
            email: email,
            msg: false
        });

    }catch(error){
        console.log(error);
    }   
}

async function verificarTokenLogin(req, res){

    const token = req.body.token;
    const email = req.body.mail;
    const horaAgora = new Date(Date.now());

    const user = await usuarioService.encontrarUsuario({
        email: email,
        token: token
    });

    if (!user[1] || user[1].token != token){
        res.render("verificar",{
            email: email,
            msg: "Autenticação inválida, tente novamente!"
        });
    }else{

        var perguntas = await perguntaService.todasPerguntas();

        res.render("perguntas", {
                perguntas: perguntas[1],
                msg: false
            });
        }

}



