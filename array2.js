class Memory {

  constructor() {
    this.memory = new Float64Array(1024);
    this.head = 0;
  }

  allocate(size) {
    if (this.head + size > this.memory.length) {
      return null;
    }
    let start = this.head;
    this.head += size;
    return start;
  }

  free(ptr) {
    console.log(`Freeing memory at ${ptr}`);
  }

  copy(to, from, size) {
    if (from === to) {
      return;
    }
    else if (from > to) {
      // Iterate forwards
      for (var i=0; i<size; i++) {
        this.set(to + i, this.get(from + i));
      }
    }
    else {
      // Iterate backwards
      for (var i=size - 1; i>=0; i--) {
        this.set(to + i, this.get(from + i));
      }
    }
  }

  get(ptr) {
    return this.memory[ptr];
  }

  set(ptr, value) {
    this.memory[ptr] = value;
  }

}

const memory = new Memory();

class CustomArray {
  constructor() {
    this.SIZE_RATIO = 3;
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this._capacity);
  }

  push(value) {
    if (this.length >= this._capacity) {
      // resize
    }
    memory.set(this.ptr, value);
    this.length++;
  }

  _resize(size) {
    let oldPtr = this.ptr
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
        throw new Error('Out of memory');
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
  }

}