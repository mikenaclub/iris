/**
 * Created by STR02119 on 8/2/2017.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = "8093"
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    let useridentidy;
    let room = "";

    socket.on("changeroom",function (changeroom) {
        console.log(useridentidy+"-> change to room :" +changeroom)
        if(room !== ""){
            socket.leave(room)
        }
        socket.join(changeroom);
        room = changeroom;

        //alet user join to client side
        let alertmsg = '{"user":"From Server","message":"'+useridentidy+" connected in room : "+changeroom+'"}'
        let jsonalertmsg = JSON.parse(alertmsg)
        io.in(room).emit('msg alert', jsonalertmsg);
    })



    /*socket.on('room', function(room) {
        socket.join(room);
    });*/

    socket.on('userconnect', function (user) {
        useridentidy = user;
        console.log('Status -> user : '+user+' connected !!!');
    })
    socket.on('chat message', function(msg){
        console.log(msg.user+' : '+msg.message)
        /*io.emit('chat message', msg);*/
        io.in(room).emit('chat message', msg);
    });
    socket.on('disconnect', function(){
        console.log('Status -> user : '+useridentidy+' disconnected !!!');
    });
});


http.listen(PORT, function(){
    console.log('listening on :'+PORT);
});