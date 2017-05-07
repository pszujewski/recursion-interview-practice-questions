class Stack {

  constructor() {
    this.top = null;
    this.length = 0;
  }

  push(value) {
    // add to the top of the stack
    const node = {
      value
    };

    node.next = this.top;
    this.top = node;

    this.length++;
  }

  pop() {
    // remove from the top of the stack
    if (!this.top) {
      throw new Error('Stack is empty');
    }

    const data = this.top.value;

    this.top = this.top.next;

    this.length--;
    return data;
  }

}

const stack = new Stack();
stack.push('0');
stack.push('1');
stack.push('2');
stack.push('3');
stack.push('4');
stack.push('5');
stack.push('6');
stack.push('7');
stack.pop();

function json(s) {
  console.log(JSON.stringify(s, null, 2));
}

function display(s) {
  let node = s.top;
  while (node !== null) {
    console.log(node.value);
    node = node.next;
  }
}

function peek(s) {
  if (s.top === null) {
    return null;
  }
  return s.top.value;
}

// Palindrome testing: using stack, test to see if a string is palindrome or not

function isPalindrome(string) {
  string = string.replace(/\s/g, '');
  string = string.toLowerCase().trim();
  const strStack = new Stack();
  let reversedStr = '';
  // Put each character in the stack one at a time
  for (let i=0; i<string.length; i++) {
    strStack.push(string[i]);
  }
  // pop off each character and save in a new string
  while (strStack.top !== null) {
    let val = strStack.pop()
    reversedStr = reversedStr.concat(val);
  }
  // compare original str to new str
  console.log(string);
  console.log(reversedStr);
  return string === reversedStr;
}

// console.log(isPalindrome('A nut for a jar of tuna'));

/*
Parenthesis matching: Given a math expression, use stack to see if it has balanced 
parenthesis or not. For example[()]{}{()} is balanced, [{() is not.
*/ 

let badString = '(()()()))';
let goodStr = '(()()())'

function isMatch(str) {
  const stack = new Stack();
  // Loop over each character and push to the stack one by one
  try {
    for (var i=0; i<str.length; i++) {
      if (str[i] === '(') {
        stack.push(i);
      } 
      else if (str[i] === ')') {
        stack.pop();
      }
    }
  }
  catch (error) {
    console.error(`error at position ${i}`);
    return {result: false, location: `error at position ${i}`};
  }
  if (stack.top === null) {
    return true;
  }
  else {
    return {result: false, location: stack.top.value};
  }
}

console.log(isMatch(badString));

//QUEUEUEUEUES
class Queue {
  constructor () {
    this.first = null;
    this.last = null;
    this.length = 0;
  }
  enqueue (value) { //adding to end of line
    let node = {value, prev: null, next: null};
    if (this.first === null) {
      this.first = node;
    }
    else if (this.last) { //node = b, last is a
      node.prev = this.last; //b.prev = a
      this.last.next = node; //a.next = b
    }                     //a {prev: null, next: b} b {prev: a, next: null} first: {a}, last: {b}
    this.last = node; //last = b
    this.length++;
    //ALL NODES MUST HAVE VALUE, PREV, NEXT
  }
  dequeue () { //removing first person from line
    if (this.length <= 0) {
      throw new Error('Queue is currently empty');
    }
    const returnValue = this.first.value;
    //second item should not have a prev
    if (!this.first.next) {
      this.first = null;
      this.last = null;
    } 
    else {
      let secondNode = this.first.next;
      secondNode.prev = null;
      this.first = secondNode;
    }
    //first should then be second item
    this.length--;
    return returnValue;
  }
}
function displayQueue(s) {
  let node = s.first;
  while (node !== null) {
    console.log(node.value);
    node = node.next;
  }
}
let dancers = 
[
{gender: 'm', name: '1'},
{gender: 'f', name: '1'},
{gender: 'm', name: '2'},
{gender: 'm', name: '3'},
{gender: 'f', name: '2'},
{gender: 'f', name: '3'},
{gender: 'f', name: '4'},
{gender: 'm', name: '4'},
]
function squareDance (arr) {
  const spares = new Queue();
  let array = [];
  arr.forEach((dancer) => {
    //queue is empty
    if (!spares.first) {
      spares.enqueue(dancer);
    } else
    //queue is males, next is female or queue is females, next is male
    if (spares.first.value.gender !== dancer.gender) {
      array.push([dancer, spares.dequeue()]);
    } else
    //queue is males and next is female, or queue is females and next is male
    if (spares.first.value.gender === dancer.gender) {
      spares.enqueue(dancer);
    }
  })
  console.log(array);
  displayQueue(spares);
}
function shitbank (customers) {
  while (customers.first) {
    displayQueue(customers);
    const random = Math.random()*100;
    if (random < 25) {
      customers.enqueue(customers.dequeue());
    }
    else {
      customers.dequeue();
    }
    console.log('another customer has escaped!')
  }
}
// squareDance(dancers);
const newQueue = new Queue();
newQueue.enqueue('a');
newQueue.enqueue('b');
newQueue.enqueue('c');
newQueue.enqueue('d');
newQueue.enqueue('e');
shitbank(newQueue);
// newQueue.dequeue();
// console.log(newQueue);
// displayQueue(newQueue);