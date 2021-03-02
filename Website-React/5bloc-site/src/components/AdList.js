import React, { Component } from 'react';
import Web3 from 'web3';
import { Ad } from './../abis/Ad.js';

export default class AdList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        adNumber : 0,
        announces : []
    };
  }

  async componentWillMount(){
    var web3 = await new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/30ff5c0690434edf8f711b82cc2e58d8"));

    var contractAddress = "0x805cADa19f0E28a356ACabEd7630168a682e85df"; // Infura

    const account1 = "0xbD89dFEBE2194a2c5a6456E238d713751187CedC";
    web3.eth.defaultAccount = account1;

    var adContract = new web3.eth.Contract(Ad.abi, contractAddress);  

    const totalSupply = await adContract.methods.getNumberofAds().call();

    this.setState({adNumber : totalSupply});

    var adList = [];
    var i;
    
    const privateKey1 = Buffer.from('e2eea45462134354a5718e9f37b74cdc6917232de3f15b6fe78a5c8534e115f9', 'hex');

    const transaction = await adContract.methods.getAdIdByIndex(1).call({gas: 30000000000});

    //var transaction = await adContract.methods.getAdIdByIndex(1).call();

  
            console.log("Test " + transaction)
    //console.log(info)

    // for (i = 1; i < totalSupply; i++) { 
    //      adList.push(await adContract.methods.getAdIdByIndex(i).call(function(error,value){
    //          console.log(error)
    //      }));
    // }
    
    // this.setState({announces: adList});
    // console.log(adList)
}

  render() {
    return (
        
        <div class="work-feature-block row">
            <p>
                {this.state.adNumber}
            </p>
        <div class="columns medium-7">
          <img class="work-feature-block-image" src="https://placehold.it/600x400"/>
        </div>
        <div class="columns medium-5">
          <h2 class="work-feature-block-header">Project Description</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sodales diam ac hendrerit aliquet. Phasellus pretium libero vel molestie maximus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis est quam. Aenean blandit a urna laoreet tincidunt.</p>
          <h2>Project Details</h2>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </div>
      </div>
    );
  }
}
