//SPDX-License-Identifier: UNLICENSED
pragma solidity <=0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./access-control/Auth.sol";

contract Ad is ERC721, ERC721Burnable, Ownable {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  mapping(uint256 => myAd) public ads;

  uint8 commissionPercentage = 10;

  struct myAd {
    address payable adCreator;
    string adName;
    string adAddress;
    uint256 adPrice;
    bool adOnSale;
    bool adIsSold;
    address adBuyer;
    address adPropertyOwner;
    string[] adImages;
  }

  constructor() ERC721("Ad", "AD") {
  }

  //ad creation
  function mint(string memory _adName, string memory _adAddress, uint256 _adPrice) external {
    _tokenIds.increment();
    uint256 newNftTokenId = _tokenIds.current();

    myAd memory _ad = myAd({ 
      adCreator: payable(msg.sender),
      adName: _adName,
      adAddress: _adAddress,
      adPrice: _adPrice,
      adOnSale: false,
      adIsSold: false,
      adBuyer: address(0),
      adPropertyOwner: msg.sender,
      adImages: new string[](0)
      });

    ads[newNftTokenId] = _ad;

    _mint(msg.sender, newNftTokenId);
  }

  function adImageToAd(uint256 _ad, string memory _imageLink) external {
    require(msg.sender == ownerOf(_ad), "You must be the owner of the ad");
    ads[_ad].adImages.push(_imageLink);
  }

  //ad update to change any of his component
  function updateAd(uint256 _ad, string memory _adName, string memory _adAddress, uint256 _adPrice) external {
    require(msg.sender == ownerOf(_ad), "You must be the owner of the ad");
    ads[_ad].adName = _adName;
    ads[_ad].adAddress = _adAddress;
    ads[_ad].adPrice = _adPrice;
  }

  //"buying" the ad (performed when someone purchase)
  function buyAd(uint256 _ad) external payable {
    require(msg.sender != ownerOf(_ad), "You cannot purchase your own ad");
    require(msg.value == ads[_ad].adPrice, "You must give exact ammount of wei/eth");
    require(ads[_ad].adCreator.send(msg.value-(msg.value/commissionPercentage)));
    require(payable(address(this)).send(msg.value/commissionPercentage));
    ads[_ad].adBuyer = msg.sender;
    ads[_ad].adPropertyOwner = msg.sender;
    ads[_ad].adOnSale = false;
    ads[_ad].adIsSold = true;
    safeTransferFrom(ownerOf(_ad), msg.sender, _ad);
  }

  //changing "onSale" status of an ad
  function changeOnSaleStatus(uint256 _ad) external {
    require(msg.sender == ownerOf(_ad), "You must be the owner of the ad");
    require(ads[_ad].adIsSold == false, "Cannot change onSale status of a sold ad");
    ads[_ad].adOnSale = !ads[_ad].adOnSale;
  }

  //changing the comission took by the owner of the smart contract
  function changeComissionPercentage(uint8 _commissionPercentage) external onlyOwner {
    require(_commissionPercentage >= 0 && _commissionPercentage <= 100, "Commission percentage must be between 0 and 100");
    commissionPercentage = _commissionPercentage;
  }

  //deleting an ad
  function deleteAd(uint256 _ad) external {
    require(msg.sender == ownerOf(_ad), "You must be the owner of the ad");
    burn(_ad);
    delete(ads[_ad]);
  }

  function changeTokenOwnership(address _from, address _to, uint256 _tokenId) external payable {
    require(_from == ownerOf(_tokenId) && (msg.sender == _from || msg.sender == _to), "One of the two adresses must be the sender");
    safeTransferFrom(_from, _to, _tokenId);
  }

  function getNumberofAds() external view returns (uint256) {
    return totalSupply();
  }

  function getAdsOfOwnerByIndex(address _owner, uint256 _index) external view returns (uint256 tokenId) {
    return tokenOfOwnerByIndex(_owner, _index);
  }

  function getAdIdByIndex(uint256 _index) external view returns (uint256) {
    return tokenByIndex(_index);
  }

  function getAdByTokenId(uint256 _tokenId) external view returns (myAd memory) {
    return ads[_tokenId];
  }

}