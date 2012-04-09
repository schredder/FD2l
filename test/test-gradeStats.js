/* These tests will later be expanded to include actual test data once 
 * we know what kind of data we're dealing with.
 */

module("Grade Statistics Generation");

function generateDummySection() {
   // Building a dummy student array for testing
   var section = {
      students: {
         "a": { },
         "b": { },
         "c": { },
         "d": { },
         "e": { }
      },

      assignmentInfo: {
         "hw": { },
         "midterm": { }
      }
   };
   var hws = ["hw1", "hw2"];
   var midterms = ["m1", "m2"];
   var baseGrade = 15;

   for (var hw in hws) {
      section.assignmentInfo["hw"][hws[hw]] = { };
      section.assignmentInfo["hw"][hws[hw]].weight = .2;
      section.assignmentInfo["hw"][hws[hw]].min = 0;
      section.assignmentInfo["hw"][hws[hw]].max = 25;
   };

   for (var mt in midterms) {
   	section.assignmentInfo["midterm"][midterms[mt]] = { };
      section.assignmentInfo["midterm"][midterms[mt]].weight = .3;
      section.assignmentInfo["midterm"][midterms[mt]].min = 0;
      section.assignmentInfo["midterm"][midterms[mt]].max = 30;
   };

   for (var stu in section.students) {
      section.students[stu] = {
         scores: { }
      };
   
      section.students[stu].scores["hw"] = { };
      for (var j = 0; j < hws.length; j++) {
         section.students[stu].scores["hw"][hws[j]] = baseGrade+j;
      }
   
      baseGrade++;

      section.students[stu].scores["midterm"] = { };
      for (var j = 0; j < midterms.length; j++) {
         section.students[stu].scores["midterm"][midterms[j]] = baseGrade+j;
      }

      baseGrade++;
   }
   /*
   What this looks like:
      a	b	c	d	e	AVG	M	R
  hw1 15	17	19	21	23	19		19	4
  hw2 16	18	20	22	24	20		20	4
   m1 16	18	20	22	24	20		20	4
   m2 17	19	21	23	25	21		21	4
   */ 

   return section;
}

test("Test \"primitive\" median function calculations", 
   function() {
      // primitive
      equal( getMedian([0,1,2,3,4,5,15]), 3, "Testing getMedian() with odd num of elements." );
      equal( getMedian([0,1,2,3,4,15]), 2.5, "Testing getMedian() with even num of elements." );
      equal( getMedian([0,1,2,3,4,15]), 2.5, "Testing getMedian() with even num of elements." );
      equal( getMedian([0,1,2,3,4,"kitty",15]), -1, "getMedian() returns -1 with a string." );
      equal( getMedian([0,1,2,"",4,15]), -1, "getMedian() returns -1 with a string." );
      equal( getMedian([0,1,2,3,true,15]), -1, "getMedian() returns -1 with a bool." );
   }
);

test("Test \"primitive\" range function calculations", 
   function() {
      equal( getRange([0,1,2,3,4,5,15]), 15, "Testing getRange()." );
      equal( getRange([0,1,2,3,"4",5,15]), -1, "getRange() returns -1 with a string." );
      equal( getRange([0,1,2,3,true,5,15]), -1, "getRange() returns -1 with a bool." );
   }
);

test("Test assignment mean calculations", 
   function() {
      var section = generateDummySection();
      var hws = $.map(section.assignmentInfo["hw"], 
      					 function(value, key) { return key; });
      var midterms = $.map(section.assignmentInfo["midterm"], 
      					 function(value, key) { return key; });
      
      // tested assignment names:
      var assignments = { "hw1": 19, "hw2": 20, "m1": 20, "m2": 21 };
      var col;

      for (assignment in hws) {
         col = hws[assignment];
         equal( gradeMean(col, "hw", section), assignments[hws[assignment]], 
                    "Calculating \"" + col + "\" grade average." );
      }

      for (assignment in midterms) {
         col = midterms[assignment];
         equal( gradeMean(col, "midterm", section), assignments[midterms[assignment]], 
                    "Calculating \"" + col + "\" grade average." );
      }
      
      equal( gradeMean("dne", "hw", section), -1, "Testing non-existant assignment.");
   }
);

test("Test assignment median calculations", 
   function() {
      var section = generateDummySection();
      var hws = $.map(section.assignmentInfo["hw"], 
      					 function(value, key) { return key; });
      var midterms = $.map(section.assignmentInfo["midterm"], 
      					 function(value, key) { return key; });
      
      // tested assignment names:
      var assignments = { "hw1": 19, "hw2": 20, "m1": 20, "m2": 21 };
      var col;

      for (assignment in hws) {
         col = hws[assignment];
         equal( gradeMedian(col, "hw", section), assignments[hws[assignment]], 
                    "Calculating \"" + col + "\" grade median." );
      }

      for (assignment in midterms) {
         col = midterms[assignment];
         equal( gradeMedian(col, "midterm", section), assignments[midterms[assignment]], 
                    "Calculating \"" + col + "\" grade median." );
      }
      
      equal( gradeMedian("dne", "hw", section), -1, "Testing non-existant assignment.");
   }
);

