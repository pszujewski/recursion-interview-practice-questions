// Write a hash map implementation which uses separate chaining.
// Which means collision cases are handled by adding linked list to the array position
// where collision occurs. Or adding to the linked list if one has already been started.  

class HashMap {
  constructor(initialCapacity=8) {
    this.length = 0; // The number of items stored in the hash map
    this._slots = [];
    this._capacity = initialCapacity; // total number of 'slots' available
    this._deleted = 0;
  }

  get(key) {
    const result = this._findSlot(key);
    if (this._slots[result.index] === undefined) {
        throw new Error('Key error');
    }
    let node = this._slots[result.index];
    while (node.key !== key) {
      node = node.next;
    }
    return node.value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
        this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const newNode = {
      key,
      value,
      deleted: false,
      next: null
    };

    const slot = this._findSlot(key);

    if (slot.isEmpty) {
      this._slots[slot.index] = newNode;
    }

    else {
      let node = this._slots[slot.index];
      while (node.next !== null) {
        node = node.next;
      }
      node.next = newNode;
    }
   
    this.length++;
  }

  remove(key) {
    const result = this._findSlot(key);
    let node = this._slots[result.index];
    if (node === undefined) {
        throw new Error('Key error');
    }
    
    while (node.key !== key) {
      node = node.next;
    }

    node.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    // Purpose is to find the slot based on the key provided. 
    // The return value is just the index, or the location. 
    const hash = HashMap._hashString(key);
    const index = hash % this._capacity;

    // then check to see what the value at that index is. 
    // return boolean noting if it is empty or not.
    const slot = this._slots[index];
  
    if (slot === undefined || (slot.key == key && !slot.deleted)) {
        return {index, isEmpty: true};
    }
    else if (slot !== undefined) {
      return {index, isEmpty: false};
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (let node of oldSlots) {
      if (node !== undefined) {
        while (node !== null) {
          if (!node.deleted) {
            this.set(node.key, node.value);
          }
          node = node.next
        }
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

const hashMap = new HashMap();
hashMap.set('Peter', 's');
hashMap.set('Franklin', 's');
hashMap.set('Ramon', 's');
hashMap.set('Frank', 's');
hashMap.set('Colin', 's');
hashMap.set('Ally', 's');

// Call remove function to toggle deleted field for given nodes
hashMap.remove('Colin');
hashMap.remove('Franklin');
hashMap.remove('Frank');

// to make sure resize occurs
hashMap.set('Dummy', 's');
hashMap.set('Data', 'I am nested');
hashMap.set('For', 's');
hashMap.set('Going', 's');
hashMap.set('Over', 's');
hashMap.set('Capacity', 's');
hashMap.set('Again', 's');
hashMap.set('Thanks', 's');
hashMap.set('Tree', 'I am a unique value');

console.log(hashMap._slots);
console.log(hashMap.get('Tree'));
console.log(hashMap.get('Data'));

// a hash function takes a larger value and turns it into a smaller value. 
// Strings are actually stored in the computer as arrays of integers. 
//So actually a large number is smaller than most strings

// ================== Algorithm Challenges =================== //

/*
Write an algorithm to check whether any permutation of a string is a palindrome 
(a string which reads the same forwards and backwards). For example, "madam", "amadm" and 
"cllci" should all return true, whereas "caabl" and "aaxxis" should return false.
*/

function findPalindromes(string) {
  const permutationsMap = new HashMap();

  // palindrome -> one hash map and you put each letter as a key into the hash map
  // the value of the letter, you start with one and everytime you the same key you increment one.
  // at the end you will have an even number of chars and an odd number. 
  // if you find that there is only one char with an odd value it's a palindrome. 
  // if you have more than one char with an odd value, it is not a palindrome. 

  // the goal is to find if it's possible to find a permutation that is a palindrome. 
  // Not every permutation. 

  function permutations(prefix, str) {
    if(str.length <= 1){
      const permutation = `${prefix}${str}`;
      const check = isPalindrome(permutation);
      permutationsMap.set(permutation, `Palindrome: ${check}`);
    } 
    else {
      for(let i=0; i<str.length; i++) {
        let currentLetter = str.substring(i, i+1);
        let previousLetters = str.substring(0,i);
        let afterLetters = str.substring(i+1);
        permutations(prefix+currentLetter, previousLetters+afterLetters);
      }
    }
  }

  function isPalindrome(string) {
    string = string.replace(/\s/g, '');
    string = string.toLowerCase().trim();
    const strArray = [];
    let reversedStr = '';
    // Put each character in the array one at a time
    for (let i=0; i<string.length; i++) {
      strArray.push(string[i]);
    }
    // pop off each character and save in a new string
    for (let i=0; i<string.length; i++) {
      let val = strArray.pop();
      reversedStr = reversedStr.concat(val);
    }
    // compare original str to new str
    return string === reversedStr;
  }

  permutations(' ', string);
  //loop thru permutations map and remove all non palindrme permutations. 
  return permutationsMap;
}

console.log(findPalindromes('madam'));
// Find all the permutations of the string and check if each one is a palindrome. 

// Save each permutation that is a palindrome

/*
Write an algorithm to group a list of words into anagrams. For example, if the input was 
['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'], the output should be: 
[['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']].
*/

function groupAnagrams(array) {
  const anagrams = new HashMap();
  for (let i=0; i<array.length; i++) {
    anagrams.set(array[i], `The array position is ${i}`);
  }
  return anagrams;
}

console.log(groupAnagrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));