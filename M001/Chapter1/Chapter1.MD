**Theory**

**Quizzes**

Problem:
According to the JSON spec, which of the following data types are directly supported by JSON?

- [X] String
- [X] Array
- [X] Object
- Date
- [X] Decimal number

Problem:
Which of the following statements are true?

- [X] Documents are stored in collections.
- [X] A database may contain one or more collections.
- [X] Each database and collection combination define a namespace.
- We reference a namespace using the name of the database, followed by a comma, followed by the name of the collection, e.g., city,neighborhoods.
- [X] We won't talk about indexes too much in the course, but you can learn about indexes in M201: MongoDB Performance.

Problem:
Based on the field depicted below, which of the following are true?

![alt text](./Quiz01.png  "Problem")

- [X] Not all documents in this collection have the same value type for this field.
- [X] Most of the documents in this collection contain int32 values for this field.
- Some documents in this field have the value type Year

Problem:
Which of the following are types of data Compass (and MongoDB) recognizes and specifically supports?

- [X] documents
- [X] arrays
- [X] geospatial data
- rainfall
- air pressure

Problem:
Which of statements below best describes the following filter?

{"age": {"$gte": 21, "$lt": 70}}

- Find all documents for which the age field has a value that is >= 21 and <= 70.
- Find all documents for which the age field has a value that is either equal to 21 or equal to 70.
- [X] Find all documents for which the age field has a value that is >= 21 and < 70.
- Find all documents for which the age field is < 70.
- None of the above.

**Lab 1.1**

Problem:
If you haven't downloaded Compass yet then please go back to this lecture Connecting to MongoDB Using Compass in Chapter 0 and follow the instructions mentioned there for downloading Compass and connecting to the class Atlas cluster.

If you have already downloaded Compass then please use this connection string for connecting to the class Atlas cluster :

mongodb+srv://m001-student:m001-mongodb-basics@cluster0-jxeqq.mongodb.net/test
 COPY
Once connected, navigate to the Schema tab in Compass and hit Analyze Schema and answer the following question.
Question:

Which of the following field names appear in documents in the movies collection of the video database. Check all that apply.

- [X] _id
- [X] cast
- comments
- [X] director
- [X] genre
- length
- [X] plot
- stars

**Lab 1.2: Determine the Value Type, Part 1**

Problem:
What is the value type of the ts field for documents in the 100YWeatherSmall.data collection?

- array
- coordinates
- [X] date
- document
- double
- int32 
- mixed string and int32
- mixed string and double
- string

**Lab 1.3: Determine the Value Type, Part 2**

Problem:
What is the value type of the airTemperature field for documents in the 100YWeatherSmall.data collection?

- array
- coordinates
- date
- [X] document
- double
- int32
- mixed string and int32
- mixed string and double
- string

**Lab 1.4: Determine the Value Type, Part 3**

Problem:
What is the value type of the year field for documents in the video.movies collection?

- array
- coordinates
- date
- document
- double
- [X] int32
- mixed string and int32
- mixed string and double
- string

**Lab 1.5: Scavenger Hunt, Part 1**

Problem:
How many movies in the video collection were directed by Patty Jenkins. Stated more precisely, how many documents in the video.movies collection have a value of "Patty Jenkins" for the director field?

- [X] 6
- 13
- 47
- 98
- 143

**Lab 1.6: Scavenger Hunt, Part 2**

Problem:
How many documents in the citibike.trips collection have a tripduration that is greater than or equal to 60 and less than 65?

- 0
- 94
- 216
- 355
- [X] 754