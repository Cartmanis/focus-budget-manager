/* файл создает некоторый публичны api для работы с аутенификацией */

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../../config')

const api = {}; //объект с публичным api

/*api авторизации пользователя- передаем параметр User, так как тут нужен
метод для доступа к модели User*/
api.login =  (User) => async  (req, res) => {        
    try{
        const user = await User.findOne({username: req.body.username});
        if(!user) {        
            res.status(401).send({success: false, message: 
                `Сбой авторизации: Пользователь не найден`});
        } else {                 
            comparePassword(user, req, res);
        }
    } catch (err) {
        res.status(500).send({success: false, message: 
            `Серверная ошибка авторизации при поиске пользователя: ` + err});
    }
}


/*метод получает заголовки Autorization и парсит token */
api.veify = (headers) => {
    if(headers && headers.autorization) {
        const split = headers.autorization.split(' ');
        if(split.length ===2) {
            console.log(split[1]);
            return split[1];
        } 
        return null;
    }
    return null;
}

//вспомогательные функции
const comparePassword = async (user, req, res) => {
    try {
        const mathes = await user.comparePassword(req.body.password);    
        if(mathes) {
            const token = jwt.sign({user}, config.secret); //получили токен пользователя
            res.json({success: true, message: 'Token granted', token });
        } else {
            res.status(401).send({success: false, message: 
                `Сбой авторизации: Неверный пароль`});
        }
        } catch (err) {
            res.status(500).send({success: false, message: 
                `Серверная ошибка авторизации при сравнении пароля: ` + err});
        }
    
}

module.exports = api; //экспортируем объект api