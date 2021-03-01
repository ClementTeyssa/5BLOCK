require('babel-register');
require('babel-polyfill');
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "dismiss leader palace brave alien recipe renew put kiss dinner fiscal nominee";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function() { 
       return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/30ff5c0690434edf8f711b82cc2e58d8");
      },
      network_id: 4,
      gas: 10000000,	// <-- Use this high gas value
      gasPrice: 0x01,
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version : "v0.7.2",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  
}
