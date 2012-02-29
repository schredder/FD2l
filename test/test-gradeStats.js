// These tests will later be expanded to include actual test data once 
// we know what kind of data we're dealing with.
module("Grade Statistics Generation");
asyncTest("Ensure means, medians, modes, and ranges are calculated correctly", 
   function() {
      expect(7);

      requestCSV("gradesExample.csv", 
	      function(csv) {
            ok("Test called");
            var students = getStudents(csv);
      
		      var col = hw1;
		      // per assignment
		      equal(   gradeMean(col, students), 0, "Calculating assignment grade average." );
		      equal( gradeMedian(col, students), 0, "Calculating assignment grade median." );
		      equal(  gradeRange(col, students), 0, "Calculating assignment grade range." );
      
		      // class wide
		      equal( classMedian(students), 0, "Calculating class-wide grade median." );
		      equal(  classRange(students), 0, "Calculating class-wide grade range." );
      
            // primitive
            equal( getMedian([0,1,2,3,4,5,15]), 2.5, "Testing getMedian()." );
            equal( getRange([0,1,2,3,4,5,15]), 2.5, "Testing getRange()." );
            
            start();
	      }
      );
   }
);
