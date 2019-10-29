mod utils;
extern crate data_encoding;
extern crate regex;
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
    nonce: u32,
    data: String,
    hash: String,
}

#[wasm_bindgen]
impl Block {
    pub fn new() -> Block {
        Block {
            id: 0,
            nonce: 0,
            data: "test".to_string(),
            hash: "".to_string(),
        }
    }

    fn set_id(&mut self, id: u32) {
        self.id = id;
    }

    pub fn get_id(&self) -> u32 {
        self.id
    }

    fn set_nonce(&mut self, nonce: u32) {
        self.nonce = nonce;
    }

    pub fn get_nonce(&self) -> u32 {
        self.nonce
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

    /* Mines a block until the hash starts
    with the defined pattern (max. 5 characters)
    and sets its new hash
    If the pattern isn't valid, calculates the hash
    with a nonce equal to 0*/
    pub fn mine(&mut self, pattern: String) {
        use regex::Regex;
        self.set_nonce(0);
        let mut message = self.generate_message();
        let mut hash = Block::hash(&message);

        if Block::pattern_is_valid(&pattern) {
            let regex = Regex::new(&format!("^{}", &pattern)).unwrap();

            while !regex.is_match(&hash) {
                self.set_nonce(self.nonce + 1);
                message = self.generate_message();
                hash = Block::hash(&message);
            }
        }
        self.hash = hash;
    }

    // Concatenates id, nonce and data
    fn generate_message(&self) -> String {
        format!("{}{}{}", self.id, self.nonce, self.data)
    }

    // Hash function that generates the SHA256 of a message
    fn hash(message: &String) -> String {
        let digest = digest(&SHA256, &message.as_bytes());
        HEXLOWER.encode(digest.as_ref())
    }

    /* Validates the pattern given by the user
    Only valid if uses 1 to 5 hexadecimal characters */
    fn pattern_is_valid(pattern: &String) -> bool {
        use regex::Regex;

        let regex = Regex::new(r"^[a-f0-9]{1,5}$").unwrap();
        if regex.is_match(&pattern) {
            true
        } else {
            false
        }
    }
}

#[wasm_bindgen]
pub fn init_panic_hook() {
    set_panic_hook();
}
