package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/ClementTeyssa/5BLOCK/Website/router"
)

const port int = 8080

func main() {
	router := router.InitializeRouter()
	log.Fatal(http.ListenAndServe(":"+fmt.Sprint(port), router))
}
