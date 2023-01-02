const usuario = require('../models/usuario');

module.exports = {
    criarUsuario,
    encontrarUsuario
}

async function criarUsuario(params){

    try{
        const user = await usuario.create({
            email: params.email,
            token: params.token
        });

        return [true, user];
        
    }catch(Err){
        [false, Err];
    }

}

async function encontrarUsuario(params){

    try{
        const user = await usuario.findOne({
            where: {
                email: params.email,
                token: params.token
            },
            order:[['Id','DESC']]
        });

        return [true, user];

    }catch(Err){
        return [false, Err];
    }
}