/*модуль конфигурации для подключения к базе данных */

module.exports = (mongoose, config) => {
    const database = mongoose.connection;
    /*Переключили mongoose на использование стандартного объекта Promise. 
    Если этого не сделать, можно столкнуться с предупреждениями, 
    выводимыми в консоль*/
    mongoose.Promise = Promise;
    console.log(config.database);
    mongoose.connect(config.database, {useNewUrlParser: true} 
         /* ,{userMongoClient: true, promiseLibary: global.Promise}  */
    );

    //события при работе с базой данных
    database.on('error', error => console.log(`Ошибка подключения к базе данных:
    ${error}`));
    database.on('connected', () => console.log('Соединение с  базой данных'));
    database.on('disconnected', () => console.log('Отключение от базы данных'));

    process.on('STING', () => {
        database.close(() => {
            console.log('Процесс завершен. Соединение с базой данных закрыто');
            process.exit(0);
        })
    });
};