function requestCSV(file, fn)
{
	$.get(file,
		function(data) {
			fn(data);
		});
}

function CSVtoJSON(data)
{
	rows = data.split("\n");

	ret = new Object();
	ret.vals = new Array();

	for (i = 1; i < rows.length; i++)
	{
		cols = rows[i].split(",", rows[1].split("\",\"").length);

		for (j = 0; j < cols.length; j++)
			cols[j] = cols[j].replace(/\"/g, "");

		ret.vals[cols[2]] = cols.length;
	}
	
	return ret;
}
  