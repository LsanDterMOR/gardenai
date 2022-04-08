package main

import (
    "fmt"
    "net/http"
    "encoding/json"
    "errors"
    "io"
    "log"
    "strings"

    "github.com/golang/gddo/httputil/header"
)

type User struct {
    Email string
    Password string
    PasswordVerification string
}

func homePage(w http.ResponseWriter, r *http.Request){
    fmt.Fprintf(w, "Welcome to the HomePage!")
    fmt.Println("Endpoint Hit: homePage")
}

// type Article struct {
//     Title string `json:"Title"`
//     Desc string `json:"desc"`
//     Content string `json:"content"`
// }

// var Articles []Article

func returnAllArticles(w http.ResponseWriter, r *http.Request){
    fmt.Println("Endpoint Hit: returnAllArticles")
    // json.NewEncoder(w).Encode(Articles)
}

func createUser(w http.ResponseWriter, r *http.Request) {
    if r.Header.Get("Content-Type") != "" {
        value, _ := header.ParseValueAndParams(r.Header, "Content-Type")
        if value != "application/json" {
            msg := "Content-Type header is not application/json"
            http.Error(w, msg, http.StatusUnsupportedMediaType)
            return
        }
    }
    r.Body = http.MaxBytesReader(w, r.Body, 1048576)
    dec := json.NewDecoder(r.Body)
    dec.DisallowUnknownFields()
    var u User
    err := dec.Decode(&u)
    if err != nil {
        var syntaxError *json.SyntaxError
        var unmarshalTypeError *json.UnmarshalTypeError
        switch {
            case errors.As(err, &syntaxError):
                msg := fmt.Sprintf("Request body contains badly-formed JSON (at position %d)", syntaxError.Offset)
                http.Error(w, msg, http.StatusBadRequest)

            case errors.Is(err, io.ErrUnexpectedEOF):
                msg := fmt.Sprintf("Request body contains badly-formed JSON")
                http.Error(w, msg, http.StatusBadRequest)

            case errors.As(err, &unmarshalTypeError):
                msg := fmt.Sprintf("Request body contains an invalid value for the %q field (at position %d)", unmarshalTypeError.Field, unmarshalTypeError.Offset)
                http.Error(w, msg, http.StatusBadRequest)

            case strings.HasPrefix(err.Error(), "json: unknown field "):
                fieldName := strings.TrimPrefix(err.Error(), "json: unknown field ")
                msg := fmt.Sprintf("Request body contains unknown field %s", fieldName)
                http.Error(w, msg, http.StatusBadRequest)

            case errors.Is(err, io.EOF):
                msg := "Request body must not be empty"
                http.Error(w, msg, http.StatusBadRequest)

            case err.Error() == "http: request body too large":
                msg := "Request body must not be larger than 1MB"
                http.Error(w, msg, http.StatusRequestEntityTooLarge)

            default:
                log.Println(err.Error())
                http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
            return
        }
    }
    err = dec.Decode(&struct{}{})
    if err != io.EOF {
        msg := "Request body must only contain a single JSON object"
        http.Error(w, msg, http.StatusBadRequest)
        return
    }
    fmt.Fprintf(w, "Person: %+v", u)
    fmt.Println("value = %v", err)
}

func main() {
    // Articles = []Article{
    //     Article{Title: "Hello", Desc: "Article Description", Content: "Article Content"},
    //     Article{Title: "Hello 2", Desc: "Article Description2", Content: "Article Content2"},
    // }
    handleRequests()
}