/*Основной конфигурационный файл */

module.exports = {
    secret: 'SomeSecretKey', //секретное ключ [для создания JWT-токенов]
    session: { session: false}, //сессия [для авторизации]
    database: 'mongodb://127.0.0.1:27017/budget' //подключение к mongodb
}