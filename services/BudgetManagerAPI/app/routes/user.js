/* /*Маршрут для работы с api/user.js */ 

const passport = require('passport'); //для организации аутенификациии
const config = require('../../config'); //для настройки параметров сессии
const models = require('../setup'); //подключаем модели

module.exports = (app) => {
    const api = app.BudgetManagerAPI.app.api.user;

    //создаём учетную запись администратора
    app.route('/api/v1/setup')
        .post(api.createAdmin(models.User));

        //проверяем аутенификацию и возвращаем всех пользователей
    app.route('/api/v1/users')
        .get(passport.authenticate('jwt', config.session),
        api.getUsers(models.User, app.get('SomeSecretKey')));

        //создаём одного пользователя
    app.route('/api/v1/signup')
        .post(api.signup(models.User));    
        
}