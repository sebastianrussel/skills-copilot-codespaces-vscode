//create web server
//create server
var express = require('express');
var app = express();
//create server
var server = require('http').createServer(app);
//create io
var io = require('socket.io').listen(server);
//create mysql
var mysql = require('mysql');
//create connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'comment'
});
//connect
connection.connect();
//create table
connection.query('CREATE TABLE IF NOT EXISTS comments (id INT AUTO_INCREMENT PRIMARY KEY, comment TEXT)', function (err) {
    if (err) throw err;
});
//create root
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
//create server
server.listen(3000);
//create socket
io.sockets.on('connection', function (socket) {
    //create select
    connection.query('SELECT * FROM comments', function (err, rows) {
        if (err) throw err;
        //create loop
        for (var i in rows) {
            //create emit
            socket.emit('message', rows[i].comment);
        }
    });
    //create on
    socket.on('send', function (data) {
        //create insert
        connection.query('INSERT INTO comments (comment) VALUES(?)', data, function (err, res) {
            if (err) throw err;
            //create emit
            io.sockets.emit('message', data);
        });
    });
});
//create close
connection.end();
//create root
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
//create server
server.listen(3000);
//create socket
io.sockets.on('connection', function (socket) {
    //create select
    connection.query('SELECT * FROM comments', function (err, rows) {
        if (err) throw err;
        //create loop
        for (var i in rows) {
            //create emit
            socket.emit('message', rows[i].comment);
        }
    });
    //create on
    socket.on('send', function (data) {
        //create insert
        connection.query('INSERT INTO comments (comment) VALUES(?)', data, function (err, res) {
            if (err) throw err;
    