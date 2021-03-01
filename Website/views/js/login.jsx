function trylog() {
  if (typeof window.ethereum !== "undefined") {
    //login
    console.log("MetaMask is installed!");
    const ethereumButton = document.querySelector(".enableEthereumButton");
    if (!ethereum.isConnected()) {
      console.log("MetaMask is not connected!");
      ethereumButton.addEventListener("click", () => {
        ethereum.request({ method: "eth_requestAccounts" });
      });
    } else {
      console.log("MetaMask is connected!");
      // document.querySelector('.enableEthereumButton').remove();
    }

    //print ETH Adress
    const ethereumButtonShow = document.querySelector(".showEthereumButton");
    const showAccount = document.querySelector(".showAccount");

    ethereumButtonShow.addEventListener("click", () => {
      getAccount();
    });

    async function getAccount() {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      showAccount.innerHTML = account;
    }
  } else {
    var parent = document.getElementById("metamask-login");
    var element = document.createElement("h4");
    element.textContent = "MetaMask is not installed !";
    parent.appendChild(element);
  }
}

export class LoginMetamask extends React.Component {
  render() {
    return <div class="callout large primary" id="metamask-login"></div>;
  }
}
