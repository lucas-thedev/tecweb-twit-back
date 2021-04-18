const dbConfig = require('../config/database');

let mysql = require('mysql');
let connection = mysql.createConnection(dbConfig)

let connect = {
  createConnection() {  
     connection.connect(function(err) {
         if (err) {
           return console.error('error: ' + err.message);
         }
         console.log('Connected to the MySQL server.');
     });
     return connection;
   }
 }

 module.exports = connect;
