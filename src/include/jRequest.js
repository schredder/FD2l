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
	ret.vals = new Array();
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
            //changed to add k/v pairs instead of indexed array
            if(i==0)
            {
                header = cols;
            }
            else 
            {
                var student = new array();
                for (var k=0; k<cols.length;k++)
                    student[header[k]] = col[k];
                ret.vals[cols[2]] = student;
            }
        }
	}
	return ret;
}
/*
//student object constructor
var Student(student,catagorieslist,)
{
    this.scores = ;
}
//Parses data into students  (should this be incoperated into csvtojson function?)
//Param: data - required for the passthrough object 
//returns: Students object with socres array in key/val array where key is repo and  the value is an array. each student array is key/val where key 
//is header(assingment neme) and value is score recieved. Contains a row where the headings repo where the headings are equal to the values 
function getStudents (data)
{
    var students = new Object();
    students.scores = new Array();
    //dynamic members
    
    students.hwPro;
    students.quizPro;
    students.finalPro;
    studnets.midtermPro;
		
    var json = CSVtoJSON(data);
    for (var repo in json.vals )
    {
        //TODO rewrite headers to human readable in "repo" row
        students.scores[repo] = new Array();
        for (var i=0; i<json.vals[repo].length;i++)
        {
            //TODO add checks here to remove data that is usless like repo 
            //TODO Clean header row headers 
            //TODO Validate Data
            var header = json.vals["repo"][i];
            students.scores[repo][header] = json.vals[repo][i];
            
            //populate subtype arrays
	        if(json.vals["$CATAGORY"][i]=="quiz")
            {
                
            }
            else if(json.vals["$CATAGORY"][i]=="midterm")
            {
            }
            else if(json.vals["$CATAGORY"][i]=="hw")
            {  
                
            }
            else if(json.vals["$CATAGORY"][i]=="final")
            {
                student.finalTest = json.vals[repo][i];
            }

        }
    }
    
    #test build loop
    for (student in student.sscores) 
    {
        for (score in students.scores[student])
            console.log(score +" "+students.scores[student][score]);
    }
    return students;
     
}
function GetCatagory(students)
{
    
    return 
} 
*/
