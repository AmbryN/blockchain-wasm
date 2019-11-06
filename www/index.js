import { Block, init_panic_hook } from "blockchain-wasm";

const pattern = document.getElementById("pattern");

// Get the elements from the UI
const blockForms = document.getElementsByName("block");
const ids = document.getElementsByName("id");
const nonces = document.getElementsByName("nonce");
const datas = document.getElementsByName("data");
const previouses = document.getElementsByName("previous");
const hashes = document.getElementsByName("hash");
const mineBtns = document.getElementsByName("mine");

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
    if (nextBlock) {
      nextBlock.set_previous(block.get_hash());
      nextBlock.mine("");
    }
  }
}

// Initializes a blockchain
const chain = new Blockchain();

// Add blocks
chain.addBlock();
chain.getBlock(0).mine("");
chain.addBlock();

// Initializes the UI with the block's attributes
function init() {
  init_panic_hook();
  chain.blocks.forEach((block, index) => {
    ids[index].value = block.get_id();
    nonces[index].value = block.get_nonce();
    datas[index].value = block.get_data();
    previouses[index].value = block.get_previous();
    hashes[index].value = block.get_hash();
  });
  checkValidity();
}

// Updates the UI when hash got recalculated
function update() {
  chain.blocks.forEach((block, index) => {
    nonces[index].value = block.get_nonce();
    hashes[index].value = block.get_hash();
    previouses[index].value = block.get_previous();
  });
  checkValidity();
}

/* Checks validity of the hashes with 
    with regards to the set pattern:
    it they don't match, turns the block to red
    if they match, turns the block to green */
function checkValidity() {
  blockForms.forEach((blockForm, index) => {
    if (
      hashes[index].value.startsWith(pattern.value) &&
      previouses[index].value.startsWith(pattern.value)
    ) {
      blockForm.style.backgroundColor = "#008000";
    } else {
      blockForm.style.backgroundColor = "#FF0000";
    }
  });
}

/* Data change listeners and buttons 
  to compute valid hash */
chain.blocks.forEach((block, index) => {
  datas[index].addEventListener("input", () => {
    block.set_data(datas[index].value);
    block.mine("");
    chain.updateNextBlock(block);
    update();
  });

  mineBtns[index].addEventListener("click", e => {
    e.preventDefault();
    block.set_data(datas[index].value);
    block.mine(pattern.value);
    chain.updateNextBlock(block);
    update();
  });
});

init();
