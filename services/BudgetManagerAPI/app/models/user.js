/* модель User, которая будет использоваться в mongoose для JWT- аутенификации */

const mongoose = require('mongoose'); //для создания модели User
const bcrypt = require('bcrypt'); //для хеширования паролей пользователей


//схема mongoose для создания модели User
const Schema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    clients: [{}] //список клиентов
    /*
    В сведения о клиенте будут входить адрес электронной почты (email), 
    имя (name), телефон (phone), и финансовые документы (budgets). 
    Финансовый документ включает такие данные, как его состояние (state), 
    заголовок (title), элементы (items) и цена (price).
    */    
});

/*middleware для сохранения хеша в поле password */

/* Здесь не будем пользоваться стрелочными функциями 
из-за автоматической привязки к лексической области видимости*/
Schema.pre('save', async function(next) {
    const user = this; //запоминаем контекст this- пользователя
    if(this.isModified('password') || this.isNew) {
        try{
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;
            next(); 
        } catch(err) {
            next(err);
        }
    } else {
        return next();
    }        
});

//Метод, для сравнения пароля правомерности доступа пользователя в системе
Schema.methods.comparePassword = function (password) {
    //pasword - пароль введенный пользователем
    //this.pasword - хеш пароль, хранящейся в базе данных     
    return new Promise((resolve, reject) => {
        (async () => {
            try{
                matches = await bcrypt.compare(password, this.password);
                resolve(matches);
            } catch (err) {
                reject(err);
            }
        })();        
    });           
};

//наконец создаём саму модель User из полученной схемы
mongoose.model('User', Schema); 