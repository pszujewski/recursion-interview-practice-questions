/*
  You should work through the functions one by one, making comments and 
  identifying the Big O complexity of each part of the algorithm.
*/

// Even or odd
// Constant Time O(1)
// Because the size of the input takes the same amount of time regardless of the 
// size of the input. 
// function isEven(value) {
//   if (value % 2 == 0) {
//     return true;
//   }
//   else {
//     return false;
//   }
// }


//Are you here?
// Polynomial Time O(n^k)
// Because of the nested loops, and when we doubled the input size, we nearly quadrupled the run-time
// function areYouHere(arr1, arr2) {
//   let ticks = 0;
//   let result = false;
//   for (let i=0; i<arr1.length; i++) {
//     ticks++;
//     const el1 = arr1[i];
//     for (let j=0; j<arr2.length; j++) {
//       ticks++;
//       const el2 = arr2[j];
//       if (el1 === el2) {
//         ticks++;
//         result = true;
//         return {
//           ticks: ticks,
//           result: result
//         };
//       }
//     }
//   }
//   return {
//     ticks: ticks,
//     result: result
//   };
// }

// function getRunTimeOperations(fn, input1, input2) {
//   const {ticks, result} = fn(input1, input2);
//   console.log(
//     `With input1 of size ${input1.length}, With input2 of size ${input2.length}, ${fn.name} ` +
//     `clocked ${ticks} ticks to generate result of ${result}.`);
// }

// getRunTimeOperations(areYouHere, [60, 43, 10, 72, 43, 42, 67, 84, 23, 1, 2, 2], 
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 9]);
 

// Doubler
// Linear run-time O(n)
// The run-time is directly proportional to the size n of the input
// Time can fluctuate greatly if the input becomes very large. 
// function doubleArrayValues(array) {
//   let ticks = 0
//   for (let i=0; i<array.length; i++) {
//       ticks++;
//       array[i] *= 2;
//   }
//   return {result: array, ticks};
// }

// function getRunTimeOperations(fn, input) {
//   const {ticks, result} = fn(input);
//   console.log(
//     `With input of size ${input.length}, ${fn.name} ` +
//     `clocked ${ticks} ticks to generate result of ${result}.`);
// }

// getRunTimeOperations(doubleArrayValues, [4, 6, 7, 1, 2, 3, 9]);


// Naive Search
// Linear run-time O(n)
// Because it seems that, taking into acct the two inputs together, the result
// is directly proportional to those inputs. 
// function naiveSearch(array, item) {
//   let ticks = 0;
//   for (let i=0; i<array.length; i++) {
//     ticks++;
//     if (array[i] === item) {
//       ticks++;
//       return {
//         result: i,
//         ticks
//       };
//     }
//   }
// }

// function getRunTimeOperations(fn, input, item) {
//   const {ticks, result} = fn(input, item);
//   console.log(
//     `With input of size ${input.length}, ${fn.name} ` +
//     `clocked ${ticks} ticks to generate result of ${result}.`);
// }

// getRunTimeOperations(naiveSearch, [4, 6, 7, 1, 2, 3, 9, 2, 1, 7, 9, 0, 7, 8, 5, 8], 7);

//[6, 4, 3, 7, 8, 9, 10, 2]

//Creating pairs
// Polynomial Time O(n^k)
// Because of the nested loops, and when we doubled the input size, we nearly quadrupled the run-time
// function createPairs(arr) {
//   let ticks = 0;
//   for (let i = 0; i < arr.length; i++) {
//     ticks++;
//     for(let j = i+1; j < arr.length; j++) {
//       ticks++;
//       console.log(arr[i] + ", " +  arr[j] );
//     }
//   }
//   return {
//     result: arr.length, 
//     ticks
//   };
// }

// function getRunTimeOperations(fn, input) {
//   const {ticks, result} = fn(input);
//   console.log(
//     `With input of size ${input.length}, ${fn.name} ` +
//     `clocked ${ticks} ticks to generate result of ${result}.`);
// }

// getRunTimeOperations(createPairs, [4, 6, 7, 9]);

