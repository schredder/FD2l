/**************************
 * This is my attempt to visualize the "students" object and the objects it
 *    contains based on my best memory of what we talked about on Sunday. Please
 *    feel free to make adjustments or correct mistakes.
 *
 * It's a .js file so your favorite editors will syntax highlight. =)
 *
 * Everything is assumed to work within the constraints set by csv-standards.
 **************************/

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

   classStats = { // Filled by Eric (gradeStats.js)
      averageGrade = typeof number; // percentage
      medianGrade = typeof number; // percentage
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
}
