import React, { Component } from 'react';
import Web3 from 'web3';
import { Ad } from './../abis/Ad.js';
import { Transaction } from 'ethereumjs-tx';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        announceName : "",
        announceAddress : "",
        announcePrice : 0,
        message: "",
        announcesNumber: 0
    };

    this.handleAnnounceNameChange = this.handleAnnounceNameChange.bind(this);
    this.handleAnnounceAddressChange = this.handleAnnounceAddressChange.bind(this);
    this.handleAnnouncePriceChange = this.handleAnnouncePriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentidMount() {
    var web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/30ff5c0690434edf8f711b82cc2e58d8"));

    //var contractAddress = "0xB2B20b8778C86Cb3F55d8Cb2b531829Cd0399070";
    //var contractAddress = "0x805cADa19f0E28a356ACabEd7630168a682e85df"; // Infura
    var contractAddress = "0x60f072afc7765578f7580720429dab669c5062b7"; // Infura

    const account1 = "0xbD89dFEBE2194a2c5a6456E238d713751187CedC";
    web3.eth.defaultAccount = account1;

    var adContract = new web3.eth.Contract(Ad.abi, contractAddress);  

    const totalSupply = await adContract.methods.getNumberofAds().call(async function(error, value) {
      if(error){
        console.log(error)
      }else{
        console.log("TOTAL :" + value)
        this.setState({announcesNumber: value})
      }
    });
    console.log("Total supp :" + totalSupply)
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

  async handleSubmit(event) {
    event.preventDefault();

    //var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
    var web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/30ff5c0690434edf8f711b82cc2e58d8"));

    //var contractAddress = "0xB2B20b8778C86Cb3F55d8Cb2b531829Cd0399070";
    //var contractAddress = "0x805cADa19f0E28a356ACabEd7630168a682e85df"; // Infura
    var contractAddress = "0x60f072afc7765578f7580720429dab669c5062b7"; //contract 

    const account1 = "0xbD89dFEBE2194a2c5a6456E238d713751187CedC";
    web3.eth.defaultAccount = account1;

    //private address
    const privateKey1 = Buffer.from('e2eea45462134354a5718e9f37b74cdc6917232de3f15b6fe78a5c8534e115f9', 'hex');
    console.log(privateKey1)

    var adContract = new web3.eth.Contract(Ad.abi, contractAddress);  

    const myAdMint = adContract.methods.mint(this.state.announceName,this.state.announceAddress,this.state.announcePrice).encodeABI();

    web3.eth.getTransactionCount(account1, (err, txCount) => {
      // Build the transaction
      if(err){
        console.log("Erreur transac :" +err)
      }
        const txObject = {
          nonce:    web3.utils.toHex(txCount),
          to:       contractAddress,
          value:    web3.utils.toHex(web3.utils.toWei('0', 'ether')),
          gasLimit: web3.utils.toHex(2100000),
          gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
          data: myAdMint  
        }
          // Sign the transaction
          const EthereumTx  = require('ethereumjs-tx').Transaction;
          const tx = new EthereumTx(txObject,{'chain':'rinkeby'});
          
          tx.sign(privateKey1);
      
          const serializedTx = tx.serialize();
          const raw = '0x' + serializedTx.toString('hex');
      
          // Broadcast the transaction
          const transaction = web3.eth.sendSignedTransaction(raw, (err, tx) => {
              if(err){
                console.log("Error :" + err)
              } else{
                console.log(tx)
              }
          });

          console.log(transaction)
      });

    // var adContract = new web3.eth.Contract(Ad.abi, contractAddress);  
    // console.log(Ad)
    // const result = adContract.methods.mint(this.state.announceName,this.state.announceAddress,this.state.announcePrice)
    //                .send({
    //                  from : "0x01941AAc796429E1206f94fA5ADD327EeCd0b770", // TODO: A changer avec l'addresse metamask
    //                  gas: 3000000
    //               },
    //                  async function(error, result) {
    //                    if (error) {
    //                      console.log('error: ' + error);
    //                    }
    //                    else {
    //                      console.log('result: ' + JSON.stringify(result));
    //                      alert("You're new contract is created !" + result)
    //                    }
    //                });

    //this.setState({announcesNumber: () => await adContract.methods.getNumberofAds().call()});
       const totalSupply = await adContract.methods.getNumberofAds().call();

      this.setState({announcesNumber: "Votre annonce #" + totalSupply+ " \"" + this.state.announceName +"\" a bien été crée. \n "})
    console.log("Total supp :" + totalSupply)
    alert('L announce à été crée : ' + this.state.announceAddress);
  }
  
  render() {
    return (
        <form onSubmit={this.handleSubmit}>
            <p>
                {this.state.message}
                {this.state.announcesNumber}
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