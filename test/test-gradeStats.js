/* These tests will later be expanded to include actual test data once 
 * we know what kind of data we're dealing with.
 */

module("Grade Statistics Generation");

// Building a dummy student array for testing
// TODO: update this for new students data format
var students = {};
var stu = ["a", "b", "c", "d", "e", "$MIN", "$MAX"];
var ass = ["TOTAL(100%)", "hw1", "hw2", "m1", "m2"];

for (var i = 0; i < stu.length; i++) {
   students[stu[i]] = {};
   students[stu[i]][ass[0]] = 75;
   for (var j = 1; j < ass.length; j++) {
      if (stu[i] == "$MIN") { students[stu[i]][ass[j]] = 0; }
      else if (stu[i] == "$MAX") { students[stu[i]][ass[j]] = 25; }
      else { students[stu[i]][ass[j]] = 15+i+j; };
   };
};
/* What this looks like:
   a	b	c	d	e	$i	$a	AVG	M	R
   16	17	18	19	20	0	25	18		18	4
   17	18	19	20	21	0	25	19		19	4
   18	19	20	21	22	0	25	20		20	4
   19	20	21	22	23	0	25	21		21	4
   20	21	22	23	24	0	25	22		22	4
*/ 

test("Test assignment mean calculations", 
   function() {
      // tested assignment names:
      var assignments = ["hw1", "hw2", "m1", "m2"];
      var col;

      // expected response of first test (value incremented for following tests):
      var expected = 18; 

      for (assignment in assignments) {
         col = assignments[assignment];
         deepEqual( gradeMean(col, students), expected++, // expected value is incremented
                    "Calculating \"" + col + "\" grade average." );
      }

      ok( isNaN( gradeMean("dne", students)), "Testing non-existant assignment.");
   }
);

test("Test assignment median calculations", 
   function() {
      // tested assignment names:
      var assignments = ["hw1", "hw2", "m1", "m2"];
      var col;

      // expected response of first test (value incremented for following tests):
      var expected = 18; 

      for (assignment in assignments) {
         col = assignments[assignment];
         deepEqual( gradeMedian(col, students), expected++, // expected value is incremented
                    "Calculating \"" + col + "\" grade average." );
      }

      ok( isNaN( gradeMedian("dne", students)), "Testing non-existant assignment.");
   }
);

test("Test assignment range calculations", 
   function() {
      // tested assignment names:
      var assignments = ["hw1", "hw2", "m1", "m2"];
      var col;

      // expected response of all tests
      var expected = 4; 

      for (assignment in assignments) {
         col = assignments[assignment];
         deepEqual( gradeRange(col, students), expected, // expected value is incremented
                    "Calculating \"" + col + "\" grade average." );
      }

      ok( isNaN( gradeRange("dne", students)), "Testing non-existant assignment.");
   }
);

test("Test class-wide median calculations", 
   function() {
      // class wide
      deepEqual( classMedian(students), 75, "Calculating class-wide grade median." );
   }
);

test("Test class-wide range calculations", 
   function() {
      deepEqual( classRange(students), 0, "Calculating class-wide grade range." );
   }
);

test("Test \"primitive\" median function calculations", 
   function() {
      // primitive
      deepEqual( getMedian([0,1,2,3,4,5,15]), 3, "Testing getMedian() with odd num of elements." );
      deepEqual( getMedian([0,1,2,3,4,15]), 2.5, "Testing getMedian() with even num of elements." );
      deepEqual( getMedian([0,1,2,3,4,15]), 2.5, "Testing getMedian() with even num of elements." );
      ok( isNaN( getMedian([0,1,2,3,4,"kitty",15])), "getMedian() returns NaN with a string." );
      ok( isNaN( getMedian([0,1,2,"",4,15])), "getMedian() returns NaN with a string." );
      ok( isNaN( getMedian([0,1,2,3,true,15])), "getMedian() returns NaN with a bool." );
   }
);

test("Test \"primitive\" range function calculations", 
   function() {
      deepEqual( getRange([0,1,2,3,4,5,15]), 15, "Testing getRange()." );
      ok( isNaN( getRange([0,1,2,3,"4",5,15])), "getRange() returns NaN with a string." );
      ok( isNaN( getRange([0,1,2,3,true,5,15])), "getRange() returns NaN with a bool." );
   }
);



/* Testing object pipeline, adding statistics data to students object */

module("Grade Statistics Population");

// TODO: Generate dummy students/section object for below tests
var section = {
   students: {
      "2k4": {
         letterGrade: "",
         note: "lovely test",
         totalGrade: "",
         section: "cs1",
         repo: "2k4",
         scores: {
            quizzes: { q1: 9, q2: 6, q3: 5, q4: "", q5: "7" },
            midterm: { m1:"7",m2:"8",m3:"6",m4:"5" },
            finalExam: { finalExam:"32" },
            hw: { hw1:"7",hw2:"6",hw3:"8",hw4:"9",hw5:"5",hw6:"7",hw7:"7" }
         }
      }
   }
};

test("Test adding class-wide statistics",
   function() {
      addClassStats(students);

      deepEqual( section.classStats.averageGrade, 75, 
                 "Testing average grade is calculated and in the right place." );
      deepEqual( section.classStats.medianGrade, 70, 
                 "Testing median grade is calculated and in the right place." );
      deepEqual( section.classStats.gradeRange, 75, 
                 "Testing grade range is calculated and in the right place." );
   }
);

test("Test adding per-student statistics",
   function() {
   // Repeat this for some number of students. Add strage data, etc.
      var repo = "2k4";
      addTotalAndLetterGrades(repo, students);

      deepEqual( section.students[repo].totalGrade, 90.5,
                 "Testing percentage grade is calculated and put in the right place." );
      deepEqual( section.students[repo].letterGrade, "A",
                 "Testing letter grade is calculated and put in the right place." );

   }
);
