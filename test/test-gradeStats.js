/* These tests will later be expanded to include actual test data once 
 * we know what kind of data we're dealing with.
 */

module("Grade Statistics Generation");

function generateDummySection() {
   // Building a dummy student array for testing
   var section = {
      students: {
         "a": { 
            scores: {
               "hw": { },
               "midterm": { }
            }
         },
         "b": { 
            scores: {
               "hw": { },
               "midterm": { }
            }
         },
         "c": { 
            scores: {
               "hw": { },
               "midterm": { }
            }
         },
         "d": { 
            scores: {
               "hw": { },
               "midterm": { }
            }
         },
         "e": { 
            scores: {
               "hw": { },
               "midterm": { }
            }
         }
      },

      assignmentInfo: {
         "hw": { },
         "midterm": { }
      }
   };
   var hws = ["hw1", "hw2"];
   var midterms = ["m1", "m2"];
   var baseGrade = 15;

   for (var hw in hws) section.assignmentInfo["hw"][hws[hw]] = { };
   for (var mt in midterms) section.assignmentInfo["midterm"][midterms[mt]] = { };

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
      var hws = section.assignmentInfo["hw"].keys;
      var midterms = section.assignmentInfo["midterm"].keys;
      
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
      var hws = section.assignmentInfo["hw"].keys;
      var midterms = section.assignmentInfo["midterm"].keys;
      
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
      var hws = section.assignmentInfo["hw"].keys;
      var midterms = section.assignmentInfo["midterm"].keys;

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
   }
);

/* Testing object pipeline, adding statistics data to students object */

module("Grade Statistics Population");

test("Test adding class-wide statistics",
   function() {
      var section = generateDummySection();
      addClassStats(section);

      deepEqual( section.classStats.averageGrade, 75, 
                 "Testing average grade is calculated and in the right place." );
      deepEqual( section.classStats.medianGrade, 70, 
                 "Testing median grade is calculated and in the right place." );
      deepEqual( section.classStats.gradeRange, 75, 
                 "Testing grade range is calculated and in the right place." );
   }
);

test("Test adding per-student statistics",
   function() {
      var section = generateDummySection();
      for (var student in section.students)
         addTotalAndLetterGrades(student, students);

      deepEqual( section.students[repo].totalGrade, 90.5,
                 "Testing percentage grade is calculated and put in the right place." );
      deepEqual( section.students[repo].letterGrade, "A",
                 "Testing letter grade is calculated and put in the right place." );

   }
);
