/*

Homework Description:

In completing this exercise, you will find the following lesson helpful as a refresher on the $or 
operator.
https://university.mongodb.com/courses/MongoDB/M101JS/2016_January/courseware/Week_2_CRUD/56955ef3d8ca393adc3abe5c

This application depends on the companies.json dataset distributed as a handout with the 
"find() and Cursors in the Node.js Driver" lesson. You must first import that collection. Please ensure 
you are working with an unmodified version of the collection before beginning this
exercise. 

To import a fresh version of the companies.json data, please type the following:

mongoimport -d crunchbase -c companies companies.json


If you have already mongoimported this data you will first need to drop the crunchbase database
in the Mongo shell. Do that by typing the following two commands, one at a time, in the Mongo shell:

use crunchbase
db.dropDatabase()


The code below is complete with the exception of the queryDocument() function.
As in the lessons, the queryDocument() function builds an object that will be passed to find()
to match a set of documents from the crunchbase.companies collection.

For this assignment, please complete the queryDocument() function as described in the TODO 
comments you will find in that function. 


Once complete, run this application by typing:

node overviewOrTags.js


When you are convinced you have completed the application correctly, please enter the 
average number of employees per company reported in the output. Enter only the number reported.
It should be two numeric digits.

As a check that you have completed the exercise correctly, the total number of unique companies 
reported by the application should equal 194.

If the grading system does not accept the first solution you enter, please do not make further 
attempts to have your solution graded without seeking some help in the discussion forum.


*/


var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var allOptions = [
    {
        overview: "wiki",
    },
    {
        milestones: "CMO"
    }
];

var numQueriesFinished = 0;
var companiesSeen = {};

for (var i=0; i<allOptions.length; i++) {
    var query = queryDocument(allOptions[i]);
    queryMongoDB(query, i);
}



function queryMongoDB(query, queryNum) {

    MongoClient.connect('mongodb://localhost:27017/crunchbase', function(err, db) {
        
        assert.equal(err, null);
        console.log("Successfully connected to MongoDB for query: " + queryNum);
        
        var cursor = db.collection('companies').find(query);
        
        var numMatches = 0;
        
        cursor.forEach(
            function(doc) {
                numMatches = numMatches + 1;
                if (doc.permalink in companiesSeen) return;
                companiesSeen[doc.permalink] = doc;
            },
            function(err) {
                assert.equal(err, null);
                console.log("Query " + queryNum + " was:" + JSON.stringify(query));
                console.log("Matching documents: " + numMatches);
                numQueriesFinished = numQueriesFinished + 1;
                if (numQueriesFinished == allOptions.length) {
                    report();
                }
                return db.close();
            }
        );
        
    });
    
}


function queryDocument(options) {

    var query = {};

    if ("overview" in options) {
        /*
           TODO: Write an assignment statement to ensure that if "overview" appears in the 
           options object, we will match documents that have the value of options.overview 
           in either the "overview" field or "tag_list" field of companies documents.

           You will need to use the $or operator to do this. As a hint, "$or" should be the
           name of the field you create in the query object.

           As with the example for options.milestones below, please ensure your regular
           expression matches are case insensitive.

           I urge you to test your query in the Mongo shell first and adapt it to fit
           the syntax for constructing query documents in this application.
        */
    query = { "$or": [ {"overview": {"$regex": options.overview, "$options": "i"}}, {"tag_list":{ "$regex": options.overview, "$options": "i" } } ] }
    }
    if ("milestones" in options) {
        query["milestones.source_description"] =
            {"$regex": options.milestones, "$options": "i"};
    }

    return query;
    
}


function report(options) {
    var totalEmployees = 0;
    for (key in companiesSeen) {
        totalEmployees = totalEmployees + companiesSeen[key].number_of_employees;
    }

    var companiesList = Object.keys(companiesSeen).sort();
    console.log("Companies found: " + companiesList);
    console.log("Total employees in companies identified: " + totalEmployees);
    console.log("Total unique companies: " + companiesList.length);
    console.log("Average number of employees per company: " + Math.floor(totalEmployees / companiesList.length));
}





