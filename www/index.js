import { Block, init_panic_hook } from "blockchain-wasm";

const id = document.getElementById("id");
const data = document.getElementById("data");
const hash = document.getElementById("hash");
const mineBtn = document.getElementById("mine");

const block = Block.new();

function init() {
  init_panic_hook();
  id.value = block.get_id();
  data.value = block.get_data();
  hash.value = block.get_hash();
}

function update() {
  id.value = block.get_id();
  data.value = block.get_data();
  hash.value = block.get_hash();
}

mineBtn.addEventListener("click", () => {
  block.set_data(data.value);
  block.mine();
  update();
});

init();
