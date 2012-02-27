// Calculates grade mean for a particular column
// params:   column - name of column to calculate from
//         students - student students
// return:   number - mean grade for a particular column
function gradeMean(column, students) {
	// TODO input checking

   var classSize = students.length;
   var sum = 0;

   for (var student in students) {
      sum += students[student][column];
   }

	return sum / classSize;
}

// Calculates grade median for a particular column
// params:   column - name of column to calculate from
//         students - student students
// return:   number - median grade for a particular column
function gradeMedian(column, students) {
	// TODO input checking
   var grades = [];

   for (var student in students) {
      grades.push(student[column]);
   }

   grades.sort(function(a,b){ return a-b; });
   
   midHi = grades[Math.ciel(grades.length/2)];
   midLo = grades[Math.floor(grades.length/2)];

	return (medHi + medLow) / 2;
}

// Calculates grade range for a particular column
// params:   column - name of column to calculate from
//         students - student students
// return:   number - grade range for a particular column
function gradeRange(column, students) {
	// TODO input checking
   var grades = [];

   for (var student in students) {
      grades.push(student[column]);
   }

   grades.sort(function(a,b){ return a-b; });
   
   /* Can't remember if JS arrays support "-1" or not. Guess I'll find out in
      testing. */
	return grades[-1] - grades[0];
}

// Calculates grade median for the whole class
// params: students - student students
// return:   number - median grade for a particular column
function classMedian(students) {
	// TODO
	return 0;
}

// Calculates grade range for the whole class
// params: students - student students
// return:   number - median grade for a particular column
function classRange(students) {
	// TODO
	return 0;
}
