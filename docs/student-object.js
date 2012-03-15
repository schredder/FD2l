/**************************
 * This is my attempt to visualize the "students" object and the objects it
 *    contains based on my best memory of what we talked about on Sunday. Please
 *    feel free to make adjustments or correct mistakes.
 *
 * It's a .js file so your favorite editors will syntax highlight. =)
 *
 * Everything is assumed to work within the constraints set by csv-standards.
 **************************/
Section{ //jilled in by getRequest
        students{//...}//object container of students indexed by repo id see below for student deffinition
        //TODO Add prorates somewhere
        //TODO Add Gradebook -like object per erics suggestino
        }
student  = {
                letterGrade:"A",
                note:"lovely test",
                totalGrade:"90.5",
                section:"cs1",
                repo:"2k4",
                scores:{
                    quiz:{q1:"9",q2:"6",q3:"5",q4:"",q5:"7"},
                    midterm:{m1:"7",m2:"8",m3:"6",m4:"5"},
                    final:{final:"32"},
                    hw:{hw1:"7",hw2:"6",hw3:"8",hw4:"9",hw5:"5",hw6:"7",hw7:"7"}
                    }
           };

/*gradeBook = {
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
*/
   classStats = { // Filled by Eric (gradeStats.js)
      averageGrade = typeof number; // percentage
      medianGrade = typeof number; // percentage
   }
  /* 
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
   }*/
}
