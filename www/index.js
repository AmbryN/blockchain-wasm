import { Block, init_panic_hook } from "blockchain-wasm";

// Get the elements from the UI
const id = document.getElementById("id");
const data = document.getElementById("data");
const hash = document.getElementById("hash");
const mineBtn = document.getElementById("mine");

// Initializes a block
const block = Block.new();

// Initializes the UI with the block's attributes
function init() {
  init_panic_hook();
  id.value = block.get_id();
  data.value = block.get_data();
  hash.value = block.get_hash();
}

// Updates the UI when hash got recalculated
function update() {
  hash.value = block.get_hash();
}

mineBtn.addEventListener("click", () => {
  block.set_data(data.value);
  block.mine();
  update();
});

init();
