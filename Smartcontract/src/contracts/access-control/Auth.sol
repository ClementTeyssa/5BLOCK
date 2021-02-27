//SPDX-License-Identifier: UNLICENSED
pragma solidity <=0.8.0;

contract Auth {
    address private administrator;

    constructor() {
        // Make the deployer of the contract the administrator
        administrator = msg.sender;
    }

    function isAdministrator(address user) public view returns (bool) {
        return user == administrator;
    }
}