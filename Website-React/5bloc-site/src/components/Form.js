import React, { Component } from 'react';
import Web3 from 'web3';
import { Ad, AdAddress } from './../abis/Ad.js';
import { Transaction } from 'ethereumjs-tx';
import '../css/form.css';
import { getWeb3 } from '../js/web3Utils.js';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            announceName: "",
            announceAddress: "",
            announcePrice: 0,
            message: "",
            announcesNumber: 0
        };

        this.handleAnnounceNameChange = this.handleAnnounceNameChange.bind(this);
        this.handleAnnounceAddressChange = this.handleAnnounceAddressChange.bind(this);
        this.handleAnnouncePriceChange = this.handleAnnouncePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        var web3 = getWeb3();

        web3.eth.defaultAccount = web3.eth.getAccounts()[0];

        var adContract = new web3.eth.Contract(Ad.abi, AdAddress);

        const totalSupply = await adContract.methods.getNumberOfAds().call(async function (error, value) {
            if (error) {
                console.log(error)
            } else {
                console.log("TOTAL :" + value)
            }
        });

        this.setState({announcesNumber: totalSupply})
    }

    handleAnnounceNameChange(event) {
        this.setState({ announceName: event.target.value });
    }

    handleAnnounceAddressChange(event) {
        this.setState({ announceAddress: event.target.value });
    }

    handleAnnouncePriceChange(event) {
        this.setState({ announcePrice: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();

        var web3 = await getWeb3();

        web3.eth.defaultAccount = (await web3.eth.getAccounts())[0]; //Compte Metamask

        var adContract = new web3.eth.Contract(Ad.abi, AdAddress);

        const myAdMint = await adContract.methods.mint(this.state.announceName, this.state.announceAddress, this.state.announcePrice)   
                           .send({
                              from : web3.eth.defaultAccount,
                              gas: 3000000
                           },
                              async (error, result) => {
                                if (error) {
                                    console.log("Error :" + error)
                                    this.setState({ message: "Error while posting the ad :\"" + error.message +"\""});
                                } else {
                                    const totalSupply = await adContract.methods.getNumberOfAds().call();
                                    this.setState({message: "Your ad #" + totalSupply + " \"" + this.state.announceName + "\" has been published." })
                                    this.setState({announcesNumber: totalSupply})
                                }
                            });
    }

    render() {
        return (
            <div className="callout large primary">
                <form id="create-new-ad" className="form-icons" onSubmit={this.handleSubmit}>
                    <h4>Create an ad</h4>
                    <p>
                        {this.state.message}
                        <br/>
                        {this.state.announcesNumber} ads published!
                    </p>
                    <div className="input-group">
                        <span className="input-group-label">
                            <i className="fa fa-user"></i>
                        </span>
                        <input
                            className="input-group-field"
                            type="text"
                            value={this.state.announceName}
                            id="newAnnounceName"
                            placeholder="Enter the name of the announce"
                            required={true}
                            onChange={this.handleAnnounceNameChange}
                        />
                    </div>
                    <div className="input-group">
                        <span className="input-group-label">
                            <i className="fa fa-envelope"></i>
                        </span>
                        <input
                            className="input-group-field"
                            type="text"
                            value={this.state.announceAddress}
                            id="newAnnounceAddress"
                            placeholder="Enter the address of the announce"
                            required={true} onChange={this.handleAnnounceAddressChange}
                        />
                    </div>
                    <div className="input-group">
                        <span className="input-group-label">
                            <i className="fa fa-key"></i>
                        </span>
                        <input
                            className="input-group-field"
                            type="number"
                            value={this.state.announcePrice}
                            id="newAnnouncePrice"
                            placeholder="Enter the pourcent of the contract"
                            required={true} onChange={this.handleAnnouncePriceChange}
                        />
                    </div>
                    <button type="submit" className="button expanded">
                        Create the announce
          </button>
                </form>
            </div>
        );
    }
}