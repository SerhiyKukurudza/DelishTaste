const mysql = require('mysql');
const colors = require('./miscellaneous');

const connectionDataBase = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

connectionDataBase.connect((error) => {
    if (error) {
        console.log('Connecting Error:'.red.bgRed, colors.red(error));  
    } else {
        console.log('MySQL Connected...'.blue);
    }
  });

module.exports = connectionDataBase;