// Every Recursion must have a base case, or a stopping point

// let categories = [
//   {id: 'animal', parent: null},
//   {id: 'mammel', parent: 'animal'},
//   {id: 'cats', parent: 'mammel'},
//   {id: 'dogs', parent: 'mammel'},
//   {id: 'kitty', parent: 'cats'},
//   {id: 'star', parent: 'cats'},
//   {id: 'Stella', parent: 'dogs'},
//   {id: 'Skipper', parent: 'dogs'}
// ];

// const makeTree = (categories, parent) => {
//   let node = {};
//   categories
//     .filter(c => c.parent === parent)
//     .forEach(c => node[c.id] = makeTree(categories, c.id));
//   return node;
// }

// console.log(
//   JSON.stringify(makeTree(categories, null), null, 2)
// );

// const test = () => {
//   let obj = {};
//   obj['dogs'] = {prop1: 1, prop2: 2};
//   obj['cats'] = {foo: 'foobar', bar: 'barfoo'};
//   return obj;
// }

// console.log(test());

// Collatz Case 
// Write a recursive function collatz(n) that calculates 
// how many steps it takes to get to one if you start from n
// and recurse

// Base case is if n === 1, stop

// const doRecursion = (n) => {

//   let counter = 0;

//   const collatz = n => {
//     if (n === 1) {
//       //console.log(counter);
//       return;
//     }
//     else if (n % 2 === 0) {
//       counter++;
//       collatz(n/2);
//     }
//     else {
//       counter++;
//       collatz(3*n + 1);
//     }
//   }

//   collatz(n);
//   return counter;
// }

// console.log(doRecursion(436));
// console.log(doRecursion(373));
// console.log(doRecursion(153));

// Recursion exercises May 1
// https://gist.github.com/tparveen/edddf988ec68ef6bb74cff9d1284d09d

// Challenge 1: Sheep counter

// function sheepCounter(num) {
//   if (num === 0) {
//     return;
//   }
//   console.log(`Another sheep jumps over the fence. ${num} sheep are left over`);
//   sheepCounter(num-1);
// }

// sheepCounter(42);

// Challenge 2: Array Doubler

// function arrayDoubler(array) {
//   if (array.length === 0) {
//     return array;
//   }
//   return [array[0]*2, ...arrayDoubler(array.slice(1))];
// }

// console.log(arrayDoubler([6, 5, 2]));

// Challenge 3: Reverse a string

// function reverseStr(str) {
//   if (str.length === 0) {
//     return str;
//   }
//   return str[str.length-1]+reverseStr(str.slice(0, str.length-1));
// }

// console.log(reverseStr('chicago'));

// Challenge 4: nth Triangular Number

// function triangularNumber(num) {
//   if (num === 1) {
//     return 1;
//   }
//   return num + triangularNumber(num-1)
// }

// console.log(triangularNumber(7));

// Challenge 5: String Splitter
// input is a string and seperator 
// output should be an array

// function strSplitter(str, seperator) {
//   //  const idx = str.indexOf(seperator);
//   //  return [str.slice(0, idx), str.slice(idx+1)]
//   console.log(str);
//   if (str === '') {
//     return '';
//   }
//   if (str[0] === seperator) {
//     str[0] = ','
//   }
//   return str[0]+strSplitter(str.slice(1), seperator);
// }

// console.log(strSplitter('chicago', 'a'));

// String Splitter
// '1/12/97' => [ '1', '12', '97' ]
// - We feed a string and a separator.

// function strSplitter2(str, separator) {
//   // Base case: When there are no separators left.
//   // - Use indexOf to determine position of separator. Gives us position of first separator.
//   // - Use slice after that index position (offset by sep. length), then check for separators within substring.
//   let splitDex = str.indexOf(separator);
//   if (splitDex === -1) {
//     return [str];
//   }
//   return [str.slice(0, splitDex), ...strSplitter2(str.slice(splitDex+separator.length), separator)];
// }

// console.log(
//   strSplitter2('This is a test string', ' ')
// );

// function doBinary(num) {
//   //Base Case: when the number = 1
//   console.log(num);
//   if (num === 1) {
//     return [num];
//   }
//   return [num % 2, ...doBinary(Math.floor(num/2))].reverse().join('');
// }

