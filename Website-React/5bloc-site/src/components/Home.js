import React, { Component } from 'react';
import Web3 from 'web3';
import { Ad } from './../abis/Ad.js';
import '../css/form.css';

var web3

function isMetamaskOK() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try { 
       window.ethereum.enable().then(function() {
           // User has allowed account access to DApp...
       });
    } catch(e) {
       // User has denied account access to DApp...
       alert("please log on Metamask")
       return false
    }
 }
 // Legacy DApp Browsers
 else if (window.web3) {
     web3 = new Web3(window.web3.currentProvider);
 }
 // Non-DApp Browsers
 else {
     alert('You have to install MetaMask !');
     return false
 }
  console.log(web3.currentProvider)
  web3.eth.getAccounts(console.log);
  return true
}

function getWeb3() {
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

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
        announceName : "",
        announceAddress : "",
        announcePrice : 0,
        message: ""
    };

    this.handleAnnounceNameChange = this.handleAnnounceNameChange.bind(this);
    this.handleAnnounceAddressChange = this.handleAnnounceAddressChange.bind(this);
    this.handleAnnouncePriceChange = this.handleAnnouncePriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAnnounceNameChange(event) {
    this.setState({announceName: event.target.value});
  }

  handleAnnounceAddressChange(event) {
    this.setState({announceAddress: event.target.value});
  }

  handleAnnouncePriceChange(event) {
    this.setState({announcePrice: event.target.value});
  }

  handleSubmit(event) {
    this.setState({message : "Créé !"})

    //var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
    var web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/30ff5c0690434edf8f711b82cc2e58d8"));

    //var contractAddress = "0xB2B20b8778C86Cb3F55d8Cb2b531829Cd0399070";
    var contractAddress = "0x805cADa19f0E28a356ACabEd7630168a682e85df"; // Infura

    console.log("Version web3 : " + web3.version)
    var adContract = new web3.eth.Contract(Ad.abi, contractAddress);  
    console.log(Ad)
    const result = adContract.methods.mint(this.state.announceName,this.state.announceAddress,this.state.announcePrice)
                   .send({
                     from : web3.eth.getAccounts()[0],
                     gas: 3000000
                  },
                     async function(error, result) {
                       if (error) {
                         console.log('error: ' + error);
                       }
                       else {
                         console.log('result: ' + JSON.stringify(result));
                         alert("You're new contract is created !" + result)
                       }
                   });

    // const totalSupply = await adContract.methods.getNumberofAds().call()
      
    // alert(totalSupply)

    alert('L announce à été crée : ' + this.state.announceAddress);
    event.preventDefault();
  }

  render () {
    return (
      <div class="callout large primary">
      <form id="create-new-ad" class="form-icons" onSubmit={this.handleSubmit}>
            <h4>Create an add</h4>
          <p>
                {this.state.message}
            </p>
          <div class="input-group">
            <span class="input-group-label">
              <i class="fa fa-user"></i>
            </span>
            <input
              class="input-group-field"
              type="text"
              value={this.state.announceName}
              id="newAnnounceName"
              placeholder="Enter the name of the announce"
              required={true}
              onChange={this.handleAnnounceNameChange}
            />
          </div>
          <div class="input-group">
            <span class="input-group-label">
              <i class="fa fa-envelope"></i>
            </span>
            <input
              class="input-group-field"
              type="text"
              value={this.state.announceAddress}
              id="newAnnounceAddress"
              placeholder="Enter the address of the announce"
              required={true} onChange={this.handleAnnounceAddressChange}
            />
          </div>
          <div class="input-group">
            <span class="input-group-label">
              <i class="fa fa-key"></i>
            </span>
            <input
              class="input-group-field"
              type="text"
              value={this.state.announcePrice}
              id="newAnnouncePrice"
              placeholder="Enter the pourcent of the contract"
              required={true} onChange={this.handleAnnouncePriceChange}
            />
          </div>
          <button type="submit" class="button expanded">
            Create the announce
          </button>
        </form>
      </div>
    );
  }
}

class Adress extends Component {
  constructor(props) {
    super(props);
    this.state = {
        adressETH : ""
    };

  }
  account = web3.eth.getAccounts().then(function(result){this.state.adressETH = result[0];}) //FIXME: Afficher adresse ETH après chargement  
  web3 = getWeb3();
  render () { 
    
    return (
      <div>
      <div class="callout large primary">
        <h4>Your ETH Adress is {this.state.adressETH}</h4>
      </div>
      <h2 class="type-sidelines"></h2>
      </div>
    );
    }
}

export default class Home extends Component {
  render() {    
    return (
      <div>
      { isMetamaskOK() && <Adress/>}
      <Form/>
      </div>
    );
  }
}

