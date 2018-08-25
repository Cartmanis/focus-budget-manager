/*Конфигурационный файл создания express сервера */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const consign = require('consign');
const cors = require('cors');
const passport = require('passport');
/*благодаря передачи параметра passport нашему модулю ./passport.js
мы можем не подключать внешний модуль passport в нашем модуле ./passport.js*/
const passportConfig = require('./passport')(passport); 
const jwt = require('jsonwebtoken');
const config = require('./index.js');
const database = require('./database')(mongoose, config);


app.use(express.static('.')); //статика
app.use(bodyParser.urlencoded({extended: true})); //парсер для req запросов
app.use(bodyParser.json()); //настройка body-parser в json
app.use(morgan('dev'));//логирование HTTP- запросов
//вспомогательное средство, которое можно использовать для активации CORS
app.use(cors());
app.use(passport.initialize());

app.set('SomeSecretKey', config.secret); //установка секретного ключа

/*
Как вариант, вместо использования пакета cors, можно сделать следующее:
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/

//для организации автозагрузки скриптов
 consign({cwd: 'services'})
    .include("BudgetManagerAPI/app/setup")
    .then("BudgetManagerAPI/app/api")
    .then("BudgetManagerAPI/app/routes")
    .into(app); 

module.exports = app;