if (typeof window.ethereum !== 'undefined') {
    //login
    console.log('MetaMask is installed!');
    const ethereumButton = document.querySelector('.enableEthereumButton');
    if(!ethereum.isConnected()) {
        ethereumButton.addEventListener('click', () => {
            ethereum.request({ method: 'eth_requestAccounts' });
        });
    } else {
        document.getElementsByClassName("enableEthereumButton").remove();
    }

    //print ETH Adress
    const ethereumButtonShow = document.querySelector('.showEthereumButton');
    const showAccount = document.querySelector('.showAccount');

    ethereumButtonShow.addEventListener('click', () => {
      getAccount();
    });

    async function getAccount() {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      showAccount.innerHTML = account;
    }
} else {
    alert('MetaMask is not installed!');
}