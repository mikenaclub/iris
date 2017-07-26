var express = require('express');
var router = express.Router();
/**
 * Created by STR02119 on 7/20/2017.
 */
var mysql = require('mysql');
var database = require('../database/TestUser');
var connectdata = mysql.createConnection(database);
var bcrypt = require('bcrypt');

router.get('/query', (req, res, next) => {
    connectdata.query('SELECT * FROM user', (err, rows, fields) => {
        if (err) throw err;
        res.json(rows);
    })
});

router.post('/login', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    console.log(username);
    console.log(password);
    connectdata.query('SELECT * FROM user Where username = ?', [username], (err, rows, fields) => {
        if (err) throw err;
        if (rows[0] != null) {
            bcrypt.compare(password, rows[0].password, function (err, result) {
                if (result)
                    res.status(202).send("login success");
                else res.status(401).send("please check password");
            });
        }
        else {
            res.status(401).send("login fail");
        }
    })
});

module.exports = router;