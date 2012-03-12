module("CSV Importer");

test("Ensure that our function gets called when the file is requested and that we are passed the appropriate data", 
	function() 
	{		
		expect(3);
		stop();
		
		fn = function(data)
		{			
			ok( true, "Function Successfully Called" );		
			
			equal( typeof data, "string", "Data has been returned");			
			equal( data.split("\n").length, 32, "Returned data has appropriate number of lines.");
			
			start();
		};
		
		requestCSV("gradesExampleFixed.csv", fn);
	}
);

module("CSV Object Conversion");

test("Ensure that the object returned has repo identifiers as keys, and the appropriate number of columns",
	function() 
	{
		stop();
		
		fn = function(data)
		{			
			var obj = CSVtoJSON(data);
			
			equal( typeof obj, "object", "JSON Object has been returned");			
			equal( typeof obj.vals, "object", "Values array has been returned");
			
			start();
			
			for (var i in obj.vals) 
			{
				equal( obj.vals[i].length, 23, "Split was appropriate");
				equal( i, obj.vals[i][2], "Keys are correct");
			}
		};
		
		requestCSV("gradesExampleFixed.csv", fn);
	}
);
