const connection = require('../database/db');
const sequelize = require('sequelize');

const pergunta = connection.define('pergunta', {
    titulo: {
        type: sequelize.TEXT
    },
    descricao: {
        type: sequelize.TEXT
    }
});

connection.sync({force: false}).then(() => {});

module.exports = pergunta;
