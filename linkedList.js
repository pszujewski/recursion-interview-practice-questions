class LinkedList {
  
  constructor() {
    this.length = 0;
    this.head = null;
  }

  _find(index) {
    let node = this.head;
    for (let i=0; i<index; i++) {
      node = node.next;
    }
    return node;
  }

  insert(index, value) {
    if (index < 0 || index > this.length) {
      throw new Error('Must use a valid index');
    }

    const newNode = { value };

    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
    }

    else {
      // otherwise, insert in between nodes. Find node BEFORE insertion point
      const node = this._find(index - 1);
      newNode.next = node.next;
      node.next = newNode;
    }

    this.length++;
  }

  push(value) {
    this.insert(this.length, value);
  }

  pop() {
    this.remove(this.length - 1);
  }

  getVal(index) {
    if (index < 0 || index > this.length) {
      throw new Error('Must use a valid index');
    }
    return this._find(index).value;
  }

  setVal(index, value) {
    if (index < 0 || index > this.length) {
      throw new Error('Must use a valid index');
    }
    const node = this._find(index);
    node.value = value;
  }

  remove(index) {
    if (index < 0 || index > this.length) {
      throw new Error('Must use a valid index');
    }

    else if (index === 0) {
      this.head = this.head.next;
    }

    else if (index === this.length) {
      const node = this._find(index - 1);
      console.log(node);
      node.next = null; 
    }

    else {
      // otherwise, find node before delete point
      const node = this._find(index-1);
      node.next = node.next.next;
    }

    this.length--;
  }

}

// Create a new instance of the linked list class
const list = new LinkedList();

// Add data to list 
list.push('0');
list.push('1');
list.push('2');
list.push('3');
list.push('4');
list.push('5');
list.push('6');
list.push('7');
list.push('8');
list.push('9');
list.insert(4, 'hi');
list.pop();
list.remove(4);
console.log(
  JSON.stringify(list, null, 2)
);

// ========= Helper functions ======= // 

// size: returns the size of the linked list
function size(list) {
  return list.length;
}

// isEmpty: finds if the list is empty or not
function isEmpty(list) {
  return list.length === 0;
}

// findNode: finds the node you want
function findNode(list, idx) {
  if (idx < 0 || idx > list.length) {
    let message = 'Must enter valid index';
    console.error(message);
    throw new Error(message);
  }
  let node = list.head;
  for (let i=0; i<idx; i++) {
    node = node.next;
  }
  return node;
}

// findPrevious: finds the node before the item you are looking for
function findPrevious(list, idx) {
  if (idx === 0 || idx > list.length) {
    return false;
  }
  return findNode(list, idx - 1);
}

// display: displays the linked list
function display(list) {
  console.log(list.head);
  console.log(JSON.stringify(list.head, null, 2));
}

// Or...
function displayItems(list) {
  let node = list.head;
  console.log(node);
  for (let i=0; i<list.length; i++) {
    node = node.next;
    console.log(node);
  }
}

// findLast: returns the last node in the linked list
function findLast(list) {
  return findNode(list, list.length - 1);
}

// Run some helper functions to test
// console.log(findNode(list, 5));
// console.log(findPrevious(list, 5));
// console.log(findLast(list));

/*
Exercise 3

Write an algorithm to find the middle element of a linked list without 
using the .length property. The length property is not a common property 
of linked list. Although the curriculum implementation of Linked list has 
the length property so you can see how long your list is, for this 
exercise, don't use the length property.
*/

function findMiddleElement(list) {
  let counter = 0;
  let node = list.head;
  while (node.next !== null) {
    counter++;
    node = node.next;
  }
  let midIndex = Math.round(counter / 2);
  return findNode(list, midIndex);
}

function getMiddleEl(list) {
  let end = list.head;
  let middle = list.head;
  while(end !== null && end.next !== null) {
    // first pointer moves twice as fast
    end = end.next.next;
    middle = middle.next;
  }
  return middle.value;
}

console.log(getMiddleEl(list));
//console.log(findMiddleElement(list));

/*
Exercise 4

Write an algorithm to find the third element from the end of a linked list 
without using the .length property
*/

function findThirdFromLast(list) {
  let counter = 0;
  let node = list.head;
  while (node.next !== null) {
    counter++;
    node = node.next;
  }
  if (counter < 3) {
    throw new Error('Not enough items in list');
  }
  let index = counter - 3;
  return findNode(list, index);
}

function thirdFromEnd(lst) {
  let thirdEnd = lst.head;
  let end = lst.head.next.next.next;
  while(end !== null) {
    thirdEnd = thirdEnd.next;
    end = end.next;
  }
  return thirdEnd.value;
};

//console.log(findThirdFromLast(list));

