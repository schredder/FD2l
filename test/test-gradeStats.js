// These tests will later be expanded to include actual test data once 
// we know what kind of data we're dealing with.
module("Grade Statistics Generation");
test("Ensure means, medians, modes, and ranges are calculated correctly", 
   function() {
      // Building a dummy student array for testing
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
      
      
      // per assignment
      var col = "hw1";
      equal(   gradeMean(col, students), 18, "Calculating \"hw1\" grade average." );
      equal( gradeMedian(col, students), 18, "Calculating \"hw1\" grade median." );
      equal(  gradeRange(col, students), 4, "Calculating \"hw1\" grade range." );
      
      col = "hw2";
      equal(   gradeMean(col, students), 19, "Calculating \"hw2\" grade average." );
      equal( gradeMedian(col, students), 19, "Calculating \"hw2\" grade median." );
      equal(  gradeRange(col, students), 4, "Calculating \"hw2\" grade range." );
      
      col = "m1";
      equal(   gradeMean(col, students), 20, "Calculating \"m1\" grade average." );
      equal( gradeMedian(col, students), 20, "Calculating \"m1\" grade median." );
      equal(  gradeRange(col, students), 4, "Calculating \"m1\" grade range." );
      
      col = "m2";
      equal(   gradeMean(col, students), 21, "Calculating \"m2\" grade average." );
      equal( gradeMedian(col, students), 21, "Calculating \"m2\" grade median." );
      equal(  gradeRange(col, students), 4, "Calculating \"m2\" grade range." );
      
      // class wide
      equal( classMedian(students), 75, "Calculating class-wide grade median." );
      equal(  classRange(students), 0, "Calculating class-wide grade range." );

      // primitive
      equal( getMedian([0,1,2,3,4,5,15]), 3, "Testing getMedian() with odd num of elements." );
      equal( getMedian([0,1,2,3,4,15]), 2.5, "Testing getMedian() with even num of elements." );
      equal( getRange([0,1,2,3,4,5,15]), 15, "Testing getRange()." );

   }
);