test("Test assignment range calculations", 
   function() {
      var section = generateDummySection();
      var hws = $.map(section.assignmentInfo["hw"], 
      					 function(value, key) { return key; });
      var midterms = $.map(section.assignmentInfo["midterm"], 
      					 function(value, key) { return key; });

      // tested assignment names:
      var assignments = { "hw1": 8, "hw2": 8, "m1": 8, "m2": 8 };
      var col;

      for (assignment in hws) {
         col = hws[assignment];
         equal( gradeRange(col, "hw", section), assignments[hws[assignment]], 
                    "Calculating \"" + col + "\" grade range." );
      }

      for (assignment in midterms) {
         col = midterms[assignment];
         equal( gradeRange(col, "midterm", section), assignments[midterms[assignment]], 
                    "Calculating \"" + col + "\" grade range." );
      }
      
      equal( gradeRange("dne", "hw", section), -1, "Testing non-existant assignment.");
   }
);

test("Test class-wide mean calculations", 
   function() {
      var section = {
         students: {
            "a": { totalGrade: 75 },
            "b": { totalGrade: 75 },
            "c": { totalGrade: 75 },
            "d": { totalGrade: 75 },
            "e": { totalGrade: 75 }
         }
      }

      equal( classMean(section), 75, "Calculating class-wide grade mean." );

      section.students["f"] = { totalGrade: -1 };
      equal( classMean(section), -1, "Testing invalid grade: negative number." );

      section.students["f"] = { totalGrade: "wut" };
      equal( classMean(section), -1, "Testing invalid grade: string for grade." );
   }
);

test("Test class-wide median calculations", 
   function() {
      var section = {
         students: {
            "a": { totalGrade: 75 },
            "b": { totalGrade: 75 },
            "c": { totalGrade: 75 },
            "d": { totalGrade: 75 },
            "e": { totalGrade: 75 }
         }
      }

      equal( classMedian(section), 75, "Calculating class-wide grade median." );

      section.students["f"] = { totalGrade: -1 };
      equal( classMedian(section), -1, "Testing invalid grade: negative number." );

      section.students["f"] = { totalGrade: "wut" };
      equal( classMedian(section), -1, "Testing invalid grade: string for grade." );
   }
);

test("Test class-wide range calculations", 
   function() {
      var section = {
         students: {
            "a": { totalGrade: 75 },
            "b": { totalGrade: 75 },
            "c": { totalGrade: 75 },
            "d": { totalGrade: 75 },
            "e": { totalGrade: 75 }
         }
      }

      equal( classRange(section), 0, "Calculating class-wide grade range." );

      section.students["f"] = { totalGrade: -1 };
      equal( classRange(section), -1, "Testing invalid grade: negative number." );

      section.students["f"] = { totalGrade: "wut" };
      equal( classRange(section), -1, "Testing invalid grade: string for grade." );
   }
);

/* Testing object pipeline, adding statistics data to students object */

module("Grade Statistics Population");

test("Test adding class-wide statistics",
   function() {
		var section = {
         students: {
            "a": { totalGrade: 75 },
            "b": { totalGrade: 75 },
            "c": { totalGrade: 75 },
            "d": { totalGrade: 75 },
            "e": { totalGrade: 75 }
         }
      }
      ok(addClassStats(section), "Adding class statistics.");

      equal( section.classStats.averageGrade, 75, 
                 "Testing average grade is calculated and in the right place." );
      equal( section.classStats.medianGrade, 75, 
                 "Testing median grade is calculated and in the right place." );
      equal( section.classStats.gradeRange, 0, 
                 "Testing grade range is calculated and in the right place." );
                 
      section.students["f"] = { totalGrade: -123 };
		ok(!addClassStats(section), "Adding invalid class statistics, expecting false.");

      equal( section.classStats.averageGrade, -1, 
                 "Testing average grade with invalid data. (number < 0)" );
      equal( section.classStats.medianGrade, -1, 
                 "Testing median grade with invalid data. (number < 0)" );
      equal( section.classStats.gradeRange, -1, 
                 "Testing grade range with invalid data. (number < 0)" );

		section.students["f"] = { totalGrade: "cats" };
		ok(!addClassStats(section), "Adding invalid class statistics, expecting false.");

      equal( section.classStats.averageGrade, -1, 
                 "Testing average grade with invalid data. (string)" );
      equal( section.classStats.medianGrade, -1, 
                 "Testing median grade with invalid data. (string)" );
      equal( section.classStats.gradeRange, -1, 
                 "Testing grade range with invalid data. (string)" );
   }
);

test("Test adding per-student statistics",
   function() {
      var section = generateDummySection();
      section.cutoffs = { "A": 90, "B": 80, "C": 70, "D": 60, "F": 0 };

      var expectedTotals = {
         "a": 57.8,
         "b": 65.0,
         "c": 72.2,
         "d": 79.4,
         "e": 86.6
      };

      var expectedLetter = {
         "a": "F",
         "b": "D",
         "c": "C",
         "d": "C",
         "e": "B"
      }

      for (var student in section.students) {
         ok( addTotalAndLetterGrades(student, section), 
         	 "Adding total and letter grade for student \"" + student + "\", expecting true.");

      	equal( section.students[student].totalGrade, expectedTotals[student],
                 "Testing percentage grade for student \"" + student 
                  + "\" is calculated and put in the right place." );
      	equal( section.students[student].letterGrade, expectedLetter[student],
                 "Testing letter grade for student \"" + student 
                  + "\" is calculated and put in the right place." );
      }

      section.students["e"].scores["hw"]["hw2"] = null;
      ok( addTotalAndLetterGrades("e", section), "Adding total and letter grade for student \"e\", expecting true.");
      equal( section.students["e"].totalGrade, 80.88, "Testing percentage grade of exempt/ungraded assignment.");
      equal( section.students["e"].letterGrade, "B", "Testing letter grade of exempt/ungraded assignment.");
   }
);
