**Theory**

CRUD

> In shell, needs to be with "" filter 


Insert:
- User \<dbname>
- db.\<dbname>.insertOne({\<JSON>})
- db.\<dbname>.insertMany([{\<JSON>},{\<JSON>}])

Select:

- db.\<dbname>.findOne({ prop : value })
- db.\<dbname>.find({ prop : value })
- db.\<dbname>.find({ prop : value }).pretty
- db.\<dbname>.find({ prop : value , prop2 : value }).pretty
- db.\<dbname>.find({ prop.n : value }) **n position in array**
- db.\<dbname>.find({ prop : [ value , value ] })
- db.\<dbname>.find({ object.prop : value })
- db.\<dbname>.find({ object.object.prop : value })
- db.\<dbname>.find({ prop1 : value }, { prop2 : {0-1}} ** 0 exclude prop and 1 means include **  
db.\<dbname>.find({ "object.object.prop" : value })

Update:

- db.\<dbname>.updateOne({ prop : value} , { $set: { prop : value } })
- db.\<dbname>.updateOne({ prop : value} , { $set: { object : { prop : value , prop2 : value } }})
- db.\<dbname>.updateMany({ prop : value} , { $set: { prop : value } })

> Update Opertators: https://docs.mongodb.com/manual/reference/operator/update/

Upserts:

- db.\<dbname>.updateOne({ prop : value } , { $set:  prop , { upsert : true })

Replace:

- db.\<dbname>.replaceOne( {prop : value} , { prop : value})

Delete

- db.\<dbname>.deleteOne({ prop : value })
- db.\<dbname>.deleteMany({ prop : value })

**Quizzes**

Problem:
Which of the following operations will we focus on in our coverage of the MongoDB query language?

- decipher
- [X] read
- unlink
- redact
- [X] create
- copy
- review
- [X] delete
- [X] update

Problem:
Explore the movieDetails collection that you loaded into your Atlas sandbox cluster and then issue a query to answer the following question. How many movies in the movieDetails collection have exactly 2 award wins and 2 award nominations?

You will find the count() method useful in answering this question using the mongo shell.

- 3
- 7
- [X] 12
- 15
- 20

{"awards.nominations":2,  "awards.wins":2  }  

Problem:
Explore the movieDetails collection that you loaded into your Atlas sandbox cluster and then issue a query to answer the following question. How many documents list just two writers: "Ethan Coen" and "Joel Coen", in that order?

You will find the count() method useful in answering this question using the mongo shell.

- [X] 1
- 3
- 7
- 12
- 20

{"writers.0":"Ethan Coen", "writers.1":"Joel Coen"  } 

Problem:
Which of the following best describes the purpose of update operators?

- To replace matching documents in update operations.
- As filters to identify documents that should be updated.
- [X] To specify how one or more fields should be modified in matching documents.
- To identify fields to be updated in matching documents.

**Lab 2.1: How Many Comedies?**

Problem:
If you have not already loaded the video.movieDetails collection, please review the lesson "Loading Data into Your Sandbox Cluster" for a tutorial. Then, use the script, loadMovieDetailsDataset.js, provided in the handouts for the lesson, "Connecting to an Atlas Cluster from the Mongo Shell" to load the movieDetails collection.
Use Compass to connect to your sandbox cluster.
In Compass, view the video.movieDetails collection and apply the filter {genres: "Comedy"}.
How many documents in video.movieDetails match the filter {genres: "Comedy"}?

- 457
- 558
- 603
- [X] 737
- 816

**Lab 2.2: How Many Inserted?**

Problem:
If the collection video.myMovies is currently empty, how many documents would be inserted by the following call to insertMany().

<code>
db.myMovies.insertMany(
  [
    {
      "_id" : "tt0084726",
      "title" : "Star Trek II: The Wrath of Khan",
      "year" : 1982,
      "type" : "movie"
    },
    {
      "_id" : "tt0796366",
      "title" : "Star Trek",
      "year" : 2009,
      "type" : "movie"
    },
    {
      "_id" : "tt0084726",
      "title" : "Star Trek II: The Wrath of Khan",
      "year" : 1982,
      "type" : "movie"
    },
    {
      "_id" : "tt1408101",
      "title" : "Star Trek Into Darkness",
      "year" : 2013,
      "type" : "movie"
    },
    {
      "_id" : "tt0117731",
      "title" : "Star Trek: First Contact",
      "year" : 1996,
      "type" : "movie"
    }
  ],
  {
    ordered: false
  }
);
</code>

- 1
- 2
- 3
- [X] 4
- 5

"writeConcernErrors" : [ ],
	"nInserted" : 4,
	"nUpserted" : 0,
	"nMatched" : 0,
	"nModified" : 0,
	"nRemoved" : 0,
	"upserted" : [ ]

**Lab 2.3: Queries on Scalar Fields**

Problem:
Explore the movieDetails collection that you loaded into your Atlas sandbox cluster and then issue a query to answer the following question. How many movies in the movieDetails collection are rated PG and have exactly 10 award nominations?

You will find the count() method useful in answering this question using the mongo shell.

- 0
- 1
- [X] 3
- 6
- 11

{"awards.nominations":10,  "rated": "PG"  }  

**Lab 2.4: Queries on Array Fields, Part 1**

Problem:
Explore the movieDetails collection that you loaded into your Atlas sandbox cluster and then issue a query to answer the following question. How many movies in the movieDetails collection list "Family" among its genres?

You will find the count() method useful in answering this question using the mongo shell.

- 20
- 57
- [X] 124
- 200
- 277

{ genres:"Family" } 

**Lab 2.5: Queries on Array Fields, Part 2**

Problem:
Explore the movieDetails collection that you loaded into your Atlas sandbox cluster and then issue a query to answer the following question. How many movies in the movieDetails collection list "Western" second among its genres?

You will find the count() method useful in answering this question using the mongo shell.

- 7
- [X] 14
- 80
- 93
- 102

**Lab 2.6: Update Operators**

Problem:
To work on this lab, you need to connect to the sandbox cluster in which you have imported the video.movieDetails collection.

Suppose you wish to update the value of the plot field for one document in our movieDetails collection to correct a typo. Which of the following update operators and modifiers would you need to use to do this?

- $position
- $push
- $mul
- $slice
- $unset
- $addToSet
- $rename
- [X] $set
- $inc