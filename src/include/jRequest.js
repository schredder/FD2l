// requestCSV:
// param: 	file 	- File name to be provided
// param: 	fn		- Callback function to receive the data. 
function requestCSV(file, fn)
{
	// jQuery request of file. 
	$.get(file,
		function(data) {
			fn(data);
		});
}

// CSVtoJSON
// param: 	data - CSV Data to be converted into an object
// return:  Object with all of the CSV values in the *.vals location as a Key/Value array, where the third column is the key.
function CSVtoJSON(data)
{
	// Rows are split off of new lines in simple CSV
	rows = data.split("\n");

	ret = new Object();
	ret.vals = new Object();
    var header = new Array();
    

	// iterate over all of the rows to build the object(must start a 0 so heading is avalible downstream)
	for (i = 0; i < rows.length; i++)
	{
		// Split on ", " in CSV data we received
		cols = rows[i].split(",", rows[0].split("\",\"").length);

		// Remove quotes out of all underlying elements
		for (j = 0; j < cols.length; j++)
			cols[j] = cols[j].replace(/\"/g, "");
        
		// Skip over undefined values for data integrity
		if (cols[2] != undefined)
        {   
            //changed to add k/v object instead of array
            if(i==0)
            {
                header = cols;
            }
            else 
            {
                var student = {};
                for (var k=0; k<cols.length;k++)
                    student[header[k]] = cols[k];
                ret.vals[cols[2]] = student;
            }
        }
	}
	return ret;
}

//student object constructor
//Param: student is object map of student data.
//Param: the types row from import (must be score,note,lettergrade,section or $TYPE(only repo cell))
//Param: catagories row from csv (assignment groupings can include anything)
var Student = function(student,types,catagories)
{    
    this.letterGrade = "";
    this.notes = "";
    this.totalGrade = -1;
    this.section = "";
    this.repo = "";
    this.scores = getCatagories(catagories);

    //TODO Add set total Grade Function

    for(key in Object.keys(student))
    {   
        

        if(type[key]=="$TYPE")
            this.repo = student[key];
        else if(type[key]==="note")
            this.note = student[key];    
        else if(type[key]==="lettergrade")
            this.LetterGrade = student[key];    
        else if(type[key]==="section")
            this.section = student[key];    
        else if(type[key]==="score")
        {
            if(catagoies[key]=="totalgrade")
                this.totalGrade=student[key];
            else
            {
                this.scores[catagories[key]][key]=student[key];
            }
 
        }
    
    }
}

//Param: data - required for the passthrough object 
//returns section object with map object of  students see Student construcor for more info
function getSection(data)
{
    var section = {};
    section.students = {};
		
    var json = CSVtoJSON(data);
    for (var repo in json.vals )
    {   
        
        if(repo != "$TYPE" || repo != "$CATAGORY" || repo != "$FINAL" ||repo != "$QUIZ" ||repo != "$HW" ||repo != "$MIDTERM") 
            section.students[repo] = new Student(json[repo],json["$TYPES"],json["$CATAGORIES"]);
    }
    //TODO add class prorates
    return section;
     
}

//
//return object of catagories
function getCatagories(catagoriesObj)
{
    var catagoriesList = {};
    
    //if (typeof catagoriesObj != "object")
    //    return {};

    for (item in catagoriesObj)
        if(catagoriesObj[item] != "$CATAGORY" && catagoriesObj[item]!= "")
            catagoriesList[catagoriesObj[item]] = {};
    return catagoriesList;
} 

