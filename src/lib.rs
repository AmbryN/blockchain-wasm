mod utils;
extern crate data_encoding;
extern crate ring;

use data_encoding::HEXLOWER;
use ring::digest::{digest, SHA256};
use utils::set_panic_hook;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub struct Block {
    id: u32,
    data: String,
    hash: String,
}

#[wasm_bindgen]
impl Block {
    pub fn new() -> Block {
        let id = 0;

        Block {
            id,
            data: "test".to_string(),
            hash: "".to_string(),
        }
    }

    pub fn set_id(&mut self, id: u32) {
        self.id = id;
    }

    pub fn get_id(&self) -> u32 {
        self.id
    }

    pub fn set_data(&mut self, data: String) {
        self.data = data;
    }

    pub fn get_data(&self) -> String {
        let data = self.data.clone();
        data
    }

    pub fn get_hash(&self) -> String {
        let hash = self.hash.clone();
        hash
    }

    pub fn mine(&mut self) {
        let message = format!("{}{}", self.id, self.data);
        let digest = digest(&SHA256, &message.as_bytes());
        self.hash = HEXLOWER.encode(digest.as_ref());
    }
}

#[wasm_bindgen]
pub fn init_panic_hook() {
    set_panic_hook();
}
