const mysql = require('mysql');
const passwords = require('./passwords');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: passwords.db,
  database: 'initech'
});

connection.connect((err) => {
  if (err) {
    console.log('Error connecting to DB!');
  } else {
    console.log('Connected to DB!');
  }
});

module.exports = connection;