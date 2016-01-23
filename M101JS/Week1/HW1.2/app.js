var MongoClient = require('mongodb').MongoClient,
    crypto = require('crypto'),
    assert = require('assert');

MongoClient.connect('mongodb://localhost:27017/m101', function(err, db) {
    if(err) throw err;

    var algorithm = 'aes256';
    var encrypted_message = '7013254dca77e2c913d18cf5b70e7bba';

    db.collection('hw1_2').find({}).toArray(function(err, docs) {
        if(err) throw err;

        if (docs.length < 1) {
            console.dir("No documents found");
            return db.close();
        }
        
	var doc = docs[0];
        var decipher = crypto.createDecipher(algorithm, doc['_id']);
        var decrypted = decipher.update(encrypted_message, 'hex', 'utf8') + decipher.final('utf8');
        console.log("Answer: " + decrypted);
        return db.close();
    });
});
