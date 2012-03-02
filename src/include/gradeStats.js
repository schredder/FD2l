// Calculates grade mean for a particular column
// params:   column - name of column to calculate from
//         students - student students
// return:   number - mean grade for a particular column
function gradeMean(column, students) {
	// TODO input checking
   var classSize = 0;
   var sum = 0;

   for (var id in students) {
      sum += students[id][column];
      classSize++;
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
   for (var id in students) { grades.push(students[id][column]); }

	return getMedian(grades);
}

// Calculates grade range for a particular column
// params:   column - name of column to calculate from
//         students - student students
// return:   number - grade range for a particular column
function gradeRange(column, students) {
	// TODO input checking
   var grades = [];

   for (var id in students) {
      if (!id.match(/^\$/)) { grades.push(students[id][column]); }
   }

	return getRange(grades);
}

// Calculates grade median for the whole class
// params: students - student students
// return:   number - median grade for a particular column
function classMedian(students) {
	// TODO input checking
   var totalKey = "TOTAL(100%)"; // Either change this, or define constants.
   var grades = [];

   for (var id in students) { 
      if (!id.match(/^\$/)) { grades.push(students[id][totalKey]); }
   }

	return getMedian(grades);
}

// Calculates grade range for the whole class
// params: students - student students
// return:   number - median grade for a particular column
function classRange(students) {
	// TODO input checking
   var totalKey = "TOTAL(100%)"; // Either change this, or define constants.
   var minGrade = "$MIN";
   var maxGrade = "$MAX";

	return students[maxGrade][totalKey] - students[minGrade][totalKey];
}


// Returns the median of an array of numbers
// params:   nums - array of numbers
// return: number - median of the given array
function getMedian(nums) {
   // Get a copy of nums: (if there's a bettery way, I'd love to know)
   var numsCopy = nums.slice(0);
   
   // Ascending numerical sort:
   numsCopy.sort(function(a,b){ return a-b; });
   
   var midHi = numsCopy[Math.ceil(numsCopy.length/2)];
   var midLo = numsCopy[Math.floor(numsCopy.length/2)];

	return (midHi + midLo) / 2;
}

// Returns the range of an array of numbers
// params:   nums - array of numbers
// return: number - range of the given array
function getRange(nums) {
   // Get a copy of nums: (if there's a bettery way, I'd love to know)
   var numsCopy = nums.slice(0);
   
   // Ascending numerical sort:
   numsCopy.sort(function(a,b){ return a-b; });
   var last = numsCopy.length - 1;

	return numsCopy[last] - numsCopy[0];
}
