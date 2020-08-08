**Theory**

**Quizzes**

Problem:
For which CRUD operations can one use the query operators we will discuss in this chapter?

- [X] Create
- [X] Read
- [X] Update
- [X] Delete

Problem:
Using the $in operator, filter the video.movieDetails collection to determine how many movies list "Ethan Coen" or "Joel Coen" among their writers. Your filter should match all movies that list one of the Coen brothers as writers regardless of how many other writers are also listed. Select the number of movies matching this filter from the choices below.

- 0
- [X] 3
- 7
- 12
- 16

{"writers": {"$in": ["Ethan Coen", "Joel Coen"]}}

Problem:
Connect to our class Atlas cluster from the mongo shell or Compass and answer the following question. How many documents in the 100YWeatherSmall.data collection do NOT contain the key atmosphericPressureChange.

- 1
- 2679
- 10345 
- 33989
- [X] 40668

{atmosphericPressureChange : {$exists : false}} 

Problem:
Connect to our class Atlas cluster from the mongo shell or Compass and view the ships.shipwrecks collection. In this collection, watlev describes the water level at the shipwreck site and depth describes how far below sea level the ship rests. How many documents in the ships.shipwrecks collection match either of the following criteria: watlev equal to "always dry" or depth equal to 0.

- 501
- 1644
- 2000
- [X] 2331
- 3105

{$or: [{watlev : {$eq: "always dry"}} , {depth:  {$eq:  0}}]}

Problem:
Connect to our class Atlas cluster from the mongo shell or Compass and view the 100YWeatherSmall.data collection. The sections field in this collection identifies supplementary readings available in a given document by a three-character code. How many documents list: "AG1", "MD1", and "OA1" among the codes in their sections array. Your count should include all documents that include these three codes regardless of what other codes are also listed.

- 2000
- 9803
- [X] 10200
- 15442
- 17348

{sections: {$all: ["AG1", "MD1", "OA1"] }}

Problem:
Connect to our class Atlas cluster from the mongo shell or Compass and view the 100YWeatherSmall.data collection. How many documents in this collection contain exactly two elements in the sections array field?

- 114
- 670
- [X] 2656
- 10700
- 25678

{sections: {$size: 2 }}

Problem:
In the M001 class Atlas cluster you will find a database added just for this week of the course. It is called results. Within this database you will find two collections: surveys and scores. Documents in the results.surveys collection have the following schema.

<code>
{_id: ObjectId("5964e8e5f0df64e7bc2d7373"),
 results: [{product: "abc", score: 10}, {product: "xyz", score: 9}]}
 </code>

The field called results that has an array as its value. This array contains survey results for products and lists the product name and the survey score for each product.

How many documents in the results.surveys collection contain a score of 7 for the product, "abc"?

- 35
- [X] 124
- 172
- 220
- 301

{results: {$elemMatch: {product: "abc", score: 7}}}

Problem:
This problem is provided as a supplementary learning opportunity. It is somewhat more challenging that the ordinary labs. It is ungraded. We do not ask you submit an answer.

In the M001 class Atlas cluster you will find a database added just for this week of the course. It is called results. Within this database you will find two collections: surveys and scores. Documents in the results.scores collection have the following schema.

<code>
{"_id": ObjectId("5964e8e5f0df64e7bc2d7373"), "results": [75, 88, 89]}
</code>

Connect to our class Atlas cluster from the mongo shell or Compass and view the results.scores collection.

How many documents contain at least one score in the results array that is greater than or equal to 70 and less than 80?

744 
{results: {$elemMatch: {$gte: 70, $lt: 80}}}
