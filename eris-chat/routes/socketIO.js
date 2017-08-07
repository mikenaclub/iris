/**
 * Created by STR02119 on 8/2/2017.
 */
var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next) {
    var app = require('express')();
    var http = require('http').Server(app);
    var io = require('socket.io')(http);
    io.on('connection', function(socket){
        console.log('a user connected');
    });
});

module.exports = router;