/**
 * Created by STR02119 on 8/2/2017.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {path : '/textChatApi/socket.io'});
var PORT = "8093"
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    let useridentidy;
    socket.on('userconnect', function (user) {
        useridentidy = user;
        console.log('Status -> user : '+user+' connected !!!');
    })
    socket.on('chat message', function(msg){
        console.log(msg.user+' : '+msg.message)
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function(){
        console.log('Status -> user : '+useridentidy+' disconnected !!!');
    });
});


http.listen(PORT, function(){
    console.log('listening on :'+PORT);
});