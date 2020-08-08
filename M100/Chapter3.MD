**Theory**


**Quizzes**

Problem:
How are nested SQL queries interpreted to understand the query logic?

- bottom-to-top
- [X] inside-out
- outer-to-inner
- top-to-bottom

Problem:
How are MongoDB Aggregation Pipelines interpreted to understand the query logic?

- [X] top-to-bottom
- outer-to-inner
- inside-out
- bottom-to-top

Problem:
Which of the following are available query languages in MongoDB?

- [X] MongoDB Query Language (MQL)
- Structure Query Language (SQL)
- [X] MongoDB Aggregation Framework
- MongoDB MongoShell

Problem:
Which are valid statements for SQL queries and for Aggregation queries?

- [X] MongoDB Aggregations uses sequential stages.
- SQL uses sequential statements without nesting.
- MongoDB Aggregations use nested stages.
- [X] SQL uses nested statements.

Problem:
Which function in MQL is equivalent to the SELECT statement in SQL?

- count
- project
- query
- [X] find
- limit

Which of the following functions exist both in SQL and MQL for queries?

- [X] skip
- [X] limit
- [X] count

Problem:
Which function in MongoDB Query Language (MQL) is equivalent to the less than (<) operator in SQL?

- $lessthan
- [X] $lt 
- <

Problem:
Which function in MongoDB Query Language (MQL) is equivalent to the ORDER BY operator in SQL?

- [X] sort
- order
- order by

Problem:
Which stage in the MongoDB Aggregation Framework is equivalent to WHERE clause in SQL's SELECT statement?

- [X] match
- count
- limit

Problem:
Which stage in the MongoDB Aggregation Framework is equivalent to the ORDER BY function in SQL's SELECT statement?

- order by
- [X] sort
- limit
- count

Problem:
Which stage in the MongoDB Aggregation Framework is equivalent to the LIMIT clause in SQL's SELECT statement?

- [X] limit
- where
- count

Problem:
Select the MongoDB Aggregation Framework pipeline that is equivalent to the following SQL statement:

'SELECT * FROM people WHERE status = "A" OR age = 50'

- db.people.aggregate([ { $where: { $or: [ { status: { $eq: "A" } }, { age: { $eq: 50 } } ] } } ])
- [X]   db.people.aggregate([ { $match: { $or: [ { status: { $eq: "A" } }, { age: { $eq: 50 } } ] } } ])
- db.people.aggregate([ { $match: { $and: [ { status: { $eq: "A" } }, { age: { $eq: 50 } } ] } } ])

Problem:
Which are the following highlight the impact of an Object Mapper on a database?

- [X] In MongoDB, the data already represents the object so it can be sent without processing.
- In a relational database, you must index the created object representation.
- In MongoDB, you must index the created object representation.
- [X] In a relational database, it gathers data from multiple tables by performing joins to create the object.

Problem:What typically maps directly to an object?

- A record in a RDBMS
- [X] A document in MongoDB

Problem:
Which programming languages can use the exact same query syntax for the conditions than the MongoDB shell?

- [X] Python
- Java
- .NET (CSharp)
- [X] Javascript (NodeJS)

Problem:
In translating a common MQL query to a coding language, our examples showed several common steps.

Which of the following translation steps was done for all the coding languages?

- [X] Used a variable to hold the conditional / filter criteria for the query.
- [X] Used a variable which referenced the collection we wanted to query.
- [X] Used the MongoClient in the programming language to connect to the database.
- Used a variable to indicate an index to use when querying the collection.
- [X] Used a variable to hold the result of the query on the collection.