// console.log(doBinary(156));

function printAnagram(word) {
  console.log(`The word for which we will find an anagram is ${word}`);
  anagrams(' ', word);
}

function anagrams(prefix, str) {
  console.log('The prefix ==========>');
  console.log(prefix);
  console.log('The str ==========>');
  console.log(str);
  if(str.length <= 1){
      console.log(`The anagram is ${prefix}${str}`);
  } else {
      for(let i=0; i<str.length; i++){
          let currentLetter = str.substring(i, i+1);
          let previousLetters = str.substring(0,i);
          let afterLetters = str.substring(i+1);
          anagrams(prefix+currentLetter, previousLetters+afterLetters);
      }
  }
}
printAnagram("east");

// function factorial(num) {
//   if (num === 1) {
//     return num;
//   }
//   return num * factorial(num - 1);
// }

// console.log(factorial(15));

// function fibonacci(num, sequence=[0, 1]) {
//   // prints the fibonnaci sequence numbers up to num
//   //
//   if (num === sequence.length) {
//     return sequence;
//   } 

//   let lastItem = sequence[sequence.length-1];
//   let secondToLast = sequence[sequence.length-2];

//   sequence.push(secondToLast + lastItem);

//   return fibonacci(num, sequence);
// }

// console.log(fibonacci(8));

// Challenge: Organizational Chart

const people = [
  {name: 'Zuckerberg', boss: null},
  {name: 'Schroepfer', boss: 'Zuckerberg'},
  {name: 'Schrage', boss: 'Zuckerberg'},
  {name: 'Sandberg', boss: 'Zuckerberg'},
  {name: 'Bosworth', boss: 'Schroepfer'},
  {name: 'Zhao', boss: 'Schroepfer'},
  {name: 'VanDyck', boss: 'Schrage'},
  {name: 'Swain', boss: 'Schrage'},
  {name: 'Goler', boss: 'Sandberg'},
  {name: 'Hernandez', boss: 'Sandberg'},
  {name: 'Moissinac', boss: 'Sandberg'},
  {name: 'Kelley', boss: 'Sandberg'},
  {name: 'Steve', boss: 'Bosworth'},
  {name: 'Kyle', boss: 'Bosworth'},
  {name: 'Andra', boss: 'Bosworth'},
  {name: 'Richie', boss: 'Zhao'},
  {name: 'Sofia', boss: 'Zhao'},
  {name: 'Jen', boss: 'Zhao'},
  {name: 'Sabrina', boss: 'VanDyck'},
  {name: 'Michelle', boss: 'VanDyck'},
  {name: 'Josh', boss: 'VanDyck'},
  {name: 'Blanch', boss: 'Swain'},
  {name: 'Tom', boss: 'Swain'},
  {name: 'Joe', boss: 'Swain'},
  {name: 'Eddie', boss: 'Goler'},
  {name: 'Julie', boss: 'Goler'},
  {name: 'Annie', boss: 'Goler'},
  {name: 'Rowi', boss: 'Hernandez'},
  {name: 'Inga', boss: 'Hernandez'},
  {name: 'Morgan', boss: 'Hernandez'},
  {name: 'Amy', boss: 'Moissinac'},
  {name: 'Chuck', boss: 'Moissinac'},
  {name: 'Vinni', boss: 'Moissinac'},
  {name: 'Eric', boss: 'Kelley'},
  {name: 'Ana', boss: 'Kelley'},
  {name: 'Wes', boss: 'Kelley'}
];

const test = [
  {name: 'a', boss: null},
  {name: 'b', boss: 'a'},
  {name: 'c', boss: 'b'},
  {name: 'd', boss: 'c'}
];


function makeTree(people, boss) {
  let node = {};

  const filtered = people.filter(person => person.boss === boss);

  //console.log(filtered);

  if (filtered.length === 0) {
    return;
  }

  filtered.forEach(person => node[person.name] = makeTree(people, person.name));

  return node;
}

// console.log(
//   JSON.stringify(makeTree(people, null), null, 2)
// );

// console.log(makeTree(people, null));