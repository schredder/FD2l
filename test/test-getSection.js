//Some functional
//TODO test Student object creation
//TODO test test getCatagories
//module("getSection() data object test");
/*
asyncTest("somthing", 
	function() 
	{		
		expect(3);
		
		fn = function(data)
		{			
			ok( true, "Function Successfully Called" );		
			
			equal( typeof object, "string", "Data has been returned");			
			equal( data.split("\n").length, 87, "Returned data has appropriate number of lines.");
			
			start();
		};
		
		requestCSV("gradesExample.csv", fn);
	}
);
*/

//TODO getSection
module("getCatagories() test");
test("Test getCatagories function", function() {
    var emptyObj = {}
    var testObj = {section:"",magic:"",repo:"$CATAGORY",Total:"totalgrade",Grade:"",q1:"quiz",q2:"quiz",
                   q3:"quiz",q4:"quiz",q5:"quiz",m1:"midterm",m2:"midterm",m3:"midterm",m4:"midterm",final:"final",
                   hw1:"hw",hw2:"hw",hw3:"hw",hw4:"hw",hw5:"hw",hw6:"hw",hw7:"hw",HWFeedback:""};
    var exspectedObj = {totalgrade:{},quiz:{},midterm:{},final:{},hw:{}};
    //expect();
    deepEqual( getCatagories({}),{},"getCatagories empty in empty out " );
    deepEqual(getCatagories(testObj),exspectedObj,"getCatagories dummy data in catagoriesList out");
});
