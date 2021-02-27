// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package approvalContract

import (
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// Reference imports to suppress errors if they are not otherwise used.
var (
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
)

// ApprovalContractABI is the input ABI used to generate the binding from.
const ApprovalContractABI = "[{\"inputs\":[],\"name\":\"approve\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"approver\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"addresspayable\",\"name\":\"_receiver\",\"type\":\"address\"}],\"name\":\"deposit\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"receiver\",\"outputs\":[{\"internalType\":\"addresspayable\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"sender\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"viewApprover\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"pure\",\"type\":\"function\"}]"

// ApprovalContractBin is the compiled bytecode used for deploying new contracts.
var ApprovalContractBin = "0x60806040523480156100115760006000fd5b50610017565b610590806100266000396000f3fe6080604052600436106100595760003560e01c806312424e3f1461005f578063141a8dd81461007757806367e404ce146100a3578063d93ce89c146100cf578063f340fa01146100fb578063f7260d3e1461011757610059565b60006000fd5b34801561006c5760006000fd5b50610075610143565b005b3480156100845760006000fd5b5061008d610234565b60405161009a919061046b565b60405180910390f35b3480156100b05760006000fd5b506100b961024c565b6040516100c6919061046b565b60405180910390f35b3480156100dc5760006000fd5b506100e5610272565b6040516100f2919061046b565b60405180910390f35b6101156004803603810190610110919061039e565b610293565b005b3480156101245760006000fd5b5061012d61035e565b60405161013a9190610487565b60405180910390f35b7301941aac796429e1206f94fa5add327eecd0b77073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156101c7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101be906104a3565b60405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f19350505050158015610230573d600060003e3d6000fd5b505b565b7301941aac796429e1206f94fa5add327eecd0b77081565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60007301941aac796429e1206f94fa5add327eecd0b7709050610290565b90565b6000341115156102d8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102cf906104c4565b60405180910390fd5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156610559565b6000813590506103978161053e565b5b92915050565b6000602082840312156103b15760006000fd5b60006103bf84828501610388565b9150505b92915050565b6103d28161050a565b82525b5050565b6103e2816104f7565b82525b5050565b60006103f66017836104e5565b91507f4c61207472616e73616374696f6e2061206563686f756500000000000000000060008301526020820190505b919050565b60006104376014836104e5565b91507f566572696669657a20766f74726520736f6c646500000000000000000000000060008301526020820190505b919050565b600060208201905061048060008301846103d9565b5b92915050565b600060208201905061049c60008301846103c9565b5b92915050565b600060208201905081810360008301526104bc816103e9565b90505b919050565b600060208201905081810360008301526104dd8161042a565b90505b919050565b60008282526020820190505b92915050565b60006105028261051d565b90505b919050565b60006105158261051d565b90505b919050565b600073ffffffffffffffffffffffffffffffffffffffff821690505b919050565b6105478161050a565b811415156105555760006000fd5b5b50565bfea2646970667358221220c73f7fab5a38476cab45ccfdd11e54764f92f9397bd43cd8377cda85978a581864736f6c63430008000033"

// DeployApprovalContract deploys a new Ethereum contract, binding an instance of ApprovalContract to it.
func DeployApprovalContract(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *ApprovalContract, error) {
	parsed, err := abi.JSON(strings.NewReader(ApprovalContractABI))
	if err != nil {
		return common.Address{}, nil, nil, err
	}

	address, tx, contract, err := bind.DeployContract(auth, parsed, common.FromHex(ApprovalContractBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &ApprovalContract{ApprovalContractCaller: ApprovalContractCaller{contract: contract}, ApprovalContractTransactor: ApprovalContractTransactor{contract: contract}, ApprovalContractFilterer: ApprovalContractFilterer{contract: contract}}, nil
}

// ApprovalContract is an auto generated Go binding around an Ethereum contract.
type ApprovalContract struct {
	ApprovalContractCaller     // Read-only binding to the contract
	ApprovalContractTransactor // Write-only binding to the contract
	ApprovalContractFilterer   // Log filterer for contract events
}

// ApprovalContractCaller is an auto generated read-only Go binding around an Ethereum contract.
type ApprovalContractCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ApprovalContractTransactor is an auto generated write-only Go binding around an Ethereum contract.
type ApprovalContractTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ApprovalContractFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type ApprovalContractFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ApprovalContractSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type ApprovalContractSession struct {
	Contract     *ApprovalContract // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// ApprovalContractCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type ApprovalContractCallerSession struct {
	Contract *ApprovalContractCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts           // Call options to use throughout this session
}

// ApprovalContractTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type ApprovalContractTransactorSession struct {
	Contract     *ApprovalContractTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts           // Transaction auth options to use throughout this session
}

// ApprovalContractRaw is an auto generated low-level Go binding around an Ethereum contract.
type ApprovalContractRaw struct {
	Contract *ApprovalContract // Generic contract binding to access the raw methods on
}

// ApprovalContractCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type ApprovalContractCallerRaw struct {
	Contract *ApprovalContractCaller // Generic read-only contract binding to access the raw methods on
}

// ApprovalContractTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type ApprovalContractTransactorRaw struct {
	Contract *ApprovalContractTransactor // Generic write-only contract binding to access the raw methods on
}

