package main

import (
	"log"
	"net/http"
)

const port int = 80

func main() {
	router := InitializeRouter()

	log.Fatal(http.ListenAndServe(":"+string(port), router))
}
