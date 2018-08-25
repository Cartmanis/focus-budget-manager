/*файл создания экземпляра модели User 
Делаем мы это для того, чтобы обеспечить загрузку моделей до того, 
как в приложении будет загружено что-то другое.*/
const mongoose = require('mongoose');
const UserMOdel = require('./services/BudgetManagerAPI/app/models/user');

const models = {
    User: mongoose.model('User')
}
module.exports = models;