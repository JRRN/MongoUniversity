# Code Exercise

There are two files that you will need to work with, `course.js` and
`student.js`. After you've run `npm install`, run `npm run watch` to start
Gulp and automatically re-run tests every time the `course.js` and `student.js`
files change.

First, for `student.js`, you will need to implement two virtuals. The student
schema stores the student's full name. The `firstName` virtual will return the
student's first name as computed from their full name. The `lastName` virtual
will do the same for the student's last name.

For `course.js`, you will have to fill out the entire course schema. The course
schema must have the following fields:

* `_id`: a string representing the course number, such as "CS-101". Required.
* `title`: the course's title as a string, such as "Introduction to Computer
Science". Required, [maximum of 140 characters](http://mongoosejs.com/docs/api.html#schema_string_SchemaString-maxlength).
* `description`:  a description of the course as a string. Required.
*  `requirements`: an of course numbers (as strings) representing the courses
a student should take before taking this course.

Once you have met all of these requirements, `npm run watch` will exit and
provide you a secret phrase. Please enter this code in your browser window
so we can verify that you completed this exercise.