// Computing Fibonaccis
// Linear run-time O(n)
// Because the result is directly proportional to the input. 
// function generateFib(num) {
//   let result = [];
//   let ticks = 0;
//   for (let i = 1; i <= num; i++) {

//     ticks++;
//     // we're adding the first item
//     // to the result list, append the
//     // number 0 to results
//     if (i === 1) {
//       result.push(0);
//     }
//     // ...and if it's the second item
//     // append 1
//     else if (i == 2) {
//       result.push(1);
//     }

//     // otherwise, sum the two previous result items, and append that value to results.
//     else {
//       result.push(result[i - 2] + result[i - 3]);
//     }
//   }
//   // once the for loop finishes
//   // we return `result`.
//   return {result, ticks};
// }

// function getRunTimeOperations(fn, input) {
//   const {ticks, result} = fn(input);
//   console.log(
//     `With input of size ${input}, ${fn.name} ` +
//     `clocked ${ticks} ticks to generate result of ${result.length}.`);
// }

// getRunTimeOperations(generateFib, 100);

// Efficient Search 
// Logarithmic time complexity (O(log n)
// This is because it cuts the problem size in half with each iteration
// run time increases slowly, see below
// With an array of length 4 -> There are 6 ticks
// With an array of length 23 -> There are 10 ticks. 
// function efficientSearch(array, item) {
//   let ticks = 0;

//   let minIndex = 0;
//   let maxIndex = array.length - 1;
//   let currentIndex;
//   let currentElement;

//   while (minIndex <= maxIndex) {
//       ticks++;
//       currentIndex = Math.floor((minIndex + maxIndex) / 2);
//       currentElement = array[currentIndex];

//       if (currentElement < item) {
//           ticks++;
//           minIndex = currentIndex + 1;
//       }
//       else if (currentElement > item) {
//           ticks++;
//           maxIndex = currentIndex - 1;
//       }
//       else {
//         ticks++;
//         return {
//           results: currentIndex,
//           ticks
//         };
//       }
//   }
//   return {
//     results: -1,
//     ticks
//   };
// }

// function getRunTimeOperations(fn, input) {
//   const { array, item } = input;
//   const { results, ticks } = fn(array, item);
//   console.log(`Input size: ${array.length}, Function name: ${fn.name}`+
//   ` Ticks: ${ticks}, Results: ${results}`);
// }

// getRunTimeOperations(efficientSearch, { 
//   array: [4, 6, 7, 1, 2, 3, 4, 5, 6, 7, 4, 7, 2, 1, 5, 3, 2, 1, 2, 1, 2, 1, 9], 
//   item: 9 
// });


// Random Element
// Constant Time O(1)
// Because the size of the input does not change the funciton's run-time 
// function findRandomElement(arr) {
//     return arr[Math.floor(Math.random() * arr.length)];
// }

// console.log(findRandomElement([1, 2, 3, 6, 3, 5, 9, 10, 11, 34]));

// Is It Prime?
// Linear run-time O(n)
// The run-time is directly proportional to the size n of the input
// Time can fluctuate greatly if the input becomes very large. 
// function isPrime(n) {
//   // if n is less than 2 or a decimal, it's not prime
//   let ticks = 0;
//   if (n < 2 || n % 1 != 0) {
//       return false;
//   }
//   // otherwise, check if `n` is divisible by any integer
//   // between 2 and n.
//   for (let i = 2; i < n; ++i) {
//       ticks++;
//       if (n % i == 0) {
//         return { result: false, ticks };
//       }
//   }
//   return  { result: true, ticks };
// }

// function getRunTimeOperations(fn, input) {
//   const {result, ticks} = fn(input);
//   console.log(`Input size: ${input}, Function name: ${fn.name}`+
//   ` Ticks: ${ticks}, Results: ${result}`);
// }

// getRunTimeOperations(isPrime, 101);

/*

*/

// ============================= EXERCISE 2: AFTERNOON ================================

// EXAMPLE EXERCISE: 
/*
Exercise 1 --> Counting Sheep Big O: 
O(n) linear complexity 
As the input size grows, so does the runtime. 
If the sheepcount is 1, You will run the recursive function 1 time, if the sheepcount is 100, call the 
recursive function 100 times. If the input is n, you call the recursive funciton n times.
*/

