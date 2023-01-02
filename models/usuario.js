const connection = require('../database/db');
const sequelize = require('sequelize');
const tokenValidacao = new Date(Date.now() + 5 * 60000)

const usuario = connection.define('usuarios', {
    email: {
        type: sequelize.TEXT
    },
    token: {
        type: sequelize.TEXT
    },
    dataValidacaoToken: {
        type: sequelize.DATE,
        defaultValue: tokenValidacao
    }    
});

connection.sync({force: false}).then(() => {});

module.exports = usuario;
