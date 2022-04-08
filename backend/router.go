package main

import (
    "log"
    "net/http"

	"github.com/gorilla/mux"
)

func handleRequests() {
	r := mux.NewRouter()

	r.HandleFunc("/", homePage).Methods("GET")
	r.HandleFunc("/articles", returnAllArticles).Methods("GET")
	r.HandleFunc("/user", createUser).Methods("POST")
    log.Fatal(http.ListenAndServe(":12000", r))
}