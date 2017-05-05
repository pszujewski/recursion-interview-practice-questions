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
