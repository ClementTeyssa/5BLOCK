package main

import (
	"log"
	"net/http"

	"github.com/ClementTeyssa/5BLOCK/Website/router"
)

const port int = 80

func main() {
	router := router.InitializeRouter()

	log.Fatal(http.ListenAndServe(":"+string(port), router))
}
