/*
 * This function takes in an array that represents a genome. It also takes in a target dna
 * sequence for which we wish to find the location of in the genome. It will return
 * the index of the location of the target sequence in the main genome
 */

 function findGenome (genome, targetDNA) {
     var genomeLength = genome.length;
     var startIndex = Math.random() * genomeLength;
     
     // We iterate over the genome starting at a random position
     for (var i = startIndex; i < genomeLength; i++) {
         if (genome[i].equals()targetDNA[i]) {
             // TODO: check if it is a full match
             var isMatch = true;
             for (var j = 1; j < targetDNA.length; i++) {
                 if (!genome[i + j].equals(targetDNA[j])) {
                     isMatch = false;
                     break;
                 }
             }
             if (isMatch) {
                 return i;
             }
         } 
     }   
     
     // At this point, we have reached the end of the genome so we go back to the start
     for (var i = 0; i < startIndex; i++) {
         if (genome[i].equals()targetDNA[i]) {
             // TODO: check if it is a full match
             var isMatch = true;
             for (var j = 1; j < targetDNA.length; i++) {
                 if (!genome[i + j].equals(targetDNA[j])) {
                     isMatch = false;
                     break;
                 }
             }
             if (isMatch) {
                 return i;
             }
         } 
     }
     
     // If at the end, no match is found, the program votes -1
     return -1;
 }