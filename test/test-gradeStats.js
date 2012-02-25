module("Generating Grade Statistics");
// These tests will later be expanded to include actual test data once 
// we know what kind of data we're dealing with.

test("Ensure the per-assignment means, medians, modes, and ranges are calculated correctly", 
	function() 
	{
		equal(   mean(col, data), 0, "Calculating assignment grade average." );
		equal( median(col, data), 0, "Calculating assignment grade median." );
		equal(   mode(col, data), 0, "Calculating assignment grade mode." );
		equal(  range(col, data), 0, "Calculating assignment grade range." );
	}
);

test("Ensure the class-wide means, medians, modes, and ranges are calculated correctly", 
	function() 
	{
		equal(   mean(col, data), 0, "Calculating class-wide grade average." );
		equal( median(col, data), 0, "Calculating class-wide grade median." );
		equal(   mode(col, data), 0, "Calculating class-wide grade mode." );
		equal(  range(col, data), 0, "Calculating class-wide grade range." );
	}
);
