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

}