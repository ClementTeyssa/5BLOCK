
function newAdWeb3() {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));

    // Init the contract
    var contractAddress = "0xB2B20b8778C86Cb3F55d8Cb2b531829Cd0399070";
    var adContract = new web3.eth.Contract(Ad.abi, contractAddress);

    $("#create-new-ad").submit(async function () {
      event.preventDefault();
      var newAnnounceName = $("#newAnnounceName").val();
      var newAnnounceAddress = $("#newAnnounceAddress").val();
      var newAnnouncePrice = $("#newAnnouncePrice").val();

      if (newAnnounceName == null || newAnnounceName == "") {
        alert("Not a valid announce name");
        return;
      }

      if (newAnnounceAddress == null || newAnnounceAddress == "") {
        alert("Not a valid announce address");
        return;
      }

      if (newAnnouncePrice < 0) {
        alert("You must enter a positiv announce/'s price");
        retrun;
      }

      const result = await adContract.methods
        .mint(newAnnounceName, newAnnounceAddress, newAnnouncePrice)
        .send(
          {
            from: "0x01941AAc796429E1206f94fA5ADD327EeCd0b770", // TODO: A changer avec l'addresse metamask
            gas: 3000000,
          },
          async function (error, result) {
            if (error) {
              console.log("error: " + error);
            } else {
              console.log("result: " + JSON.stringify(result));
              alert("You're new contract is created !" + result);
            }
          }
        );

      const totalSupply = await adContract.methods.getNumberofAds().call();

      alert(totalSupply);
    });
}
class FormNewAd extends React.Component {
  render() {
    newAdWeb3()
    return (
      <div class="callout large primary">
        <form id="create-new-ad" class="form-icons">
          <h4>Create an add</h4>

          <div class="input-group">
            <span class="input-group-label">
              <i class="fa fa-user"></i>
            </span>
            <input
              class="input-group-field"
              type="text"
              id="newAnnounceName"
              placeholder="Enter the name of the announce"
              required="true"
            />
          </div>
          <div class="input-group">
            <span class="input-group-label">
              <i class="fa fa-envelope"></i>
            </span>
            <input
              class="input-group-field"
              type="text"
              id="newAnnounceAddress"
              placeholder="Enter the address of the announce"
              required="true"
            />
          </div>
          <div class="input-group">
            <span class="input-group-label">
              <i class="fa fa-key"></i>
            </span>
            <input
              class="input-group-field"
              type="text"
              id="newAnnouncePrice"
              placeholder="Enter the pourcent of the contract"
              required="true"
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

ReactDOM.render(<FormNewAd />, document.getElementById("formNewAdd"));