//For each one these exercises identify the Big O. Once you have done so, put a counter
//variable and now check to see how the counter related to understanding the Big O for 
//each of these algorithms.

/*=================================================================================
/*
This program is from the slide. Your task is to step through the code thoughly with
the input provided. You should be able to describe what is happening in each step. 
Identify the Big O of this algorithm and be able to explain your answer. 
Finally use a counter to show how your the counter can be helpful in understanding the
run time of this algorithm.
*/

// Binary Representation
// Linear Time - O(n)
// This 
// function binaryRepresentation(n)
// {
//   let rem = n % 2
//   let ticks = 0
//   console.log('remainder -> ' + rem)
//   if(n === 1){
//     return {
//       result: '1',
//       ticks
//     }
//   }  
//   if(rem === 0){
//     ticks++
//     return {
//       result: binaryRepresentation(n/2) + '0',
//       ticks
//     }
//   }
//   if(rem === 1){
//     ticks++
//     return {
//       result: binaryRepresentation((n-1)/2) + '1',
//       ticks
//     }
//   }  
// }

// function getRuntimeOperations(fn, input){
//   const{result, ticks} = fn(input)
//   console.log(`result: ${result} + ticks: ${ticks}`)
// }

// getRuntimeOperations(binaryRepresentation, 3)


/*=================================================================================
Exercise 1 - Counting Sheep
Write a recursive program that counts how many sheep jumps over the fence. 
Your program should take a number as an input. That number should be the number 
of sheep you have. The program should diplay the number along with the msg "Another 
sheep jumps over the fence" until no more sheep left.
*/

/*
 * @function countSheep
 * @desc     Recursive program that counts how many sheep jumps over the fence. 
 * @param    {number} num - the number sheep 
 * @returns  
 * @display  displays how many sheep jumped over the fence
 */

// Count Sheep
// Linear Time O(n)
// As the input size grows so does the runtime of the function
// if sheepCount = 100, it will run 100 times

// function countSheep(num){
//     //stopping condition of base case
//     if(num === 0){
//         console.log(`All sheep jumped over the fence`);
//     } 
//     //this is the recursive case
//     //this will be executed until it reaches base case
//     else{
//         console.log(`${num}: Another sheep jumps over the fence`);
//         countSheep(num-1);
//     }
// }
// countSheep(10);

/*=================================================================================
Exercise 2 - Array double
Write a program that takes an array as input which contains an unknown set of numbers, 
and output an array which doubles the values of each item in that array. 
Test your solution by trying a handful of different arrays.
*/

/**
* Recursive program that doubles the values of each item in an array
* @param    an array
* @returns  an array with each elements doubled
*/

// Double All
// Linear Time O(n)
// Function is called for every single item in the array
// With larger input the runtime will increase proportionately

// function double_all(arr) {
//   if (!arr.length) {
//     return [];
//   }
//   return [arr[0] * 2, ...double_all(arr.slice(1))];
// }
// var arr = [10,5,3,4];
// console.log(double_all(arr));

/*=================================================================================
Exercise 3 - Reverse String
Write a program that reverses a string. Take a string as input, reverse the string, and return the new string.
*/

// Reverse String
// Linear Time O(n)
// The function's time complexity is wholly dependent on the length of the string
// The larger the input the longer the algorithm will take to finish

// let ticks = 0

// function reverse(str) {
//   ticks++
//   if (str.length < 2) {
//     console.log(ticks)
//     return str;
//   }
//   console.log(ticks)
//   return reverse(str.slice(1)) + str[0];
// }
// console.log(reverse("tauhida"));

/*=================================================================================
Exercise 4 - Triangular Number
Calculates the nth triangular number.
A triangular number counts the objects that can form an equilateral triangle. 
The nth triangular number is the number of dots composing a triangle with n dots on a side, 
and is equal to the sum of the n natural numbers from 1 to n. 
This is the Triangular Number Sequence: 1, 3, 6, 10, 15, 21, 28, 36, 45
                          *
            *           *    *
*     |   *   *  |   *    *    *  |
 1st     2nd             3rd             nth?  
*/
//Should always return n*(n+1)/2

