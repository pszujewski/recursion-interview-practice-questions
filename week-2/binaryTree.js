class BinarySearchTree {

  constructor(key=null, value=null, parent=null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.right = null;
    this.left = null;
  }

  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    }
    else if (key < this.key) {
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      else {
        this.left.insert(key, value);
      }
    }
    else if (key > this.key) {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }

  get(key) {
    if (key == this.key) {
      return this.value;
    }
    else if (key < this.key) {
      return this.left.get(key);
    }
    else if (key > this.key) {
      return this.right.get(key);
    }
    else {
      throw new Error('Key error');
    }
  }

  remove(key) {
    console.log('Removing action', key)
    if (key == this.key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        return successor.remove(successor.key);
      }
      else if (this.left) {
        this._replaceWith(this.left);
      }
      else if (this.right) {
        this._replaceWith(this.right);
      }
      else {
        this._replaceWith(null);
        return 'remove success';
      }
    }
    else if (key < this.key && this.left) {
      return this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      return this.right.remove(key);
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      }
      else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

}

const tree = new BinarySearchTree(5, 'Hi, I am the value');
tree.insert(8, 'Eight');
tree.insert(3, 'Three');
tree.insert(6, 'Six');
tree.insert(1, 'One');
tree.insert(9, 'Nine');
tree.insert(30, 'Thirty');
tree.insert(22, 'Twenty-Two');
tree.insert(15, 'Fifteen');
tree.insert(4, 'Four');
tree.insert(2, 'Two');

// console.log('Original tree', tree);
// console.log('Original tree Node 4', tree.left.right);
// // console.log(tree.get(6));
// console.log('Remove action initiated', tree.remove(4));
// console.log('New tree', tree);
// console.log('New tree Node 4', tree.left.right);
// console.log(tree);

/*
Write an algorithm to find the height of a binary search tree
*/

function findTreeHeight(tree) {

  let minCounter = 0;
  let maxCounter = 0;

  function findMin(node) {
    minCounter++;
    if (!node.left && !node.right) {
      return node.value;
    }
    else if (node.left) {
      return findMin(node.left);
    }
    else {
      return findMin(node.right);
    }
  }

  function findMax(node) {
    maxCounter++;
    if (!node.right && !node.left) {
      return node.value;
    }
    else if (node.right) {
      return findMax(node.right);
    }
    else {
      return findMax(node.left);
    }
  }

  const minNodeVal = findMin(tree);
  const maxNodeVal = findMax(tree);

  console.log(minNodeVal);
  console.log(maxNodeVal);

  if (minCounter < maxCounter) {
    return `The height is ${maxCounter}`;
  }

  else {
    return `The height is ${minCounter}`;
  }

}

// console.log(findTreeHeight(tree));

/*
Write an algorithm to check whether an arbitrary
binary tree is a binary search tree, assuming the tree does not contain duplicates
*/
console.log(tree);

function isBinarySearchTree(node) {

  if (!node.left && !node.right) {
    return true;
  }
  
  if (node.left && node.right) {
    if (node.left.key < node.right.key) {
      // continue checking
      return isBinarySearchTree(node.left) && isBinarySearchTree(node.right);
    }
    else {
      return false;
    }
  }

  else if (node.left) {
    // is node.left.key less than node.key?
    if (node.left.key < node.key) {
      return isBinarySearchTree(node.left);
    }
    else {
      return false;
    }
  }

  else if (node.right) {
    // is node.right.key greater than node.key?
    if (node.right.key > node.key){
      return isBinarySearchTree(node.right);
    }
    else {
      return false;
    }
  }
 
}

console.log(isBinarySearchTree(tree));


/*
Write an algorithm to find the third largest node in a binary search tree
*/

function findLargest(node) {
  if (!node.right) {
    return node;
  }
  else {
    return findLargest(node.right);
  }
}

function findThirdLargest(node) {
 return findLargest(node).parent.parent;
}

console.log(findThirdLargest(tree));
console.log(findThirdLargest(tree).value);