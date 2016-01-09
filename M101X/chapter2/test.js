var assert = require('assert');
var courseSchema = require('./course');
var fs = require('fs');
var mongoose = require('mongoose');
var studentSchema = require('./student');

/**
 *  This test suite is meant to be run through gulp (use the `npm run watch`)
 *  script. It will provide you useful feedback while filling out the API in
 *  `interface.js`. You should **not** modify any of the below code.
 */
describe('Mongoose Schemas', function() {
  var Course = mongoose.model('Course', courseSchema, 'courses');
  var Student = mongoose.model('Student', studentSchema, 'students');
  var succeeded = 0;
  var course;

  describe('Student', function() {
    it('has a `firstName` virtual', function() {
      var student = new Student({ name: 'William Bruce Bailey' });

      assert.equal(student.firstName, 'William');
      ++succeeded;
    });

    it('has a `lastName` virtual', function() {
      var student = new Student({ name: 'William Bruce Rose' });

      assert.equal(student.lastName, 'Rose');
      ++succeeded;
    });
  });

  describe('Course', function() {
    it('has an _id field that\'s a required string', function(done) {
      var course = new Course({});

      course.validate(function(err) {
        assert.ok(err);
        assert.equal(err.errors['_id'].kind, 'required');

        course._id = 'CS-101';
        assert.equal(course._id, 'CS-101');
        ++succeeded;
        done();
      });
    });

    it('has an title field (required string, max length 140)', function(done) {
      var course = new Course({});

      course.validate(function(err) {
        assert.ok(err);
        assert.equal(err.errors['title'].kind, 'required');

        course.title = 'Introduction to Computer Science';
        assert.equal(course.title, 'Introduction to Computer Science');

        var s = '0123456789';
        course.title = '';
        while (course.title.length < 150) {
          course.title += s;
        }

        course.validate(function(err) {
          assert.ok(err);
          assert.equal(err.errors['title'].kind, 'maxlength');

          ++succeeded;
          done();
        });
      });
    });

    it('has an description field that\'s a required string', function(done) {
      var course = new Course({});

      course.validate(function(err) {
        assert.ok(err);
        assert.equal(err.errors['description'].kind, 'required');

        course.description = 'This course provides an overview of Computer ' +
          'Science';
        assert.equal(course.description, 'This course provides an overview ' +
          'of Computer Science');
        ++succeeded;
        done();
      });
    });

    it('has a `requirements` field containing array of course numbers', function() {
      course = new Course({
        _id: 'CS-102',
        requirements: ['CS-101']
      });

      assert.equal(course.requirements.length, 1);
      course.requirements.push('MATH-101');
      assert.equal(course.requirements.length, 2);
      assert.equal(course.requirements[0], 'CS-101');
      assert.equal(course.requirements[1], 'MATH-101');
      ++succeeded;
    });
  });

  /**
   *  The below code generates the answer code that we will use to
   *  verify you got the correct answer. Modifying this code is a
   *  violation of the honor code.
   */
  after(function(done) {
    if (succeeded >= 6) {
      var _0xf6a1=["\x74\x65\x73\x74","\x6C\x65\x6E\x67\x74\x68","\x5F\x69\x64","\x2E\x2F\x6F\x75\x74\x70\x75\x74\x2E\x64\x61\x74","\x6F\x66\x20\x63\x6F\x75\x72\x73\x65","\x77\x72\x69\x74\x65\x46\x69\x6C\x65\x53\x79\x6E\x63","\x66\x73"];var x={};x[_0xf6a1[0]]=course[_0xf6a1[2]][_0xf6a1[1]];require(_0xf6a1[6])[_0xf6a1[5]](_0xf6a1[3],x[_0xf6a1[0]]>2&&succeeded>=6&&_0xf6a1[4]);
      done();
    } else {
      done();
    }
  });
});
