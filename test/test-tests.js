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
				equal( Object.keys(obj.vals[i]).length, 23, "Split was appropriate");
				equal( i, obj.vals[i]["repo"], "Keys are correct");
                //reducing test noise
                /*if ( Object.keys(obj.vals[i]).length != 23)
                    isSplit=false;
                if (i !== obj.vals[i]["repo"])
                    isKeyed=false;
                */
			}
            ok(isSplit, "Split was appropriate")
            ok(isKeyed, "Keys are correct")
		};

		requestCSV("gradesExampleFixed.csv", fn);
	}
);


module("Visualization");

test("Ensure that the assignment list creates a dropdown of assignments",
	function()
	{
		emptyObj = new Array();
		expectedEmptyHTML = "<SELECT NAME='assignment_list'><OPTION VALUE=''>No Assignments Available</OPTION></SELECT>";
		
		testObj1 = ['midterm1', 'midterm2', 'midterm3'];
		expectedFilledHTML1 = "<SELECT NAME='assignment_list'><OPTION VALUE='midterm1'>midterm1</OPTION><OPTION VALUE='midterm2'>midterm2</OPTION><OPTION VALUE='midterm3'>midterm3</OPTION></SELECT>";

		testObj2 = ['midterm1', 'midterm2', 'midterm3', 'quiz1', 'quiz2', 'final'];
		expectedFilledHTML2 = "<SELECT NAME='assignment_list'><OPTION VALUE='midterm1'>midterm1</OPTION><OPTION VALUE='midterm2'>midterm2</OPTION><OPTION VALUE='midterm3'>midterm3</OPTION><OPTION VALUE='quiz1'>quiz1</OPTION><OPTION VALUE='quiz2'>quiz2</OPTION><OPTION VALUE='final'>final</OPTION></SELECT>";

		expect(3);

		equal(getAssignmentList(emptyObj), expectedEmptyHTML, "Empty Dropdown Generated Properly");
		equal(getAssignmentList(testObj1), expectedFilledHTML1, "Filled Dropdown Generated Properly");
		equal(getAssignmentList(testObj2), expectedFilledHTML2, "Filled Dropdown Generated Properly");
	}
);

module ("Frontend Generation");

test("Ensure data needed for the front end exists.",
	function()
	{
		var testObj = {section:"",magic:"",repo:"$CATAGORY",Total:"totalgrade",Grade:"",q1:"quiz1",q2:"quiz2",
					   q3:"quiz3",q4:"quiz",q5:"quiz",m1:"midterm",m2:"midterm",m3:"midterm",m4:"midterm",final:"final",
					   hw1:"hw",hw2:"hw",hw3:"hw",hw4:"hw",hw5:"hw",hw6:"hw",hw7:"hw",HWFeedback:""};

		expect(4);
		equal(getSections(testObj), ["sec1","sec2","sec3"]);
		equal(getCategories(getSections(testObj)[0]), ["quiz","hw","mditerm"]);
		equal(getAssignmentList(getCategories(getSections(testObj)[0])[0]), ["quiz1","quiz2","hw2","hw3"]);
		equal(getAssignmentScore(getAssignmentList(getCategories(getSections(testObj)[0])[0])[0]), 10);
	}
);
