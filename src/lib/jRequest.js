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
			ret.vals[cols[2]] = cols;
	}
	return ret;
}

//Parses data into students  (should this be incoperated into csvtojson function?)
//Param: data - required for the passthrough object 
//returns: Students in key/val array where key is repo and  the value is an array. each student array is key/val where key 
//is header(assingment neme) and value is score recieved. Contains a row where the headings repo where the headings are equal to the values 
function getStudents (data)
{
    students = new Array();
    
    var json = CSVtoJSON(data);
    for (var repo in json.vals )
    {
        students[repo] = new Array();
        for (var i=0; i<json.vals[repo].length;i++)
        {
            //TODO add checks here to remove data that is usless like repo
            var header = json.vals["repo"][i];
            students[repo][header] = json.vals[repo][i];
        }
    }
    /*
    for (student in students) 
    {
        for (score in students[student])
            console.log(score +" "+students[student][score]);
    }*/
    return students;
}
 
