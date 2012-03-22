// These tests will later be expanded to include actual test data once 
// we know what kind of data we're dealing with.
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

      // expected response of first test (results of following tests are incremented):
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
      var col = "hw1";
      deepEqual( gradeMedian(col, students), 18, "Calculating \"" + col + "\" grade median." );
      
      col = "hw2";
      deepEqual( gradeMedian(col, students), 19, "Calculating \"" + col + "\" grade median." );
      
      col = "m1";
      deepEqual( gradeMedian(col, students), 20, "Calculating \"" + col + "\" grade median." );
      
      col = "m2";
      deepEqual( gradeMedian(col, students), 21, "Calculating \"" + col + "\" grade median." );

      ok( isNaN( gradeMedian("dne", students)), "Testing non-existant assignment.");
   }
);

test("Test assignment range calculations", 
   function() {
      var col = "hw1";
      deepEqual( gradeRange(col, students), 4, "Calculating \"" + col + "\" grade range." );
      
      col = "hw2";
      deepEqual( gradeRange(col, students), 4, "Calculating \"" + col + "\" grade range." );
      
      col = "m1";
      deepEqual( gradeRange(col, students), 4, "Calculating \"" + col + "\" grade range." );
      
      col = "m2";
      deepEqual( gradeRange(col, students), 4, "Calculating \"" + col + "\" grade range." );

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
   }
);

test("Test \"primitive\" range function calculations", 
   function() {
      deepEqual( getRange([0,1,2,3,4,5,15]), 15, "Testing getRange()." );
   }
);
