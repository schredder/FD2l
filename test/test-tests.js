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
			equal( data.split("\n").length, 37, "Returned data has appropriate number of lines.");
			
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
			var isSplit = true;
            var isKeyed = true;
			for (var i in obj.vals) 
			{
                //reducing test noise
				//equal( Object.keys(obj.vals[i]).length, 23, "Split was appropriate");
				//equal( i, obj.vals[i]["repo"], "Keys are correct");
                if ( Object.keys(obj.vals[i]).length != 23)
                    isSplit=false;
                if (i !== obj.vals[i]["repo"])
                    isKeyed=false;
			}
            ok(isSplit, "Split was appropriate")
            ok(isKeyed, "Keys are correct")
		};
		
		requestCSV("gradesExampleFixed.csv", fn);
	}
);
