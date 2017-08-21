var mongojs = require('mongojs');

var databaseUrl = 'dev.iris.echoneet.space/Iris';
var collections = ['Chat'];

var connect = mongojs(databaseUrl, collections);

module.exports = {
    connect: connect
};