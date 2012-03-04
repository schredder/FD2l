// Calculates grade mean for a particular column
// params:   column - name of column to calculate from
//         students - student students
// assert: column is homework/quiz/exam type, NOT "$" prefixed field
// assert: students object conforms to project standard
// return:   number - mean grade for a particular column
function gradeMean(column, students) {
	// TODO input checking
   var classSize = 0;
   var sum = 0;

   for (var id in students) {
   	if (!id.match(/^\$/)) {
	      sum += students[id][column];
			classSize++;
   	};
   };

	return sum / classSize;
};

// Calculates grade median for a particular column
// params:   column - name of column to calculate from
//         students - student students
// assert: column is homework/quiz/exam type, NOT "$" prefixed field
// assert: students object conforms to project standard
// return:   number - median grade for a particular column
function gradeMedian(column, students) {
	// TODO input checking
   var grades = [];
   for (var id in students) {
   	if (!id.match(/^\$/)) {
   		grades.push(students[id][column]);
   	};
   };

	return getMedian(grades);
};

// Calculates grade range for a particular column
// params:   column - name of column to calculate from
//         students - student students
// assert: column is homework/quiz/exam type, NOT "$" prefixed field
// assert: students object conforms to project standard
// return:   number - grade range for a particular column
function gradeRange(column, students) {
	// TODO input checking
   var grades = [];

   for (var id in students) {
      if (!id.match(/^\$/)) { grades.push(students[id][column]); };
   };

	return getRange(grades);
};

// Calculates grade median for the whole class
// params: students - student students
// assert: students object conforms to project standard
// return:   number - median grade for a particular column
function classMedian(students) {
	// TODO input checking
   var totalKey = "TOTAL(100%)"; // Either change this, or define constants.
   var grades = [];

   for (var id in students) { 
      if (!id.match(/^\$/)) { grades.push(students[id][totalKey]); };
   };

	return getMedian(grades);
};

// Calculates grade range for the whole class
// params: students - student students
// assert: students object conforms to project standard
// assert: final grade is a %, both min grade and max grade are >= 0
// return:   number - median grade for a particular column
function classRange(students) {
	// TODO input checking
   var totalKey = "TOTAL(100%)"; // Either change this, or define constants.
   var minGrade = "$MIN";
   var maxGrade = "$MAX";

	return students[maxGrade][totalKey] - students[minGrade][totalKey];
};


// Returns the median of an array of numbers
// params: nums - array of numbers
// assert: each element of nums is >= 0
// return: number - median of the given array
function getMedian(nums) {
   // Get a copy of nums: (if there's a bettery way, I'd love to know)
   var numsCopy = nums.slice(0);
   var median;
   
   // Ascending numerical sort:
   numsCopy.sort(function(a,b){ return a-b; });
   
   // If array has even number of elements, median is avg of two middle elements
   if (numsCopy.length %2 == 0) {
   	var midHi = numsCopy[Math.ceil((numsCopy.length-1)/2)];
	   var midLo = numsCopy[Math.floor((numsCopy.length-1)/2)];
	   median = (midHi + midLo) / 2;
	}
	// Else, if array has odd number of elements, median is middle element
	else { median = numsCopy[Math.floor(numsCopy.length / 2)]; };

	return median;
};

// Returns the range of an array of numbers
// params: nums - array of numbers
// assert: each element of nums is >= 0
// return: number - range of the given array
function getRange(nums) {
   // Get a copy of nums: (if there's a bettery way, I'd love to know)
   var numsCopy = nums.slice(0);
   
   // Ascending numerical sort:
   numsCopy.sort(function(a,b){ return a-b; });
   var last = numsCopy.length - 1;

	return numsCopy[last] - numsCopy[0];
}
