// Calculates grade mean for a particular assignment
// params: assignment - name of column to calculate from
//            section - class section object
// assert: section conforms to project standard
// return: number - mean grade for a particular column
function gradeMean(assignment, type, section) {
   var classSize = 0;
   var sum = 0;

   // Check if assignment exists
   if (typeof section.assignmentInfo[type][assignment] == "undefined") {
      return -1;
      //throw new Error("Assignment " + assignment + " is undefined.");
   }

   for (var repo in section.students) {
      sum += section.students[repo].scores[type][assignment];
      classSize++;
   };

   return sum / classSize;
};

// Calculates grade median for a particular assignment
// params: assignment - name of column to calculate from
//            section - class section object
// assert: section conforms to project standard
// return: number - median grade for a particular column
function gradeMedian(assignment, type, section) {
   var grades = [];

   // Check if assignment exists
   if (typeof section.assignmentInfo[type][assignment] == "undefined") {
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
// return:   number - grade range for a particular column
function gradeRange(assignment, type, section) {
   var grades = [];

   // Check if assignment exists
   if (typeof section.assignmentInfo[type][assignment] == "undefined") {
      return -1;
      //throw new Error("Assignment " + assignment + " is undefined.");
   }

   for (var repo in section.students) {
      grades.push(section.students[repo].scores[type][assignment]);
   };

   return (containsValidGrades(grades)) ? getRange(grades) : -1;
};

// Calculates grade median for the whole class
// params: section - class section object
// assert: section conforms to project standard
// return:  number - median grade for a particular column
function classMedian(section) {
   var grades = [];

   for (var repo in section.students) { 
      grades.push(section.students[repo].totalGrade);
   };

   // Check for negatives and non-numbers
   if (!containsValidGrades(grades)) return -1;

   return getMedian(grades);
};

// Calculates grade range for the whole class
// params: section - class section object
// assert: section conforms to project standard
// return:   number - median grade for a particular column
function classRange(section) {
   var grades = [];
   for (var repo in section.students) {
      grades.push(section.students[repo].totalGrade);
   }
   
   return (containsValidGrades(grades)) ? getRange(grades) : -1;
};


// Returns the median of an array of numbers
// params: nums - array of numbers
// assert: each element of nums is >= 0
// return: number - median of the given array
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
// return: number - range of the given array
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
   // Check for negatives and non-numbers
   var type;
   for (var i = 0; i < nums.length; i++) {
      type = typeof nums[i];
      if (type != "number")
         return false; 
         //throw new Error(numsCopy[i] + " is of type " + type + ". Expected a number.");
      if (nums[i] < 0)
         return false; 
         //throw new Error("Score is < 0: " + numsCopy[i]);
   }
   // else
   return true;
}
