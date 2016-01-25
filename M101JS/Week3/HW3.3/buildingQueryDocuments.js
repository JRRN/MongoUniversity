/*

Homework Description:

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

node buildingQueryDocuments.js


When you are convinced you have completed the application correctly, please enter the 
average number of employees per company reported in the output. Enter only the number reported.
It should be three numeric digits.

As a check that you have completed the exercise correctly, the total number of unique companies 
reported by the application should equal 42.

If the grading system does not accept the first solution you enter, please do not make further 
attempts to have your solution graded without seeking some help in the discussion forum.

*/

var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');


var allOptions = [
    {
        firstYear: 2002,
        lastYear: 2016,
        city: "Palo Alto"
    },
    {
        lastYear: 2010,
        city: "New York"
    },
    {
        city: "London"
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

    console.log(options);
    var query = {
        "tag_list": { "$regex": "social-networking", "$options": "i"}
        /* TODO: Complete this statement to match the regular expression "social-networking" */        
    };

    if (("firstYear" in options) && ("lastYear" in options)) {
        //((query.founded_year = { "founded_year":  "$gte": options.firstYear }, "$and": { "founded_year":  "$lte": options.lastYear  }   }

        //query.founded_year = { "founded_year": { "$gte": options.firstYear }, "$or": [ { "founded_year": { "$lte": options.lastYear } } ] }
        query.founded_year = { "$gte": options.firstYear , "$lte": options.lastYear } 
        /* 
           TODO: Write one line of code to ensure that if both firstYear and lastYear 
           appear in the options object, we will match documents that have a value for 
           the "founded_year" field of companies documents in the correct range. 
        */
    } else if ("firstYear" in options) {
        query.founded_year = { "$gte": options.firstYear };
    } else if ("lastYear" in options) {
        query.founded_year = { "$lte": options.lastYear };
    }

    if ("city" in options) {
        /* 
           TODO: Write one line of code to ensure that we do an equality match on the 
           "offices.city" field. The "offices" field stores an array in which each element 
           is a nested document containing fields that describe a corporate office. Each office
           document contains a "city" field. A company may have multiple corporate offices. 
        */
        query['offices.city'] = options.city;
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









