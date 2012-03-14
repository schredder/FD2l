//Some functional
//module("getSection() data object test");


//TODO test test getCatagories
module("Async getSection(data) call");
asyncTest("Tests getSection parsing of data", function(){		
	fn = function(data)
	{			
        start();
	    var section = getSection(data);

        equal( typeof section, "object", "Section Object returned");
        equal( typeof section.students, "object", "Student object  has been returned");
	
		//equal(			
    };
		
	requestCSV("gradesExampleFixed.csv", fn);
});

// test Student object creation
module("Student(student,types,catagories) test");
test("Test student object creation", function() {
    var emptyObj = new Object();
    var testStudent = {section:"cs1",magic:"cs170",repo:"2k4",Total:"90.5",Grade:"A",q1:"9",q2:"6",
                   q3:"5",q4:"",q5:"7",m1:"7",m2:"8",m3:"6",m4:"5",final:"32",
                   hw1:"7",hw2:"6",hw3:"8",hw4:"9",hw5:"5",hw6:"7",hw7:"7",HWFeedback:"lovely test"};
    var testTypes = {section:"section",magic:"",repo:"$TYPE",Total:"score",Grade:"lettergrade",q1:"score",q2:"score",
                   q3:"score",q4:"score",q5:"score",m1:"score",m2:"score",m3:"score",m4:"score",final:"score",
                   hw1:"score",hw2:"score",hw3:"score",hw4:"score",hw5:"score",hw6:"score",hw7:"score",HWFeedback:"note"};
    var testCatagories = {section:"",magic:"",repo:"$CATAGORY",Total:"totalgrade",Grade:"",q1:"quiz",q2:"quiz",
                   q3:"quiz",q4:"quiz",q5:"quiz",m1:"midterm",m2:"midterm",m3:"midterm",m4:"midterm",final:"final",
                   hw1:"hw",hw2:"hw",hw3:"hw",hw4:"hw",hw5:"hw",hw6:"hw",hw7:"hw",HWFeedback:""};
    var emptyStudent = { letterGrade:"",note:"",totalGrade:"-1",section:"",repo:"",scores:{}};
    var filledStudent = {
                            letterGrade:"A",
                            note:"lovely test",
                            totalGrade:"90.5",
                            section:"cs1",
                            repo:"2k4",
                            scores:
                            {   
                                quiz:{q1:"9",q2:"6",q3:"5",q4:"",q5:"7"},
                                midterm:{m1:"7",m2:"8",m3:"6",m4:"5"},
                                final:{final:"32"},
                                hw:{hw1:"7",hw2:"6",hw3:"8",hw4:"9",hw5:"5",hw6:"7",hw7:"7"}
                            }
                        };
    //deepequals will not work on this withough format becaus hidden properties like constructor are different
    var testEmpty =  new Student(emptyObj,emptyObj,emptyObj); 
    for(var key in emptyStudent)
        deepEqual(testEmpty[key], emptyStudent[key], key + " set correctly to "+testEmpty[key] +" in empty object");
    
    var testFilled = new Student(testStudent,testTypes,testCatagories);
    for(var key in testFilled)
        deepEqual(testFilled[key],filledStudent[key], key + " set correctly to "+testFilled[key] +" in dummy object");
});


//test getSection
module("getCatagories() test");
test("Test getCatagories function", function() {
    var emptyObj = {};
    var testObj = {section:"",magic:"",repo:"$CATAGORY",Total:"totalgrade",Grade:"",q1:"quiz",q2:"quiz",
                   q3:"quiz",q4:"quiz",q5:"quiz",m1:"midterm",m2:"midterm",m3:"midterm",m4:"midterm",final:"final",
                   hw1:"hw",hw2:"hw",hw3:"hw",hw4:"hw",hw5:"hw",hw6:"hw",hw7:"hw",HWFeedback:""};
    var exspectedObj = {quiz:{},midterm:{},final:{},hw:{}};
    expect(2);
    deepEqual( getCatagories({}),{},"getCatagories empty in empty out " );
    deepEqual(getCatagories(testObj),exspectedObj,"getCatagories dummy data in catagoriesList out");
});
