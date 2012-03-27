// Calculates grade mean for a particular assignment
// params: assignment - name of column to calculate from
//            section - class section object
// assert: section conforms to project standard
// return: number - mean grade for a particular column
function gradeMean(assignment, type, section) {
   var classSize = 0;
   var sum = 0;

   for (var repo in section.students) {
      sum += section.students[repo].scores[type][assignment][pointsEarned];
      classSize++;
   };

   return sum / classSize;
};

// Calculates grade median for a particular assignment
// params: assignment - name of column to calculate from
//            section - class section object
// assert: section conforms to project standard
// return: number - median grade for a particular column
function gradeMedian(assignment, section) {
   var grades = [];
   for (var repo in section.students) {
      grades.push(section.students[repo].scores[type][assignment][pointsEarned]);
   };

   return getMedian(grades);
};

// Calculates grade range for a particular assignment
// params: assignment - name of column to calculate from
//            section - class section object
// assert: section conforms to project standard
// return:   number - grade range for a particular column
function gradeRange(assignment, section) {
   var grades = [];

   for (var repo in section.students) {
      grades.push(section.students[repo].scores[type][assignment][pointsEarned]);
   };

   return getRange(grades);
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

   return getMedian(grades);
};

// Calculates grade range for the whole class
// params: section - class section object
// assert: section conforms to project standard
// return:   number - median grade for a particular column
function classRange(section) {
   for (var repo in section.students) {
      grades.push(section.students[repo].totalGrade);
   }
   
   return getRange(grades);
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
   var type;
   for (int i = 0; i < numsCopy.length; i++) {
      type = typeof numsCopy[i];
      if (type != "number")
         throw new Error(numsCopy[i] + " is of type " + type + ". Expected a number.");
   }

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
   var type;
   for (int i = 0; i < numsCopy.length; i++) {
      type = typeof numsCopy[i];
      if (type != "number")
         throw new Error(numsCopy[i] + " is of type " + type + ". Expected a number.");
   }

   // Ascending numerical sort:
   numsCopy.sort(function(a,b){ return a-b; });
   var last = numsCopy.length - 1;

   return numsCopy[last] - numsCopy[0];
}
