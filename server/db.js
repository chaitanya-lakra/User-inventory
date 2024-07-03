import mysql from 'mysql';


export const connection = mysql.createConnection({
    host: 'localhost',  // MySQL server address
    user: 'root', // MySQL username
    password: '', // MySQL password
    database: 'test' // MySQL database name
});
connection.connect(function (err) {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId);
});



