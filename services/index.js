/*основной файл сервера - точка входа в приложение сервера */

const http = require('http');

/*подключение express */
const BudgetManagerAPI = require('./services/BudgetManagerAPI/config/app.js');
const Server = http.Server(BudgetManagerAPI);
const PORT = process.env.PORT || 3001;
const LOCAL = '0.0.0.0';

Server.listen(PORT, LOCAL, () => 
console.log(`Приложение успешно запущенно на порту: ${PORT}`));
