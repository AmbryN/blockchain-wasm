<div align="center">

  <h1><code>Blockchain using Rust and WebAssembly</code></h1>

</div>

## About

A blockchain's block generator using Rust to process the data and WebAssembly/JavaScript to render it in the browser.

## Actual development stage

The simulator allows to visualize a block, change its data and mine it to generate a new hash which is then updated in the UI.

## Next steps

- Allowing to generate hashes that have only a specific pattern (for instance: must start with 0000) using a "nonce" attribute
- Having a chain of multiple blocks dependant on each other using the previous attribute which is used to generate the hash