// Triangle
// Linear Time O(n)
// The function's time complexity is wholly dependent on the length of the string
// The larger the input the longer the algorithm will take to finish

// let ticks = 0

// function triangle(n) {
//   ticks++
//   if (n < 2){ 
//     console.log(ticks)
//     return n;
//   }
//   return n + triangle(n - 1);
// }
// triangle(10)

/*=================================================================================
Exercise 5 - String Splitter
Split a string based upon a separator (similar to String.prototype.split).
*/

// Split
// Linear Time O(n)
// The function's time complexity is wholly dependent on the length of the string
// The larger the input the longer the algorithm will take to finish

// let ticks = 0

// function split(str, sep) {
//   ticks++
//   var idx = str.indexOf(sep);
//   if (idx == -1) {
//     console.log(ticks)
//     return [str];
//   }  
//   return [str.slice(0, idx)].concat(split(str.slice(idx + sep.length), sep))
// }
// console.log(split('peter/1/12/2017', '/'));

/*=================================================================================
Exercise 6 - Binary Representation
Write a recursive function that prints out the binary representation of a given number. 
For example the program should take 3 as an input and print 11 as output, or 25 as an input 
and print 11001 as an output. Note that the binary representation of 0 should be 0. 
*/

/**
* Recursive program that prints the binary representation of a number
* @param   number 
* @returns  binary representation of that number
*/

// convertToBinary
// Logarithmic Time O(log(n)
// As we increase size of input runtime increases but at a slow rate
// Each recursion it divides the problem in half

// let ticks = 0

// function convertToBinary(num){
//   ticks++
//   if(num>0){
//     // console.log(ticks)
//     let binary = Math.floor(num%2);
//     return (convertToBinary(Math.floor(num/2))+ binary);
//   }else{
//     console.log(ticks)
//     return '';
//   }
// }
// console.log(convertToBinary(223));

/*=================================================================================
Exercise 7 - Anagrams
An anagram is any word or phrase that exactly reproduces the letters in another order. 
Write a program that creates an anagram (listing all the rearrangements of a word) of a given word. 
For example, if the user types east, the program should list all 24 permutations, including eats, etas, teas, 
and non-words like tsae.
Hint: For your algorithm, you might want to think about a prefix and use that to create the new words. 
For example, given east, use e as a prefix and you would place e in front of all six permutations of ast 
— ast, ats, sat, sta, tas, and tsa. This will give you the words east, eats, esat, esta, etas, and etsa. 
Continue this way until you find all the anagrams for east. There should be 24 of them.
*/

// printAnagram
// Polynomial Time O(n^k) -> 
// O(n!) -> 
// This function is polynomial because it contains nested loops
// These nested loops mean that the runtime is squared
// the key is that there is a recursion call inside of the for loop -> 'nested loops'

// let ticks = 0;

// function printAnagram(word){
//   console.log(`The word for which we will find an anagram is ${word}`);
//   anagrams(' ', word);
// }

// function anagrams(prefix, str){
//   ticks++;
//   if(str.length <= 1){
//     console.log(`The anagram is ${prefix}${str}`);
// 		console.log(ticks);
//   } else {
//       for(let i=0; i<str.length; i++){
//         ticks++
//         let currentLetter = str.substring(i, i+1);
//         let previousLetters = str.substring(0,i);
//         let afterLetters = str.substring(i+1);
//         anagrams(prefix+currentLetter, previousLetters+afterLetters);
//       }
//   }

// }
// printAnagram("yesmanr");

// /*
// Exercise 8 - Animal Hierarchy
// */

// Animal Hierarchy
// Polynomial Time O(n^k)
// This function is polynomial because it contains nested loops


// let ticks = 0

// const AnimalHierarchy = [
//   {id: 'Animals','Parent': null},
//   {id: 'Mammals','Parent': 'Animals'},
//   {id: 'Dogs','Parent':'Mammals' },
//   {id: 'Cats','Parent':'Mammals' },
//   {id: 'Golden Retriever','Parent': 'Dogs'},
//   {id: 'Husky','Parent':'Dogs' },
//   {id: 'Bengal','Parent':'Cats' }
// ]

