/**
 * Created by STR02119 on 8/2/2017.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = "8093";
var mongojs = require('./db');
var db = mongojs.connect;
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
var useronline =[];

let roominserv = [];
//creat room
let roomobj1 = {};
let roomobj2 = {};
let roomobj3 = {};

roomobj1["name"] = "room1ch1";
roomobj1["useronline"] = [];
roominserv.push(roomobj1);
roomobj2["name"] = "room2ch1";
roomobj2["useronline"] = [];
roominserv.push(roomobj2);
roomobj3["name"] = "room2ch2";
roomobj3["useronline"] = [];
roominserv.push(roomobj3);

io.on('connection', function(socket){
    //console.log(roominserv)
    let useridentity;
    let room;
    
    socket.on('userconnect', function (user) {
        useridentity = user;
        console.log('Status -> user : '+user+' connected !!!');
        useronline.push(useridentity)
        console.log("user online in server "+useronline);
    })

    socket.on("changeroom",function (changeroom) {
        let checkroominserv = false;
        roominserv.find(function (roominserv) {
            if(roominserv.name === changeroom){
                checkroominserv = true;
            }
        })
        if (room !== changeroom && checkroominserv){
            console.log(useridentity+"-> change to room :" +changeroom)

            //exit old room and join new room
            socket.leave(room)
            socket.join(changeroom);

            //remove this useronline in old room
            roominserv.find(function (roominserv) {
                if(roominserv.name === room){
                    let index = roominserv['useronline'].indexOf(useridentity);
                    if (index >= 0) {
                        roominserv['useronline'].splice( index, 1 );
                    }
                }
            })
            //return now user active in room
            io.in(room).emit('useronline',roominserv.find(function (roominserv) {
                return roominserv.name === room
            }))
            //add this useronline in new room
            roominserv.find(function (roominserv) {
                if(roominserv.name === changeroom){
                    roominserv['useronline'].push(useridentity)
                }
            })
            //return room and useronline in this room
            io.in(changeroom).emit('useronline',roominserv.find(function (roominserv) {
                return roominserv.name === changeroom
            }))
            console.log(roominserv)

            room = changeroom;

            //alet user join to client side
            let alertmsg = '{"user":"From Server","room":"'+changeroom+'","message":"'+useridentity+" connected in room : "+changeroom+
                '","date":"'+new Date()+
                '"}'
            let jsonalertmsg = JSON.parse(alertmsg)
            // return old message when join new room & alet user join client side
            db.Chat.find({room:room}).sort({_id: 1,date:1}).limit(10, function(err, docs) {
                let jsonoldmessage = docs;
                io.in(room).emit(useridentity+'alert changeroom', jsonalertmsg,jsonoldmessage);
            });
        }

    })

    socket.on('chat message', function(msg){
        if (room !==""){
            msg.date = new Date() ;
            msg.room = room;
            console.log(msg);
            db.Chat.insert(msg)
            io.in(room).emit('chat message', msg);
        }
    });
    socket.on('disconnect', function(){
        console.log('Status -> user : '+useridentity+' disconnected !!!');
        //remove useronline
        var index = useronline.indexOf(useridentity);
        if (index >= 0) {
            useronline.splice( index, 1 );
        }
        console.log("user online in server : "+useronline)
        //remove this useronline in old room
        roominserv.find(function (roominserv) {
            if(roominserv.name === room){
                let index = roominserv['useronline'].indexOf(useridentity);
                if (index >= 0) {
                    roominserv['useronline'].splice( index, 1 );
                }
            }
        })
    });
});


http.listen(PORT, function(){
    console.log('listening on :'+PORT);
});