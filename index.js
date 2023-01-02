const express = require('express');
const app = express();
const connection = require('./database/db');
const bodyParser = require("body-parser");

connection.authenticate().then(() => {
    console.log('Conexão com o banco de dados realizada')
}).catch((Err) => {
    console.log(Err);
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/home', require('./controllers/home'));
app.use('/perguntas', require('./controllers/perguntas'));
app.use('/respostas', require('./controllers/respostas'));
app.use('/verificar', require('./controllers/home'));


app.listen(8080, () => {
    console.log("App rodando");
});


    

