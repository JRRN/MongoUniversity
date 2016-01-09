var mongodb = require('mongodb');
var uri = 'mongodb://localhost:27017/movies';

module.exports = function(callback) {
  mongodb.MongoClient.connect(uri, callback);
};