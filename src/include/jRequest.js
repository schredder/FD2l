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
                    student[header[k]] = col[k];
                ret.vals[cols[2]] = student;
            }
        }
	}
	return ret;
}

var Score()
{
    ;
}
//student object constructor
//Param: student is object map of student data.
//Param: the types row from import (must be score,note,lettergrade,section or $TYPE(only repo cell))
//Param: catagories row from csv (assingemtn groupings can include anything)
var Student(student,types,catagories)
{   
    var catagoriesList = getCatagories(catagories); 
    this.scores = ;
    for(key in Object.Keys(student))
    {
        
    }
    this.letterGrade = ;
    this.notes = ;
    this.totalGrade = ;
    this.section = ;
    this.repo;
}

//Parses data into students  (should this be incoperated into csvtojson function?)
//Param: data - required for the passthrough object 
//returns: Students object with socres array in key/val array where key is repo and  the value is an array. each student array is key/val where key 
//is header(assingment neme) and value is score recieved. Contains a row where the headings repo where the headings are equal to the values 
function getSection (data)
{
    var section = {};
    section.students = {};
		
    var json = CSVtoJSON(data);
    for (var repo in json.vals )
        section.students[repo] = new Student(json[repo],json["$TYPES"],json["$CATAGORIES"]);
    
    return section;
     
}
//return object of catagories
function getCatagories(catagoriesObj)
{
    var catagoriesList = {};
    for (item in catagoiesObj.values)
        if(item != "$TYPE")
            catagoriesList[item] = {};
    return catagoriesList;
} 

