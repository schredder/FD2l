// requestCSV
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
        console.log(ret.vals);	
	return ret;
}

//Parses data into students  (should this be incoperated into csvtojson function?)
//getStudents
//
function getStudents (data)
{
    sections = new Object();
    sections.students = new Array();
    
    var json = CSVtoJSON(data);
    for (var repo in json.vals )
    {
        //skip headings row
        if (repo == "repo"){}
        else
        {
            sections.students[repo] = new Array();
            for (var score in json.vals[repo])
            {
                var header = json.vals["repo"]
                sections.students[repo][json.vals[header]] = score;
            }
        }
    }
    return sectons;
}
 
