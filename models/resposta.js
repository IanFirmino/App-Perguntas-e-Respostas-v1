const connection = require('../database/db');
const sequelize = require('sequelize');

const resposta = connection.define('respostas', {
    perguntaId: {
        type: sequelize.INTEGER
    },
    resposta: {
        type: sequelize.TEXT
    }    
});

connection.sync({force: false}).then(() => {});

module.exports = resposta;
