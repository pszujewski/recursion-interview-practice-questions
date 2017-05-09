class HashMap {
  constructor(initialCapacity=8) {
    this.length = 0; // The number of items stored in the hash map
    this._slots = [];
    this._capacity = initialCapacity; // total number of 'slots' available
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
        throw new Error('Key error');
    }
    return this._slots[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
        this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);
    this._slots[index] = {
        key,
        value,
        deleted: false
    };
    this.length++;
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
        throw new Error('Key error');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    // Purpose is to find the slot based on the key provided. 
    // The return value is just the index, or the location. 
    const hash = HashMap._hashString(key);
    console.log('==========================');
    console.log(`The key is ${key}`);
    console.log(`The hash is: ${hash}`);
    console.log(`capacity is: ${this._capacity}`);
    console.log(`The start is: ${hash % this._capacity}`);
    console.log('==========================');
    const start = hash % this._capacity;

    for (let i=start; i<start + this._capacity; i++) {
      // This for loop helps address collisions
      // You need the following in case the 'start' starts at 
      const index = i % this._capacity;
      console.log(`the index is ${index}`);
      // then check to see what the value at that index is. If you are trying to add
      // something it should be undefined. If not, loop continues 
      const slot = this._slots[index];
      console.log(`The slot is ${slot}`);
      if (slot === undefined || (slot.key == key && !slot.deleted)) {
          return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
          this.set(slot.key, slot.value);
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
hashMap.set('Peter', 'Szujewski');
hashMap.set('Barack', 'Obama');
// hashMap.set('Barn', 'Yard');
// hashMap.set('Banana', 'fruit');
// hashMap.set('Barrel', 'Whiskey');
// hashMap.set('Band', 'Friends');
console.log(hashMap._slots);

// a hash function takes a larger value and turns it into a smaller value. 
// Strings are actually stored in the computer as arrays of integers. 
//So actually a large number is smaller than most strings