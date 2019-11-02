<div align="center">

  <h1><code>Blockchain using Rust and WebAssembly</code></h1>

</div>

## About

A blockchain's block visualisation tool.  
It is using **Rust** to do the heavy calculations (hashing and pattern matching) and **WebAssembly - JS** to render the result in the browser.

## Actual development stage

The simulator allows to visualize a block, change its data and mine it to generate a new hash which is then updated in the UI.  
It allows the user to set a specific start pattern for the hash (must start with 1 to 5 differents hexadecimal characters, for instance **0af34**) and increments a "nonce" until the corresponding hash is found.

The UI displays a chain of two blocks : when the data inside the first block changes, its hash changes, which makes it and the following block invalid (the blocks turn to red).  
In order to get a valid chain, the user needs to mine each block in order until each hash starts with the correct pattern (the blocks turn to green).
