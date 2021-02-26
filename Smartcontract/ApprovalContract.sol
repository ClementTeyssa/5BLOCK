pragma solidity ^0.8.0;

contract ApprovalContract{

    address public sender;
    address payable public receiver;
    address public constant approver = 0x01941AAc796429E1206f94fA5ADD327EeCd0b770;

    function deposit(address payable _receiver) external payable {
        require(msg.value > 0, "Verifiez votre solde");
        sender = msg.sender;
        receiver = _receiver;
    }

    function viewApprover() external pure returns(address){
        return(approver);
    }

    function approve() external{
        require(msg.sender == approver,"La transaction a echoue");
        receiver.transfer(address(this).balance);
    }
}