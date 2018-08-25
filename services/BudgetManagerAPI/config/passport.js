/*модуль для работы аутенификации и поиска пользователя по JWT токену */

const PassportJWT = require('passport-jwt'); //для организации аутенификации
const config = require('./index.js'); //основной файл конфигурации
const models = require('../../BudgetManagerAPI/app/setup'); //модели

const ExtractJWT = PassportJWT.ExtractJwt;
const Strategy = PassportJWT.Strategy;

//создаём экземпляр модели User
module.exports = (passport) => {
    const User = models.User; 
    const parameters = {
        secretOrKey: config.secret,
        //jwt token, полученный от клиента
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() 
    };
    
    //находим пользователя по JWT токену полученному от клиента
    passport.use(new Strategy(parameters, (payload, done) => {
        User.findOne({id: payload.id}, (err, user) => {
            if(err) return done(err, false);
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }                
        });
    }));
}