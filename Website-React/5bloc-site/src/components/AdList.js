import React, { Component } from 'react';
import { getWeb3 } from '../js/web3Utils.js';
import { Ad, AdAddress } from '../abis/Ad.js';
import '../css/adlist.css';
import '../css/motion-ui.min.css'
import '../css/foundation-prototype.min.css'
import '../css/import.css'

export default class AdList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adNumber: 0,
      announces: [],
      userAddress: "",
      isLoading: true
    };

    this.handlePutOnSale = this.handlePutOnSale.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleDelete(index) {
    var web3 = await getWeb3();

    web3.eth.defaultAccount = (await web3.eth.getAccounts())[0];
    var adContract = new web3.eth.Contract(Ad.abi, AdAddress);

    var token = await adContract.methods.getAdIdByIndex(index).call();

    await adContract.methods.deleteAd(token).send({
      from: web3.eth.defaultAccount,
      gas: 3000000
    }, (error, result) => {
      if (error) {
        alert(error.message);
      } else {
        console.log(result)
        alert("Ad delete !")
      }
    });

    await this.getAdList();
  }

  async handleBuy(index,adPrice) {
    var web3 = await getWeb3();

    web3.eth.defaultAccount = (await web3.eth.getAccounts())[0];
    var adContract = await new web3.eth.Contract(Ad.abi, AdAddress);

    var token = await adContract.methods.getAdIdByIndex(index).call();
    
    await adContract.methods.buyAd(token).send({
      from: web3.eth.defaultAccount,
      value: web3.utils.toHex(1000000000)
    }, (error, value) => {
      if (error) {
        alert(error.message);
      } else {
        alert("Your ad is on sale!")
      }
    });

  }

  async handlePutOnSale(index) {
    var web3 = await getWeb3();

    web3.eth.defaultAccount = (await web3.eth.getAccounts())[0];
    var adContract = new web3.eth.Contract(Ad.abi, AdAddress);

    var token = await adContract.methods.getAdIdByIndex(index).call();
    
    await adContract.methods.changeOnSaleStatus(token).send({
      from: web3.eth.defaultAccount,
      gas: 3000000
    }, (error, result) => {
      if (error) {
        alert(error.message);
      } else if (result) {
        console.log(result)
        alert("Your ad is on sale!")
      }
    });

    await this.getAdList();
  }

  async getAdList() {
    this.setState({ isLoading: true })
    var web3 = getWeb3();
    var token, i, adInfo;
    var adList = [];

    web3.eth.defaultAccount = (await web3.eth.getAccounts())[0];
    this.setState({ userAddress: web3.eth.defaultAccount })

    var adContract = new web3.eth.Contract(Ad.abi, AdAddress);

    // On récupère le nombre d'annonce
    const totalAd = await adContract.methods.getNumberOfAds().call(async function (error, value) {
      if (error) {
        console.log(error)
      } else {
        console.log("TOTAL :" + value)
      }
    });

    for (var i = 0; i < totalAd; i++) {
      // Récupération du token
      token = await adContract.methods.getAdIdByIndex(i).call();

      adInfo = await adContract.methods.getAdByTokenId(token).call();

      adList.push(adInfo);
    }

    this.setState({ announces: adList });
    this.setState({ isLoading: false })
  }

  async componentWillMount() {
    await this.getAdList();
    this.setState({ isLoading: false })
  }

  render() {
    return (
      <table class="dashboard-table">
        <colgroup>
          <col width="300" />
          <col width="200" />
          <col width="100" />
          <col width="100" />
          <col width="100" />
          <col width="100" />
        </colgroup>
        <thead>
          <tr style={{textAlign : "center"}}>
            <th><a href="#">Name/Address </a></th>
            <th><a href="#">Price</a></th>
            <th><a href="#">On sales</a></th>
            <th><a href="#">Sold</a></th>
            <th><a href="#">Ad Owner</a></th>
            <th><a href="#">Actions</a></th>
          </tr>
        </thead>
        <tbody>
        {!this.state.isLoading ? (
          this.state.announces != undefined &&
          this.state.announces.map((ad, index) => (
              <tr>
                <td>
                  <div class="flex-container align-justify align-top">
                    <div class="flex-child-shrink">
                      <img class="dashboard-table-image" src="https://placehold.it/100x50" />
                    </div>
                    <div class="flex-child-grow">
                      <h6 class="dashboard-table-text">{ad.adName}</h6>
                      <span class="dashboard-table-timestamp">{ad.adAddress}</span>
                    </div>
                  </div>
                </td>
                <td>{ad.adPrice} Wei</td>
                <td class="bold">{ad.adOnSale ? "yes": "no"}</td>
                <td>{ad.adIsSold ? "yes": "no"}</td>
                <td>{this.state.userAddress == ad.adPropertyOwner && 
                        <i class="fa fa-id-badge"/>
                    }
                </td>
                <td>
                  <ul style={{listStyleType: "none"}}>
                    <li>{ this.state.userAddress == ad.adPropertyOwner && (
                      <button className="button button-icon-badge" value={index} onClick={() => {this.handlePutOnSale(index)}}>
                        <i class="fa fa-tag"/>
                        <span class="button-icon-badge-text"> {!ad.adOnSale ? "Put to sell" : "Withdraw from sale"}</span>
                      </button>
                      )}
                    </li>
                    <li>{ this.state.userAddress == ad.adPropertyOwner && (
                        <button className="button button-icon-badge" value={index} onClick={() => {this.handleDelete(index)}}>
                          <i class="fa fa-trash"/>
                          <span class="button-icon-badge-text">Delete</span>
                        </button>
                        )}
                    </li>
                    <li>
                      { this.state.userAddress != ad.adPropertyOwner && ad.adOnSale && 
                      <button className="button button-icon-badge" value={index} onClick={() => {this.handleBuy(index,ad.adPrice)}}>
                          <i class="fab fa-ethereum"/>
                          <span class="button-icon-badge-text">Buy</span>
                      </button>
                      }
                    </li>
                  </ul>
                </td>
              </tr>
          )))
          :
          (
            <tr>
              <td colSpan="5">
              Loading ...
              </td>
            </tr>
          )
        }
        
        </tbody>
        </table>
          )
  }
}
