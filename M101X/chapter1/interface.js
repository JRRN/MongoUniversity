/*
 *  Inserts "doc" into the collection "movies".
 */

exports.insert = function(db, doc, callback) {
  	db.collection('movies').insert(doc, function(error,result){ 
		if (error){ callback(error); } 
		else{ callback(null); } 
  	}); 
};

/*
 *  Finds all documents in the "movies" collection
 *  whose "director" field equals the given director,
 *  ordered by the movie's "title" field. See
 *  http://mongodb.github.io/node-mongodb-native/2.0/api/Cursor.html#sort
 */

var director = 'Irvin Kershner';
exports.byDirector = function(db, director, callback) {
	db.collection('movies')
	.find({'director':director})
	.sort({'title':1})
	.toArray(function(error,docs){
 		if (error){ console.log(error); } 
		else{ callback(null, docs); } });
};