// These tests will later be expanded to include actual test data once 
// we know what kind of data we're dealing with.
module("Grade Statistics Generation");
test("Ensure means, medians, modes, and ranges are calculated correctly", 
	function() 
	{
		var col = 0, data = 0;
		// per assignment
		equal(   gradeMean(col, data), 0, "Calculating assignment grade average." );
		equal( gradeMedian(col, data), 0, "Calculating assignment grade median." );
		equal(  gradeRange(col, data), 0, "Calculating assignment grade range." );

		// class wide
		equal( classMedian(data), 0, "Calculating class-wide grade median." );
	}
);