// NewApprovalContract creates a new instance of ApprovalContract, bound to a specific deployed contract.
func NewApprovalContract(address common.Address, backend bind.ContractBackend) (*ApprovalContract, error) {
	contract, err := bindApprovalContract(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &ApprovalContract{ApprovalContractCaller: ApprovalContractCaller{contract: contract}, ApprovalContractTransactor: ApprovalContractTransactor{contract: contract}, ApprovalContractFilterer: ApprovalContractFilterer{contract: contract}}, nil
}

// NewApprovalContractCaller creates a new read-only instance of ApprovalContract, bound to a specific deployed contract.
func NewApprovalContractCaller(address common.Address, caller bind.ContractCaller) (*ApprovalContractCaller, error) {
	contract, err := bindApprovalContract(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &ApprovalContractCaller{contract: contract}, nil
}

// NewApprovalContractTransactor creates a new write-only instance of ApprovalContract, bound to a specific deployed contract.
func NewApprovalContractTransactor(address common.Address, transactor bind.ContractTransactor) (*ApprovalContractTransactor, error) {
	contract, err := bindApprovalContract(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &ApprovalContractTransactor{contract: contract}, nil
}

// NewApprovalContractFilterer creates a new log filterer instance of ApprovalContract, bound to a specific deployed contract.
func NewApprovalContractFilterer(address common.Address, filterer bind.ContractFilterer) (*ApprovalContractFilterer, error) {
	contract, err := bindApprovalContract(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &ApprovalContractFilterer{contract: contract}, nil
}

// bindApprovalContract binds a generic wrapper to an already deployed contract.
func bindApprovalContract(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(ApprovalContractABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_ApprovalContract *ApprovalContractRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _ApprovalContract.Contract.ApprovalContractCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_ApprovalContract *ApprovalContractRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _ApprovalContract.Contract.ApprovalContractTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_ApprovalContract *ApprovalContractRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _ApprovalContract.Contract.ApprovalContractTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_ApprovalContract *ApprovalContractCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _ApprovalContract.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_ApprovalContract *ApprovalContractTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _ApprovalContract.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_ApprovalContract *ApprovalContractTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _ApprovalContract.Contract.contract.Transact(opts, method, params...)
}

// Approver is a free data retrieval call binding the contract method 0x141a8dd8.
//
// Solidity: function approver() view returns(address)
func (_ApprovalContract *ApprovalContractCaller) Approver(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _ApprovalContract.contract.Call(opts, &out, "approver")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Approver is a free data retrieval call binding the contract method 0x141a8dd8.
//
// Solidity: function approver() view returns(address)
func (_ApprovalContract *ApprovalContractSession) Approver() (common.Address, error) {
	return _ApprovalContract.Contract.Approver(&_ApprovalContract.CallOpts)
}

// Approver is a free data retrieval call binding the contract method 0x141a8dd8.
//
// Solidity: function approver() view returns(address)
func (_ApprovalContract *ApprovalContractCallerSession) Approver() (common.Address, error) {
	return _ApprovalContract.Contract.Approver(&_ApprovalContract.CallOpts)
}

// Receiver is a free data retrieval call binding the contract method 0xf7260d3e.
//
// Solidity: function receiver() view returns(address)
func (_ApprovalContract *ApprovalContractCaller) Receiver(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _ApprovalContract.contract.Call(opts, &out, "receiver")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Receiver is a free data retrieval call binding the contract method 0xf7260d3e.
//
// Solidity: function receiver() view returns(address)
func (_ApprovalContract *ApprovalContractSession) Receiver() (common.Address, error) {
	return _ApprovalContract.Contract.Receiver(&_ApprovalContract.CallOpts)
}

// Receiver is a free data retrieval call binding the contract method 0xf7260d3e.
//
// Solidity: function receiver() view returns(address)
func (_ApprovalContract *ApprovalContractCallerSession) Receiver() (common.Address, error) {
	return _ApprovalContract.Contract.Receiver(&_ApprovalContract.CallOpts)
}

// Sender is a free data retrieval call binding the contract method 0x67e404ce.
//
// Solidity: function sender() view returns(address)
func (_ApprovalContract *ApprovalContractCaller) Sender(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _ApprovalContract.contract.Call(opts, &out, "sender")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Sender is a free data retrieval call binding the contract method 0x67e404ce.
//
// Solidity: function sender() view returns(address)
func (_ApprovalContract *ApprovalContractSession) Sender() (common.Address, error) {
	return _ApprovalContract.Contract.Sender(&_ApprovalContract.CallOpts)
}

// Sender is a free data retrieval call binding the contract method 0x67e404ce.
//
// Solidity: function sender() view returns(address)
func (_ApprovalContract *ApprovalContractCallerSession) Sender() (common.Address, error) {
	return _ApprovalContract.Contract.Sender(&_ApprovalContract.CallOpts)
}

// ViewApprover is a free data retrieval call binding the contract method 0xd93ce89c.
//
// Solidity: function viewApprover() pure returns(address)
func (_ApprovalContract *ApprovalContractCaller) ViewApprover(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _ApprovalContract.contract.Call(opts, &out, "viewApprover")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// ViewApprover is a free data retrieval call binding the contract method 0xd93ce89c.
//
// Solidity: function viewApprover() pure returns(address)
func (_ApprovalContract *ApprovalContractSession) ViewApprover() (common.Address, error) {
	return _ApprovalContract.Contract.ViewApprover(&_ApprovalContract.CallOpts)
}

// ViewApprover is a free data retrieval call binding the contract method 0xd93ce89c.
//
// Solidity: function viewApprover() pure returns(address)
func (_ApprovalContract *ApprovalContractCallerSession) ViewApprover() (common.Address, error) {
	return _ApprovalContract.Contract.ViewApprover(&_ApprovalContract.CallOpts)
}

// Approve is a paid mutator transaction binding the contract method 0x12424e3f.
//
// Solidity: function approve() returns()
func (_ApprovalContract *ApprovalContractTransactor) Approve(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _ApprovalContract.contract.Transact(opts, "approve")
}

// Approve is a paid mutator transaction binding the contract method 0x12424e3f.
//
// Solidity: function approve() returns()
func (_ApprovalContract *ApprovalContractSession) Approve() (*types.Transaction, error) {
	return _ApprovalContract.Contract.Approve(&_ApprovalContract.TransactOpts)
}

// Approve is a paid mutator transaction binding the contract method 0x12424e3f.
//
// Solidity: function approve() returns()
func (_ApprovalContract *ApprovalContractTransactorSession) Approve() (*types.Transaction, error) {
	return _ApprovalContract.Contract.Approve(&_ApprovalContract.TransactOpts)
}

// Deposit is a paid mutator transaction binding the contract method 0xf340fa01.
//
// Solidity: function deposit(address _receiver) payable returns()
func (_ApprovalContract *ApprovalContractTransactor) Deposit(opts *bind.TransactOpts, _receiver common.Address) (*types.Transaction, error) {
	return _ApprovalContract.contract.Transact(opts, "deposit", _receiver)
}

// Deposit is a paid mutator transaction binding the contract method 0xf340fa01.
//
// Solidity: function deposit(address _receiver) payable returns()
func (_ApprovalContract *ApprovalContractSession) Deposit(_receiver common.Address) (*types.Transaction, error) {
	return _ApprovalContract.Contract.Deposit(&_ApprovalContract.TransactOpts, _receiver)
}

// Deposit is a paid mutator transaction binding the contract method 0xf340fa01.
//
// Solidity: function deposit(address _receiver) payable returns()
func (_ApprovalContract *ApprovalContractTransactorSession) Deposit(_receiver common.Address) (*types.Transaction, error) {
	return _ApprovalContract.Contract.Deposit(&_ApprovalContract.TransactOpts, _receiver)
}
