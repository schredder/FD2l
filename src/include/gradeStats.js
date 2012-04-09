// Calculates grade mean for a particular assignment
// params: assignment - name of column to calculate from
//            section - class section object
// assert: section conforms to project standard
// return: number - mean grade for a particular column
function gradeMean(assignment, type, section) {
   // Check if assignment exists
   if ($.type(section.assignmentInfo[type][assignment]) == "undefined") {
      return -1;
      //throw new Error("Assignment " + assignment + " is undefined.");
   };

   var grades = getGrades(assignment, type, section);

   return getMean(grades);
};

// Calculates grade median for a particular assignment
// params: assignment - name of column to calculate from
//            section - class section object
// assert: section conforms to project standard
// return: number - median grade for a particular column, or -1 if invalid
function gradeMedian(assignment, type, section) {
   // Check if assignment exists
   if ($.type(section.assignmentInfo[type][assignment]) == "undefined") {
      return -1;
      //throw new Error("Assignment " + assignment + " is undefined.");
   };
   
   var grades = getGrades(assignment, type, section);

   return getMedian(grades);
};

// Calculates grade range for a particular assignment
// params: assignment - name of column to calculate from
//            section - class section object
// assert: section conforms to project standard
// return:   number - grade range for a particular column, or -1 if invalid
function gradeRange(assignment, type, section) {
   // Check if assignment exists
   if ($.type(section.assignmentInfo[type][assignment]) == "undefined") {
      return -1;
      //throw new Error("Assignment " + assignment + " is undefined.");
   };

   var grades = getGrades(assignment, type, section);
   return getRange(grades);
};

// Calculates grade mean for the whole class
// params: section - class section object
// assert: section conforms to project standard
// return:  number - mean grade for a particular column, or -1 if invalid
function classMean(section) {
   var grades = getTotalGrades(section);
   return getMean(grades);
};

// Calculates grade median for the whole class
// params: section - class section object
// assert: section conforms to project standard
// return:  number - median grade for a particular column, or -1 if invalid
function classMedian(section) {
   var grades = getTotalGrades(section);
   return getMedian(grades);
};

// Calculates grade range for the whole class
// params: section - class section object
// assert: section conforms to project standard
// return:   number - median grade for a particular column, or -1 if invalid
function classRange(section) {
   var grades = getTotalGrades(section); 
   return getRange(grades);
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
};

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
};

// Returns true if the array contains only valid grades, otherwise false
// params: nums - array of numbers
// return: true if array is only valid grades, otherwise false
//         A valid grade is of type "number" and is >= 0, or is null.
function containsValidGrades(nums) {
   var isValid = true;
   
   for (var i in nums)
   	isValid = (isValid && isValidGrade(nums[i]));

   return isValid;
};

// Returns true if num is of type "number" and is >= 0 or is "null" type
// params: num - a number
// return: true if num is a valid grade or null, otherwise false
//         A valid grade is of type "number" and is >= 0, or is null.
function isValidGrade(num) {
	return (($.type(num) == "number" && num >= 0)
	      || $.type(num) == "null");
};

// Calculates and returns total grade of given student, otherwise -1 if invalid
// params: student - the repo name for whom to generate a letter grade
//			  section - the section the above student resides
// return: final grade of given student if it is valid, otherwise -1
function getTotalGrade(student, section) {
	var scores = section.students[student].scores;
	var totalGrade = 0;

	var earned = 0;
	var possible = 0;
	var nullWeights = [];
	for (var type in scores) {
		for (var assignment in scores[type]) {
			var assignmentInfo = section.assignmentInfo[type][assignment];
			if (!isValidGrade(scores[type][assignment])) { return -1; }
         else if ($.type(scores[type][assignment]) == "null") {
         	nullWeights.push(assignmentInfo.weight);
         }
         else {
			   earned = scores[type][assignment];
			   possible = assignmentInfo.max;
			   totalGrade += (earned / possible) * assignmentInfo.weight;
			}
		};
	};

	// Factor exempt/ungraded assignments into total
	var ungradedFactor = 0;
	for (var i in nullWeights) ungradedFactor += totalGrade * nullWeights[i];
	
	// Convert to %
   totalGrade = (totalGrade + ungradedFactor) * 100;
   
   // dirty rounding to 2 decimal places
   totalGrade = Math.round(totalGrade * 100) / 100;

	return (isValidGrade(totalGrade)) ? totalGrade : -1;
};

// Returns letter grade of the given student, otherwise -1 if invalid
// params: student - the repo name for whom to generate a letter grade
//			  section - the section the above student resides
// return: letter grade of given student if final grade is valid, otherwise -1
function getLetterGrade(student, section) {
	var totalGrade = section.students[student].totalGrade;

	if (isValidGrade(totalGrade)) {
      if ($.type(totalGrade) == "null") return totalGrade;
		for (letter in section.cutoffs) {
			if (totalGrade >= section.cutoffs[letter])
				return letter;
		};
		// else (if totalGrade is valid)
		return "F";
	};
	
	// else (if finalGrade is invalid)
	return -1;
};

// Returns total grade for every student in the given section
// params: section - The section to get total grades from
// return: an array of total grades
function getTotalGrades(section) {
   var grades = [];
   var grade;
   for (var repo in section.students) {
      grade = section.students[repo].totalGrade;
      if ($.type(grade) != "null") grades.push(grade);
   };

   return grades;
};

// Returns every students' grade for a particular assignment
// params: assignment - the assignment of the desired grade
//         type - the type of assignment
//         section - the section object containing students and their grades
function getGrades(assignment, type, section) {
   var grades = [];
   var grade;
   for (var repo in section.students) {
      grade = section.students[repo].scores[type][assignment];
      if ($.type(grade) != "null") grades.push(grade);
   };

   return grades;
};

// Returns true on valid stats addition, otherwise false
// params: section - class section object
// assert: section conforms to project standard
// return: true if valid stats were added, otherwise false
function addClassStats(section) {
	section.classStats = {
		averageGrade: classMean(section),
		medianGrade:  classMedian(section),
		gradeRange:   classRange(section)
	};
	
	if (section.classStats.averageGrade == -1
	 || section.classStats.medianGrade  == -1
	 || section.classStats.gradeRange	== -1)
	 	return false;
	// else
	return true;
};

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
};
