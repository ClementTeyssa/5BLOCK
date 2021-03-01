import React, { Component } from 'react';
import Web3 from 'web3';
import { Ad } from './../abis/Ad.js';



export default class Home extends Component {
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
                     from : "0x01941AAc796429E1206f94fA5ADD327EeCd0b770", // TODO: A changer avec l'addresse metamask
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
  
  render() {
    return (
        <form onSubmit={this.handleSubmit}>
            <p>
                {this.state.message}
            </p>
            <input type="text" value={this.state.announceName} placeholder="Enter the name of the announce" required={true}
                onChange={this.handleAnnounceNameChange}
            />
            <input type="text" value={this.state.announceAddress}   placeholder="Enter the address of the announce" required={true} onChange={this.handleAnnounceAddressChange}/>
            <input type="number" value={this.state.announcePrice} placeholder="Enter the pourcent of the contract" required={true} onChange={this.handleAnnouncePriceChange}/>
            <button type="submit">Create the announce</button>
        </form>
    );
  }
}
