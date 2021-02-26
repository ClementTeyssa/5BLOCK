package main

import (
	"fmt"
	"log"
	"math/big"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"

	approvalContract "5BLOCK/Smartcontract/build"
)

func main() {
	client, err := ethclient.Dial("https://mainnet.infura.io/v3/30ff5c0690434edf8f711b82cc2e58d8")
	if err != nil {
		log.Fatal(err)
	}

	address := common.HexToAddress("0xCDDB3123b77Edfef6A0D35CCfB1E1cfc376f8926")
	instance, err := approvalContract.NewApprovalContract(address, client)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("contract is loaded")
	_ = instance
	address2 := common.HexToAddress("0xf54af0421232CdE80124125c23D0c7DF6933Ea18")
	address3 := common.HexToAddress("0xbD89dFEBE2194a2c5a6456E238d713751187CedC")

	depo, err := instance.Deposit(&bind.TransactOpts{
		From:     address2,
		Value:    big.NewInt(1000000000000000000),
		GasPrice: big.NewInt(1000),
		GasLimit: uint64(10000000000),
		Context:  nil,
	}, address3)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("deposit done")
	fmt.Println(depo.To())
}
