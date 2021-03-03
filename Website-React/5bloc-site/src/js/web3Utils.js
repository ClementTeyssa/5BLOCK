function getWeb3() {
  var Web3 = require('web3'); 
  var web3;

  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try { 
        window.ethereum.enable().then(function() {
            // User has allowed account access to DApp...
        });
    } catch(e) {
        // User has denied account access to DApp...
        alert("please log on Metamask")
        return undefined
    }
  }
  // Legacy DApp Browsers 
  else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
  }
  // Non-DApp Browsers
  else {
      alert('You have to install MetaMask !');
      return undefined
  }
  console.log(web3.currentProvider)
  web3.eth.getAccounts(console.log);
  return web3
}

export {getWeb3};