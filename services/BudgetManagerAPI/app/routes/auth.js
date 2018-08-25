/*Маршрут auth.js для api auth.js */

const models = require('../setup'); //получаем модели

/*Модуль routes/auth получает объект app Express- благодаря чему можно
установить маршруты
*/
module.exports = (app) => {
    //константа api для работы с файлом api/auth.js
    const api = app.BudgetManagerAPI.app.api.auth; 

    app.route('/') //маршрут по умолчанию
        .get((req, res) => res.send("Test"));
    
    app.route('/api/v1/auth')
        .post(api.login(models.User)); //передаем в метод login модель User    
}