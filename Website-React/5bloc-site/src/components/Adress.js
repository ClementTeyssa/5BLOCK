import React, { Component, useContext } from 'react';
import { getWeb3 } from '../js/web3Utils.js';
import { isMetamaskOK } from '../js/metamaskUtils.js';
import { Ad, AdAddress } from '../abis/Ad.js';

export default class Adress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adressETH: ""
    };

    this.handleWithdrawCommissions = this.handleWithdrawCommissions.bind(this);
  }

  async handleWithdrawCommissions() {
    var web3 = await getWeb3();

    web3.eth.defaultAccount = (await web3.eth.getAccounts())[0];
    var adContract = new web3.eth.Contract(Ad.abi, AdAddress);

    await adContract.methods.withdrawCommissions().send({
      from: web3.eth.defaultAccount,
      gas: 3000000
    }, (error, result) => {
      if (error) {
        alert(error.message);
      } else {
        console.log(result)
      }
    });
  }

  async componentWillMount() {
    const web3 = await getWeb3();
    var accounts = await web3.eth.getAccounts();
    this.setState({ adressETH: accounts[0] })
  }

  render() {
    return (
      <div className="callout large primary">
        { isMetamaskOK() ?
          <div>
            <h2>Your ETH Adress is {this.state.adressETH}</h2>
            <button className="button button-icon-badge" onClick={() => { this.handleWithdrawCommissions() }}>Withdraw commissions</button>
          </div>
          :
          <h2>
            Connect to Metamask for more features
          </h2>
        }
      </div>
    )
  }
}