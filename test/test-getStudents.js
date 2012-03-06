//Not functional

module("Get Students data object test");

test("somthing", 
	function() 
	{		
		expect(3);
		stop();
		
		fn = function(data)
		{			
			ok( true, "Function Successfully Called" );		
			
			equal( typeof data, "string", "Data has been returned");			
			equal( data.split("\n").length, 87, "Returned data has appropriate number of lines.");
			
			start();
		};
		
		requestCSV("gradesExample.csv", fn);
	}
);

