package main

import (
	"fmt"
	"log"
	"math/big"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
)

func main() {
	client, err := ethclient.Dial("https://rinkeby.infura.io/v3/30ff5c0690434edf8f711b82cc2e58d8")
	if err != nil {
		log.Fatal(err)
	}

	contractAddress := common.HexToAddress("0x4Cd593d1271CAa88991A7BF3bee27844c1415B21")
	instance, err := approvalContract.NewApprovalContract(contractAddress, client)
	if err != nil {
		log.Fatal(err)
	}

	privateKey, err := crypto.HexToECDSA("e2eea45462134354a5718e9f37b74cdc6917232de3f15b6fe78a5c8534e115f9")
	if err != nil {
		log.Fatal(err)
	}

	auth := bind.NewKeyedTransactor(privateKey)
	auth.Value = big.NewInt(10000000000000000) // in wei

	fmt.Println("contract is loaded")
	_ = instance
	addressC := common.HexToAddress("0xf54af0421232CdE80124125c23D0c7DF6933Ea18")
	//addressR := common.HexToAddress("0xbD89dFEBE2194a2c5a6456E238d713751187CedC")

	depo, err := instance.Deposit(auth, addressC)

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("deposit done")
	fmt.Println(depo)

	auth.GasPrice = big.NewInt(10000000000)
	auth.GasLimit = uint64(3000000)
	app, err := instance.Approve(auth)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(app)
}