// // ==============================
// function traverse(AnimalHierarchy, parent) {
//   ticks++
//   let node = {};
//   AnimalHierarchy
//     .filter(item => item.Parent === parent)
//     .forEach(item => {
//       ticks++
//       node[item.id] = traverse(AnimalHierarchy, item.id)
//     });
//   console.log(ticks)
//   return node;  
// }
// console.log(traverse(AnimalHierarchy, null));


/*=================================================================================
Exercise 9 - Factorial
Write a recursive program that finds the factorial of a given number. 
The factorial of a number can be found by multiplying that number by each number 
between itself and one. The factorial of 5 is equal to 5 * 4 * 3 * 2 * 1 = 120
*/

// Factorial
// Linear Time O(n)
// The function's time complexity is wholly dependent on the size of the number
// The larger the input the longer the algorithm will take to finish

// function factorial(n) {  
//   // Base Case - when n is equal to 0, we stop the recursion
//   if (n === 0) {
//     return 1;
//   }
//   // Recursive Case
//   // It will run for all other conditions except when n is equal to 0
//   return n * factorial(n - 1);
// }

// console.log(factorial(5)); //120

/*=================================================================================
Exercise 10 - Fibonacci
Write a recursive program that prints the fibonacci sequence of a given number. 
The fibonnaci sequence a series of numbers in which each number is the sum of the two preceding numbers. 
For example the 7th fibonacci number in a fibonaci sequence is  13. The sequence looks as follows: 1 1 2 3 5 8 13.
*/

// Fibonacci
// Linear Time O(n)
// The function's time complexity is wholly dependent on the size of the number
// The larger the input the longer the algorithm will take to finish

let ticks = 0;

function fibonacci(n) {

  ticks++;
  // Base case
  if (n <= 0) {
    return 0;
  }
  // Base case
  if (n <= 2) {
    return 1;
  }	
  // Recursive case
  return fibonacci(n - 1) + fibonacci(n - 2);	
}
console.log(fibonacci(7));
console.log(ticks);



/*=================================================================================
Exercise 11 - Organization Chart
Write a recursive program that prints the following organization chart. Your output should show the output to be 
as shown below with proper indentation to show the hierarchy.
*/

// Organization Chart
// Polynomial Time O(n^2)
// This function is polynomial because it contains nested loops
// These nested loops mean that the runtime is squared
// the key is that there is a recursion call inside of the for loop -> 'nested loops'

// var organization = {
// 	"Zuckerberg": {		
// 		"Schroepfer": {
// 			"Bosworth": {
// 				"Steve":{},
// 				"Kyle":{},
// 				"Andra":{}
// 			},
// 			"Zhao": {
// 				"Richie":{},
// 				"Sofia":{},
// 				"Jen":{}
// 			},
// 			"Badros": {
// 				"John":{},
// 				"Mike":{},
// 				"Pat":{}
// 			},
// 			"Parikh": {
// 				"Zach":{},
// 				"Ryan":{},
// 				"Tes":{}
// 			}
// 		},
// 		"Schrage": {
// 			"VanDyck": {
// 				"Sabrina":{},
// 				"Michelle":{},
// 				"Josh":{}
// 			},
// 			"Swain": {
// 				"Blanch":{},
// 				"Tom":{},
// 				"Joe":{}
// 			},
// 			"Frankovsky": {
// 				"Jasee":{},
// 				"Brian":{},
// 				"Margaret":{}
// 			}
// 		},
// 		"Sandberg": {
// 			"Goler": {
// 				"Eddie":{},
// 				"Julie":{},
// 				"Annie":{}
// 			},
// 			"Hernandez": {
// 				"Rowi":{},
// 				"Inga":{},
// 				"Morgan":{}
// 			},
// 			"Moissinac": {
// 				"Amy":{},
// 				"Chuck":{},
// 				"Vinni":{}
// 			},
// 			"Kelley": {
// 				"Eric":{},
// 				"Ana":{},
// 				"Wes":{}
// 			}
// }}};
// function traverseB(node, indent=0) {
// 	for (var key in node) {
// 		console.log(" ".repeat(indent), key);
// 		traverseB(node[key], indent + 4);
// 	}
// }

// traverseB(organization)