mod utils;
extern crate crypto;

use self::crypto::digest::Digest;
use self::crypto::sha2::Sha256;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

struct Block {
    id: u32,
    data: String,
    hash: String,
}

impl Block {
    pub fn new() -> Block {
        let id = 0;

        Block {
            id,
            data: "test".to_string(),
            hash: "".to_string(),
        }
    }

    pub fn mine(&mut self) {
        let mut hasher = Sha256::new();
        let message = format!("{}{}", self.id, self.data);

        hasher.input_str(&message);
        let hex = hasher.result_str();
        self.hash = hex;
    }
}

fn main() {
    let mut block: Block = Block::new();
    block.mine();
    println!("{}", block.hash);
}
