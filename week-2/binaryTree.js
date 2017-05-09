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
    if (key == this.key) {
      if (this.left && this.right) {
        const successor = this._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      else if (this.left) {
        this._replaceWith(this.left);
      }
      else if (this.right) {
        this._replaceWith(this.right);
      }
      else {
        this._replaceWith(null);
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
tree.insert(4, 'Four');
tree.insert(2, 'Two');
console.log(tree);
console.log(tree.get(6));