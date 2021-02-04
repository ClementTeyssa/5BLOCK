package router

import (
	"github.com/ClementTeyssa/5BLOCK/Website/controllers"
	"github.com/gorilla/mux"
)

//InitializeRouter initialize all routes and return router
func InitializeRouter() *mux.Router {
	// StrictSlash is true => redirect /users/ to /users
	router := mux.NewRouter().StrictSlash(true)
	router.Methods("GET").Path("/").Name("Index").HandlerFunc(controllers.Index)
	// router.Methods("GET").Path("/users").Name("Index").HandlerFunc(controllers.UsersIndex)
	// router.Methods("POST").Path("/users").Name("Create").HandlerFunc(controllers.UsersCreate)
	// router.Methods("GET").Path("/users/{id}").Name("Show").HandlerFunc(controllers.UsersShow)
	// router.Methods("PUT").Path("/users/{id}").Name("Update").HandlerFunc(controllers.UsersUpdate)
	// router.Methods("DELETE").Path("/users/{id}").Name("DELETE").HandlerFunc(controllers.UsersDelete)
	return router
}
