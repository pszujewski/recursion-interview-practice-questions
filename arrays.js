// // The world's worst memory allocator
// class Memory {

//   constructor() {
//     this.memory = new Float64Array(1024);
//     this.head = 0;
//   }

//   allocate(size) {
//     if (this.head + size > this.memory.length) {
//         return null;
//     }
//     let start = this.head;
//     this.head += size;
//     return start;
//   }

//   free(ptr) {
//     console.log('Memory free');
//   }

//   copy(to, from, size) {
//     if (from === to) {
//       return;
//     }
//     else if (from > to) {
//       // Iterate forwards
//       for (var i=0; i<size; i++) {
//         this.set(to + i, this.get(from + i));
//       }
//     }
//     else {
//       // Iterate backwards
//       for (var i=size - 1; i>=0; i--) {
//         this.set(to + i, this.get(from + i));
//       }
//     }
//   }

//   get(ptr) {
//     return this.memory[ptr];
//   }

//   set(ptr, value) {
//     this.memory[ptr] = value;
//   }

// }

// // ================ Custom Array Class ================ //

// const memory = new Memory();
// console.log(memory);

// class CustomArray {

//   constructor() {
//     this.SIZE_RATIO = 3;
//     this.length = 0;
//     this._capacity = 0;
//     this.ptr = memory.allocate(this.length);
//   }

//   push(value) {
//    if (this.length >= this._capacity) {
//       this._resize((this.length + 1) * this.SIZE_RATIO);
//    }
//     memory.set(this.ptr + this.length, value);
//     this.length++;
//   }

//   _resize(size) {
//     const oldPtr = this.ptr;
//     this.ptr = memory.allocate(size);
//     if (this.ptr === null) {
//         throw new Error('Out of memory');
//     }
//     memory.copy(this.ptr, oldPtr, this.length);
//     memory.free(oldPtr);
//   }

//   get(index) {
//     if (index < 0 || index >= this.length) {
//         throw new Error('Index error');
//     }
//     return memory.get(this.ptr + index);
//   }

//   pop() {
//     if (this.length == 0) {
//         throw new Error('Index error');
//     }
//     const value = memory.get(this.ptr + this.length - 1);
//     this.length--;
//     return value;
//   }

//   insert(index, value) {
//     if (index < 0 || index >= this.length) {
//         throw new Error('Index error');
//     }

//     if (this.length >= this._capacity) {
//         this._resize((this.length + 1) * this.SIZE_RATIO);
//     }

//     memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
//     memory.set(this.ptr + index, value);
//     this.length++;
//   }

//   remove(index) {
//     if (index < 0 || index >= this.length) {
//         throw new Error('Index error');
//     }
//     memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
//     this.length--;
//   }

// }

// const array = new CustomArray();
// array.push(2);
// array.push(42);
// array.push(35);
// array.push(8);
// array.push(9);
// array.push(12);
// array.push(31);
// console.log(array.get(2));
// console.log(array);

// Algorithm interview questions
// Interview Questions

// Imagine you have an array of numbers. 
// Write an algorithm to remove all numbers less than five from the array.
// You shouldn't use the .filter method here; try to write the algorithm from scratch.

// Time Complexity is O(n) because it is directly proportional to the size of the 
// input (length of the array). 
function customFilterRecursive(arr) {
  if (arr.length === 0) {
    // Base case
    return [];
  }

  if (arr[0] > 5) {
    return [arr[0], ...customFilterRecursive(arr.slice(1))];
  }

  else if (arr[0] < 5) {
    return [...customFilterRecursive(arr.slice(1))];
  }

}

//console.log(customFilterRecursive([1, 2, 4, 7, 8, 9, 13, 56, 2, 3]));

// Time Complexity is O(n) because it is directly proportional to the size of the 
// input (length of the array). 
function customFilterIterative(arr) {
  let filtered = [];
  for (let i=0; i<arr.length; i++) {
    if (arr[i] > 5) {
      // Remove the item from the array
      filtered.push(arr[i])
    }
  } 
  return filtered;
}

