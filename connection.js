var mysql = require('mysql');

var con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'studentManagementSystem'
});

module.exports = con;