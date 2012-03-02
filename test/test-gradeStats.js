// These tests will later be expanded to include actual test data once 
// we know what kind of data we're dealing with.
module("Grade Statistics Generation");
test("Ensure means, medians, modes, and ranges are calculated correctly", 
   function() {
      var students = {};
      var stu = ["a", "b", "c", "d", "$MIN", "$MAX"];
      var ass = ["TOTAL(100%)", "hw1", "hw2", "m1", "m2"];

      for (var i = 0; i < stu.length; i++) {
         students[stu[i]] = {};
         students[stu[i]][ass[0]] = 75;
         for (var j = 1; j < ass.length; j++) {
            students[stu[i]][ass[j]] = 15+j;
         };
      };
    
      var col = "hw1";
      // per assignment
      equal(   gradeMean(col, students), 15, "Calculating assignment grade average." );
      equal( gradeMedian(col, students), 15, "Calculating assignment grade median." );
      equal(  gradeRange(col, students), 0, "Calculating assignment grade range." );
      
      // class wide
      equal( classMedian(students), 75, "Calculating class-wide grade median." );
      equal(  classRange(students), 0, "Calculating class-wide grade range." );

      // primitive
      equal( getMedian([0,1,2,3,4,5,15]), 3.5, "Testing getMedian()." );
      equal( getRange([0,1,2,3,4,5,15]), 15, "Testing getRange()." );
            
   }
);