// console.log(customFilterIterative([1, 2, 4, 7, 8, 9, 13, 56, 2, 3]));

/*
Imagine you have two arrays which have already been sorted. Write an algorithm to 
merge the two arrays 
into a single array, which should also be sorted. For example, 
if your input arrays were 
[1, 3, 6, 8, 11] and [2, 3, 5, 8, 9, 10], your output array
should be [1, 2, 3, 3, 5, 6, 8, 8, 9, 10, 11].
*/

function mergeAndSort(arr1, arr2) {
  let mergedArr = arr1.concat(arr2);
  return mergedArr.sort((a, b) => {
    return a - b;
  });
}

// Time complexity is O(n)?????????
// Vary the size of the input (array) to determine the order of growth in the function's 
// run-time (Big O Notation)
// With an array length of...
// 1 --> 3
// 2 --> 6
// 3 --> 10
// 4 --> 15
// 5 --> 21
// 6 --> 28
// 7 --> 36
// 8 --> 45
function mergeAndSortRecursive(arr1, arr2) {
  let ticks = 0;
  let mergedArr = [...arr1, ...arr2];

  function recursiveSort(arr) {
    ticks++;
    if (arr.length === 0) {
      // Base case
      return [];
    }

    // Find the lowest number in the array
    let lowest;
    let index;
    for (let i=0; i<arr.length; i++) {
      ticks++;
      if (typeof lowest === 'undefined' || arr[i] < lowest) {
        lowest = arr[i];
        index = i;
      }
    }

    // slice the arr and exclude the lowest number
    const modifiedArr = index === 0 ? arr.slice(1) : arr.slice(0, index).concat(arr.slice(index+1));
  
    // return the lowest number in an array and recursively call the function with the sliced arr  
    return [lowest, ...recursiveSort(modifiedArr)];
  }

  // Invoke recursive sort and return its return value
  const result = recursiveSort(mergedArr);
  return {result, ticks};
}

console.log(mergeAndSortRecursive([1], []));
// console.log(mergeAndSort([1, 3, 6, 8, 11], [2, 3, 5, 89, 8, 9, 4, 2, 10]));

/*
Given an array of numbers, write an algorithm to find out the products of every number, 
except the one at that index. For example, if the input was [1, 3, 9, 4], the output 
should be [108, 36, 12, 27] (i.e. [3*9*4, 1*9*4, 1*3*4, 1*3*9]).
*/
// Time Complexity is Exponential O(2^n) because we have a loop nested within a loop
// For an array of length...
// 1 --> 2
// 2 --> 6
// 3 --> 12
// 4 --> 20
// 5 --> 30
// 6 --> 42
// 7 --> 56
function producerIterative(arr) {
  let ticks = 0;
  let newArray = [];
  for (let i=0; i<arr.length; i++) {
    ticks++;
    let currentProduct = 1; 
    for (let j=0; j<arr.length; j++) {
      ticks++;
      if (i !== j) {
        currentProduct *= arr[j];
      }
    }
    newArray.push(currentProduct);
  }
  return {result: newArray, ticks};
}

// console.log(producerIterative([1, 3, 3, 7, 9, 2, 3]));

// Recursive producer !!!
// Time Complexity is O(n) because it is directly proportional to the size of the 
// input (length of the array). 
function producer(arr, idx=0) {
  if (arr.length === idx) {
    return [];
  }

  const modifiedArr = idx === 0 ? arr.slice(1) : arr.slice(0, idx).concat(arr.slice(idx+1));

  const product = modifiedArr.reduce((acc, curr) => {
    return acc * curr;
  });

  console.log(modifiedArr);

  return [product, ...producer(arr, idx+1)];
}

//console.log(producer([1, 3, 6, 8, 2]));
