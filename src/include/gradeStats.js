// Calculates grade mean for a particular assignment
// params: assignment - name of column to calculate from
//            section - class section object
// assert: section conforms to project standard
// return: number - mean grade for a particular column
function gradeMean(assignment, type, section) {
   var grades = [];

   // Check if assignment exists
   if (jQuery.type(section.assignmentInfo[type][assignment]) == "undefined") {
      return -1;
      //throw new Error("Assignment " + assignment + " is undefined.");
   }

   for (var repo in section.students)
      grades.push(section.students[repo].scores[type][assignment]);

   return getMean(grades);
};

// Calculates grade median for a particular assignment
// params: assignment - name of column to calculate from
//            section - class section object
// assert: section conforms to project standard
// return: number - median grade for a particular column, or -1 if invalid
function gradeMedian(assignment, type, section) {
   var grades = [];

   // Check if assignment exists
   if (jQuery.type(section.assignmentInfo[type][assignment]) == "undefined") {
      return -1;
      //throw new Error("Assignment " + assignment + " is undefined.");
   }

   for (var repo in section.students) {
      grades.push(section.students[repo].scores[type][assignment]);
   };

   return getMedian(grades);
};

// Calculates grade range for a particular assignment
// params: assignment - name of column to calculate from
//            section - class section object
// assert: section conforms to project standard
// return:   number - grade range for a particular column, or -1 if invalid
function gradeRange(assignment, type, section) {
   var grades = [];

   // Check if assignment exists
   if (jQuery.type(section.assignmentInfo[type][assignment]) == "undefined") {
      return -1;
      //throw new Error("Assignment " + assignment + " is undefined.");
   }

   for (var repo in section.students) {
      grades.push(section.students[repo].scores[type][assignment]);
   };

   // Check for negatives and non-numbers and return
   return (containsValidGrades(grades)) ? getRange(grades) : -1;
};

// Calculates grade mean for the whole class
// params: section - class section object
// assert: section conforms to project standard
// return:  number - mean grade for a particular column, or -1 if invalid
function classMean(section) {
   var grades = [];

   for (var repo in section.students) { 
      grades.push(section.students[repo].totalGrade);
   };

   // Check for negatives and non-numbers and return
   return (containsValidGrades(grades)) ? getMean(grades) : -1;
};

// Calculates grade median for the whole class
// params: section - class section object
// assert: section conforms to project standard
// return:  number - median grade for a particular column, or -1 if invalid
function classMedian(section) {
   var grades = [];

   for (var repo in section.students) { 
      grades.push(section.students[repo].totalGrade);
   };

   // Check for negatives and non-numbers
   if (!containsValidGrades(grades)) return -1;

   // Check for negatives and non-numbers and return
   return (containsValidGrades(grades)) ? getMedian(grades) : -1;
};

// Calculates grade range for the whole class
// params: section - class section object
// assert: section conforms to project standard
// return:   number - median grade for a particular column, or -1 if invalid
function classRange(section) {
   var grades = [];
   for (var repo in section.students) {
      grades.push(section.students[repo].totalGrade);
   }
   
   return (containsValidGrades(grades)) ? getRange(grades) : -1;
};

// Returns the mean of an array of numbers
// params: nums - array of numbers
// assert: each element of nums is >= 0
// return: number - mean of given array, or -1 if invalid
function getMean(nums) {
	var numsCopy = nums.slice(0);
	var sum = 0;
	
	for (var i in numsCopy) sum += numsCopy[i];
	
	return (containsValidGrades(nums)) ? sum / numsCopy.length : -1;
}

// Returns the median of an array of numbers
// params: nums - array of numbers
// assert: each element of nums is >= 0
// return: number - median of the given array, or -1 if invalid
function getMedian(nums) {
   // Get a copy of nums: (if there's a bettery way, I'd love to know)
   var numsCopy = nums.slice(0);
   var median;
   
   // Check for negatives and non-numbers
   if (!containsValidGrades(numsCopy)) return -1;

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
// return: number - range of the given array, or -1 if invalid
function getRange(nums) {
   // Get a copy of nums: (if there's a bettery way, I'd love to know)
   var numsCopy = nums.slice(0);
   
   // Check for negatives and non-numbers
   if (!containsValidGrades(numsCopy)) return -1;

   // Ascending numerical sort:
   numsCopy.sort(function(a,b){ return a-b; });
   var last = numsCopy.length - 1;

   return numsCopy[last] - numsCopy[0];
}

// Returns true if the array contains only valid grades, otherwise false
// params: nums - array of numbers
// return: true if array is only valid grades, otherwise false
//         A valid grade is of type "number" and is >= 0.
function containsValidGrades(nums) {
   var isValid = true;
   for (var i = 0; i < nums.length; i++)
   	isValid = (isValid && isValidGrade(nums[i]));

   return isValid;
}

// Returns true if num is of type "number" and is >= 0
function isValidGrade(num) {
	return (jQuery.type(num) == "number" && num >= 0);
}

// Calculates and returns total grade of given student, otherwise -1 if invalid
// params: student - the repo name for whom to generate a letter grade
//			  section - the section the above student resides
// return: final grade of given student if it is valid, otherwise -1
function getTotalGrade(student, section) {
	var scores = section.students[student].scores;
	var totalGrade = 0;
	for (var type in scores) {
		var earned = 0;
		var possible = 0;
		
		for (var assignment in scores[type]) {
			var assignmentInfo = section.assignmentInfo[type][assignment];
			if (!isValidGrade(scores[type][assignment])) return -1;

			earned += scores[type][assignment];
			possible += assignmentInfo.max;
			totalGrade += (earned / possible) * assignmentInfo.weight;
		}
	}
	
	return (isValidGrade(totalGrade)) ? totalGrade : -1;
}

// Returns letter grade of the given student, otherwise -1 if invalid
// params: student - the repo name for whom to generate a letter grade
//			  section - the section the above student resides
// return: letter grade of given student if final grade is valid, otherwise -1
function getLetterGrade(student, section) {
	var finalGrade = section.students[student].finalGrade;

	if (containsValidGrades([finalGrade])) {
		for (letter in section.cutoffs) {
			if (finalGrade >= section.cutoffs[letter])
				return section.cutoffs[letter];
		}
		// else (if finalGrade is valid)
		return "F";
	}
	
	// else (if finalGrade is invalid)
	return -1;
}

// Returns true on valid stats addition, otherwise false
// params: section - class section object
// assert: section conforms to project standard
// return: true if valid stats were added, otherwise false
function addClassStats(section) {
	section.classStats = {
		averageGrade: classMean(section),
		medianGrade:  classMedian(section),
		gradeRange:   classRange(section)
	}
	
	if (section.classStats.averageGrade == -1
	 || section.classStats.medianGrade  == -1
	 || section.classStats.gradeRange	== -1)
	 	return false;
	// else
	return true;
}

// Returns true on successful student stats addition, otherwise false
// params: student - the student to add stats for
//			  section - class section object
// assert: section conforms to project standard
// return: true if stats were added, otherwise false
function addTotalAndLetterGrades(student, section) {
	section.students[student].totalGrade = getTotalGrade(student, section);
	section.students[student].letterGrade = getLetterGrade(student, section);
	
	if (section.students[student].totalGrade ==  -1
	 || section.students[student].letterGrade == -1)
	 	return false;
	// else
	return true;
}