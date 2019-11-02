import { Block, init_panic_hook } from "blockchain-wasm";

const pattern = document.getElementById("pattern");

// Get the elements from the UI for block 0
const blockForm = document.getElementById("block");
const id = document.getElementById("id");
const nonce = document.getElementById("nonce");
const data = document.getElementById("data");
const hash = document.getElementById("hash");
const mineBtn = document.getElementById("mine");

// Get the elements from the UI for block 1
const blockForm1 = document.getElementById("block1");
const id1 = document.getElementById("id1");
const nonce1 = document.getElementById("nonce1");
const data1 = document.getElementById("data1");
const hash1 = document.getElementById("hash1");
const mineBtn1 = document.getElementById("mine1");

// Defines blockchain
class Blockchain {
  constructor() {
    this.blocks = [];
  }

  addBlock() {
    let length = this.blocks.length;
    let block = Block.new(length);
    if (length != 0) {
      block.set_previous(this.blocks[length - 1].get_hash());
    }
    this.blocks.push(block);
  }

  getBlock(id) {
    return this.blocks[id];
  }

  /* When a block is mined, updates
    the previous attribute of the next one */
  updateNextBlock(block) {
    let nextBlock = this.blocks[block.get_id() + 1];
    nextBlock.set_previous(block.get_hash());
  }
}

// Initializes a blockchain
const chain = new Blockchain();

// Add blocks
chain.addBlock();
const block = chain.getBlock(0);
block.mine("");
chain.addBlock();
const block1 = chain.getBlock(1);

// Initializes the UI with the block's attributes
function init() {
  init_panic_hook();
  id.value = block.get_id();
  nonce.value = block.get_nonce();
  data.value = block.get_data();
  hash.value = block.get_hash();

  id1.value = block1.get_id();
  nonce1.value = block1.get_nonce();
  data1.value = block1.get_data();
  hash1.value = block1.get_hash();
  previous1.value = hash.value;

  checkValidity();
}

// Updates the UI when hash got recalculated
function update() {
  nonce.value = block.get_nonce();
  hash.value = block.get_hash();

  nonce1.value = block1.get_nonce();
  hash1.value = block1.get_hash();
  previous1.value = hash.value;

  checkValidity();
}

/* Checks validity of the hashes with 
    with regards to the set pattern:
    it they don't match, turns the block to red
    if they match, turns the block to green */
function checkValidity() {
  if (hash.value.startsWith(pattern.value)) {
    blockForm.style.backgroundColor = "#008000";
  } else {
    blockForm.style.backgroundColor = "#FF0000";
  }
  if (
    hash1.value.startsWith(pattern.value) &&
    previous1.value.startsWith(pattern.value)
  ) {
    blockForm1.style.backgroundColor = "#008000";
  } else {
    blockForm1.style.backgroundColor = "#FF0000";
  }
}

/* When data changes, compute a hash
  without using the given pattern */

data.addEventListener("input", () => {
  block.set_data(data.value);
  block.mine("");
  block1.mine("");
  update();
});

data1.addEventListener("input", () => {
  block1.set_data(data1.value);
  block1.mine("");
  update();
});

/* When mine buttons are clicked,
  compute a hash that starts with the pattern */

mineBtn.addEventListener("click", e => {
  e.preventDefault();
  block.set_data(data.value);
  block.mine(pattern.value);
  chain.updateNextBlock(block);
  update();
});

mineBtn1.addEventListener("click", e => {
  e.preventDefault();
  block1.set_data(data1.value);
  block1.mine(pattern.value);
  update();
});

init();
