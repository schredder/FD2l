// Calculates grade mean for a particular assignment
// params: assignment - name of column to calculate from
//          gradeBook - grade book object
// assert: gradeBook conforms to project standard
// return: number - mean grade for a particular column
function gradeMean(assignment, gradeBook) {
   var classSize = 0;
   var sum = 0;

   for (var repo in gradeBook.students) {
      sum += gradeBook.students[repo][assignment][pointsEarned];
      classSize++;
   };

   return sum / classSize;
};

// Calculates grade median for a particular assignment
// params: assignment - name of column to calculate from
//          gradeBook - grade book object
// assert: gradeBook conforms to project standard
// return: number - median grade for a particular column
function gradeMedian(assignment, gradeBook) {
   var grades = [];
   for (var repo in gradeBook.students) {
      grades.push(gradeBook.students[repo][assignment][pointsEarned]);
   };

   return getMedian(grades);
};

// Calculates grade range for a particular assignment
// params: assignment - name of column to calculate from
//          gradeBook - grade book object
// assert: gradeBook conforms to project standard
// return:   number - grade range for a particular column
function gradeRange(assignment, gradeBook) {
   var grades = [];

   for (var repo in gradeBook.students) {
      grades.push(gradeBook.students[repo][assignment][pointsEarned]); 
   };

   return getRange(grades);
};

// Calculates grade median for the whole class
// params: gradeBook - grade book object
// assert: gradeBook conforms to project standard
// return:   number - median grade for a particular column
function classMedian(gradeBook) {
   var grades = [];

   for (var repo in gradeBook.students) { 
      grades.push(gradeBook.students[repo][total][pointsEarned]);
   };

   return getMedian(grades);
};

// Calculates grade range for the whole class
// params: gradeBook - grade book object
// assert: gradeBook conforms to project standard
// return:   number - median grade for a particular column
function classRange(gradeBook) {
   for (var repo in gradeBook.students) {
      grades.push(gradeBook.students[repo][total][pointsEarned]);
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