/*
Exercise 5

Write an algorithm to reverse a linked list. For this exercise, notice we are not 
asking your display the linked list from the end. The linked list will be changed 
to having values in it in reverse order
*/
function reverseList(list) {
  let reversedList = {};
  reversedList.head = findLast(list);
  let node = reversedList.head
  for (let i=list.length-1; i>0; i--) {
    const toAdd = findPrevious(list, i);
    node.next = { value: toAdd.value };
    node = node.next;
    if (i === 1) {
      node.next = null;
    }
  }
  return reversedList;
}

// Version 2
function reverseListTwo(list) {
  const reverse = new LinkedList();
  const start = findLast(list).value;
  reverse.push(start);
  for (let i=list.length-1; i>0; i--) {
    const value = findPrevious(list, i).value;
    reverse.push(value);
  }
  return reverse;
}

//display(reverseListTwo(list));

/*
Exercise 6

Write an algorithm to find whether a linked list has a cycle (i.e. whether a node in 
the list has its next value pointing to an earlier node in the list). For this exercise, 
create a Linked list called CycleList. Be sure to insert nodes in the list in a way 
that it has a cycle. Then test your program with your cycleList.
*/

function makeCycleList(list) {
  let last = findLast(list);
  last.next = findNode(list, 0);
  return list;
}

function isCycle(list) {
  const firstItem = findNode(list, 0);
  const secondItem = findNode(list, 1);
  const nodeOne = test1(list);
  const nodeTwo = test2(list);
  if (nodeOne.value === firstItem.value &&
      nodeTwo.value === secondItem.value) {
    return {
      success: true,
      nodeOne,
      firstItem,
      nodeTwo,
      secondItem
    };
  }
  else {
    return {
      success: false,
      message: 'tests failed'
    };
  }
}

function test1(list) {
  // Finding the 'length' item in the original list should give the first item at index 0
  const length = list.length;
  const cycleList = makeCycleList(list);
  let node = cycleList.head
  for (let i=0; i<length; i++) {
    node = node.next;
  }
  return node;
}

function test2(list) {
  // Finding the 'length + 1' item in the original list should give the second item at index 1
  const distance = list.length + 1;
  const cycleList = makeCycleList(list);
  let node = cycleList.head
  for (let i=0; i<distance; i++) {
    node = node.next;
  }
  return node;
}

//console.log(isCycle(list));

// If you are done with the above, continue with the following exercises

/*
Exercise 7

Implement a doubly linked list. The 2 main function of the doubly linked list would be 
insert and remove.
*/

class DoublyLinkedList {

  constructor() {
    this.length = 0;
    this.head = null;
  }

  _find(index) {
    let node = this.head;
    for (let i=0; i<index; i++) {
      node = node.next;
    }
    return node;
  }

  insert(index, value) {
    if (index < 0 || index > this.length) {
      throw new Error('Must use a valid index');
    }

    const newNode = { value };

    if (index === 0) {
      newNode.next = this.head;
      newNode.prev = this.head;
      this.head = newNode;
    }

    else {
      // otherwise, insert in between nodes. Find node BEFORE insertion point
      const node = this._find(index - 1);
      newNode.next = node.next;
      newNode.prev = node;
      node.next = newNode;
    }

    this.length++;
  }

  push(value) {
    this.insert(this.length, value);
  }

  remove(index) {
    if (index < 0 || index > this.length) {
      throw new Error('Must use a valid index');
    }

    else if (index === 0) {
      this.head = this.head.next;
      this.head.prev = null;
    }

    else if (index === this.length - 1) {
      const node = this._find(index - 1);
      node.next = null; 
    }

    else {
      // otherwise, find node before and after delete point
      const nodeBefore = this._find(index - 1);
      const nodeAfter = this._find(index + 1);
      nodeBefore.next = nodeBefore.next.next;
      nodeAfter.prev = nodeAfter.prev.prev;
    }

    this.length--;
  }

}

const doubleList = new DoublyLinkedList();
doubleList.insert(0, '0');
doubleList.insert(1, '1');
doubleList.insert(2, '2');
doubleList.insert(3, '3');
doubleList.insert(4, '4');
doubleList.insert(5, '5');
doubleList.push('pushed');
doubleList.push('hello');
doubleList.remove(3);
//displayItems(doubleList);

/*
Exercise 8

How would you reverse the doubly linked list? How is this implementation different than 
reversing a singly linked list from Exercise 5.
--> The key differnece is that you can directly chain up the 'prev' chain using a for loop
*/

function getReverseOfDouble(list) {
  const newDouble = new DoublyLinkedList();
  let node = findLast(list);
  for (let i=list.length - 1; i > 0; i--) {
    newDouble.push(node.value);
    node = node.prev;   
  }
  return newDouble;
}

//console.log(getReverseOfDouble(doubleList));

