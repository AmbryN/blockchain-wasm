<div align="center">

  <h1><code>Blockchain using Rust and WebAssembly</code></h1>

</div>

## About

A blockchain's block visualisation tool.  
It is using **Rust** to do the heavy calculations (hashing and pattern matching) and **WebAssembly - JS** to render the result in the browser.

## Actual development stage

The simulator allows to visualize a block, change its data and mine it to generate a new hash which is then updated in the UI.  
It allows the user to set a specific start pattern for the hash (must start with 1 to 5 differents hexadecimal characters, for instance **0af34**) and increments a "nonce" until the corresponding hash is found

## Next steps

- Having a chain of multiple blocks dependant on each other using the previous attribute which is used to generate the hash
