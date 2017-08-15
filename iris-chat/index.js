/**
 * Created by STR02119 on 8/2/2017.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = "8093"
var mongojs = require('./db')
var db = mongojs.connect;
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

    let useridentidy;
    let room = "";

    socket.on("changeroom",function (changeroom) {
        if (room !== changeroom){
            console.log(useridentidy+"-> change to room :" +changeroom)
            if(room !== ""){
                socket.leave(room)
            }
            socket.join(changeroom);
            room = changeroom;

            //alet user join to client side
            let alertmsg = '{"user":"From Server","room":"'+changeroom+'","message":"'+useridentidy+" connected in room : "+changeroom+'"}'
            let jsonalertmsg = JSON.parse(alertmsg)
            db.Chat.find({room:room}).sort({_id: -1,date:-1}).limit(5, function(err, docs) {
                let jsonoldmessage = docs;
                io.in(room).emit('alert changeroom', jsonalertmsg,jsonoldmessage);
            });
        }

    })

    socket.on('userconnect', function (user) {
        useridentidy = user;
        console.log('Status -> user : '+user+' connected !!!');
    })
    socket.on('chat message', function(msg){
        if (room !==""){
            msg.date = new Date() ;
            msg.room = room;
            console.log(msg);
            //console.log(msg.user+' : '+msg.message)
            /*io.emit('chat message', msg);*/
            db.Chat.insert(msg)
            io.in(room).emit('chat message', msg);
        }
    });
    socket.on('disconnect', function(){
        console.log('Status -> user : '+useridentidy+' disconnected !!!');
    });
});


http.listen(PORT, function(){
    console.log('listening on :'+PORT);
});