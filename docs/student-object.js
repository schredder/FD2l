/**************************
 * This is an attempt to visualize the "students" object and the objects it
 *    contains based on what we talked about on Sunday. Please feel free to
 *    make adjustments or correct mistakes.
 *
 * Everything is assumed to work within the constraints set by csv-standards.
 **************************/


Section: { // filled in by getRequest
   students: { // object container of students indexed by repo id see below for student definition
      //TODO Discuss Gradebook-like object per erics suggestion

      student: {
         letterGrade:"A", // typeof char (string w/ length 1)
         note:"lovely test", // typeof string
         totalGrade:"90.5", // typeof number (%)
         section:"cs1", // typeof string
         repo:"2k4", // typeof string
         scores: {
            // quiz: typeof object: { [name: typeof number]* }
            quiz: { q1:"9",q2:"6",q3:"5",q4:"",q5:"7" },
            // midterm: typeof object: { [name: typeof number]* }
            midterm: { m1:"7",m2:"8",m3:"6",m4:"5" },
            // I believe "final" is a reserved JS word, so this one gets to be verbose:
            // finalExam: typeof object: { [name: typeof number] }
            finalExam: { finalExam:"32" }, 
            // hw: typeof object: { [name: typeof number]* }
            hw: { hw1:"7",hw2:"6",hw3:"8",hw4:"9",hw5:"5",hw6:"7",hw7:"7" }
         }
      };
   };

   classStats: { // Filled by Eric (gradeStats.js)
      averageGrade = typeof number; // percentage
       medianGrade = typeof number; // percentage
        gradeRange = typeof number; // percentage
   };

   assignmentInfo: { // Contains prorates and any other assignment specific data.
      quizzes: {
         q1: { weight: 00, max: 00, prorate: ??? }
      }

      midterms: {
         m1: { weight: 00, max: 00, prorate: ??? }
      }

      homework: {
         hw1: { weight: 00, max: 00, prorate: ??? }
      }

      finalExam: {
         finalExam: { weight: 00, max: 00, prorate: ??? }
      }
   };

/* Items below are under discussion and not currently used...
 
   gradeBook = {
      categories = { // Filled by Josh (jRequest.js)
         catName = { // hw, project, quiz, exam, total...
            itemName = { // hw#, project#, quiz#, exam#, total...
               weight = typeof number; // percentage?
               pointsPossible = typeof number;
               classAverage = typeof number; // Calculated by gradeStats.js
               classMedian = typeof number; // Calculated by gradeStats.js
               date = typeof Date; // assigned/due?
               // Maybe letter grade (cutoff), etc, can be calculated on the fly.
            }
         }
      }
   }

   students = {
      repo = { // Repeat for each enrolled student. Filled by Josh (jRequest.js)
         catName = { // Repeat for each category in students.categories.
            itemName = { // Repeat for each itemName in students.categories.catName.
               section = typeof string; // letter/number?
               pointsEarned = typeof number;
               feedback = typeof string;
               // Maybe letter grade (cutoff), etc, can be calculated on the fly.
            }
         }
      }
   }
*/

}
