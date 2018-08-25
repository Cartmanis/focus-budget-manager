/*Публичный api для работы с пользователями - создание, выборка, удаление пользователей...*/
const mongoose = require('mongoose');

const api = {};

/*Метод создания учётной записи администратора - нужна только для 
отладочных целей- потом ее нужно будет удалить */
api.createAdmin = (User) => (req, res) => {
    const admin = new User({
        username: 'admin',
        password: 'admin',
        clients: []
    });
    admin.save(err => {
        if(err) {            
            res.status(400).send('Учетная запись администратора уже была создана ранее!');
            throw error;
        } 
        console.log('Учётная запись администратора успешно создана');
        res.json({success: true});        
    })
}

//Метод для тестовых целей возвращает всех пользователей
api.getUsers = (User, BudgetToken) => (req, res) => {
    const token = BudgetToken;
    //если token присутсвует ???, то ищем всех пользователей из БД
    console.log(token);
    if(token) {
        User.find({}, (err, users) => {
            if(err) throw err;
            res.status(200).json(users);
        }); 
    } else res.status(403).send({success: false, message: 'Пользователь не авторизован'});
}

//Метод для регистрации новых пользователей

api.signup = (User) => (req, res) => {
    if(!req.body.username || !req.body.password) {
        res.json({success: false, message: 'Пожалуйста введите имя пользователя и пароль'});
        return;
    }
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        clients: []
    });

    newUser.save((err) => {
        if(err) {
            return res.status(400).json({success: false, 
            message: 'Данный польователь уже присутсвует. Придумайте другое имя'});
        }

        res.json({success: true, message: 'Новый пользователь успешно добавлен'});
    })
}

module.exports = api;