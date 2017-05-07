/*
Queue
a -> prev=b; next=null
b -> prev=c; next=a
c -> prev=d; next=b
d -> prev=null; next=c

this.first = a // next is null
this.last = d // prev is null
*/

/*
de-Queue

this.first = null // next is null
this.last = null // prev is null
*/

class Queue {

  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  enqueue(value) {
    const node = {
      value,
      next: null,
      prev: null
    }

    if (this.last) {
      this.last.prev = node;
      node.next = this.last;
    }

    this.last = node;

    if (this.first === null) {
      this.first = node;
    }

    this.length++;
  }

  dequeue() {

    if (this.first === null && this.last === null) {
      return null;
    }

    const val = this.first.value;

    if (this.first.value === this.last.value) {
      this.first = this.first.next;
      this.last = this.last.prev;
    }

    else {
      this.first = this.first.prev;
      this.first.next = null;
    }

    this.length--;
    return val;
  }

}

// Helper functions
function json(s) {
  console.log(JSON.stringify(s, null, 2));
}

function display(s) {
  let node = s.first;
  while (node !== null) {
    console.log(node.value);
    node = node.prev;
  }
}

function peek(s) {
  if (s.top === null) {
    return null;
  }
  return s.top.value;
}

const queue = new Queue();
queue.enqueue('1');
queue.enqueue('2');
queue.enqueue('3');
queue.enqueue('4');
queue.enqueue('5');
queue.enqueue('6');
queue.dequeue();

// Square dancers challenge

let dancers = [
  {gender: 'm', name: 'male1'},
  {gender: 'f', name: 'female1'},
  {gender: 'm', name: 'male2'},
  {gender: 'm', name: 'male3'},
  {gender: 'f', name: 'female2'},
  {gender: 'f', name: 'female3'},
  {gender: 'f', name: 'female4'},
  {gender: 'f', name: 'female5'},
  {gender: 'f', name: 'female6'},
  {gender: 'f', name: 'female7'},
  {gender: 'm', name: 'male4'},
  {gender: 'm', name: 'male5'},
  {gender: 'm', name: 'male6'},
  {gender: 'm', name: 'male7'}
];

function pairUpDancers(dancers) {
  const males = new Queue();
  const females = new Queue();
  const pairs = [];

  dancers.forEach(dancer => {
    if (dancer.gender === 'm') {
      males.enqueue(dancer);
    }
    else if (dancer.gender === 'f') {
      females.enqueue(dancer);
    }
  });

  if (males.length !== females.length) {
    return {result: false, message: 'uneven number of men and women'};
  }

  //console.log(males);
  //display(females);

  let male;
  let female;
  while (male !== null && female !== null) {
    male = males.dequeue();
    female = females.dequeue();
    if (male !== null && female !== null) {
      pairs.push({
        male: male.name, 
        female: female.name
      });
    }
  }

  return pairs;
}

console.log(pairUpDancers(dancers));