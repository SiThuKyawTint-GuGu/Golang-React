package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/go-playground/validator"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

type List struct {
	gorm.Model

	Name     string `gorm:"not null"`
	Pawrent  string
	Phone    int64
	City     string
	Breed    string
	Address  string
	Township string
	Status   string
}

func main() {
	// Database connection string
	dbURI := "host=localhost port=5432 user=postgres dbname=may password='' sslmode=disable"

	// Opening connection to the database
	db, err := gorm.Open("postgres", dbURI)
	if err != nil {
		log.Fatal(err)
	} else {
		fmt.Println("Successfully connected to the database!")
	}

	// Close connection to the database when the main function finishes
	defer db.Close()

	// AutoMigrate will create the "List" table and apply any missing migrations
	db.AutoMigrate(&List{})

	// Create Router
	router := gin.Default()
	validate := validator.New()

	router.POST("/lists", createList(db, validate))
	router.GET("/lists",getAllList(db))
	router.DELETE("/deleteitem",deleteItem(db));
	router.PUT("/updateItem",updateItem(db));

	if err := router.Run(":7100"); err != nil {
		log.Fatal(err)
	}
}

func createList(db *gorm.DB, validate *validator.Validate) func(c *gin.Context) {
	return func(c *gin.Context) {
		// Bind the request body to the List struct
		var list List
		if err := c.ShouldBindJSON(&list); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Validate the Name field separately
		if list.Name == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Name field is required"})
			return
		}

		// Create Data
		if err := db.Create(&list).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Successfully created"})
	}
}

func getAllList(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		var lists [] List

		if err := db.Find(&lists).Error ;err != nil{
			c.JSON(http.StatusBadRequest,gin.H{"error":err.Error()})
			return
		}
		c.JSON(http.StatusOK,gin.H{"list":lists})
	}
}

func deleteItem(db *gorm.DB) func(c *gin.Context){
	return func(c *gin.Context) {
		id := c.Query("id")

		if err:= db.Where("id =?",id).Delete(&List{}).Error ;err != nil{
			c.JSON(http.StatusInternalServerError,gin.H{"error":err.Error()})
		}

		c.JSON(http.StatusOK,gin.H{"message":"successfully delete" + id})	
	}
}

func updateItem(db *gorm.DB) func(c *gin.Context){
	return func(c *gin.Context) {
		var item List

		id := c.Query("id")

		if err := db.First(&item,id).Error ; err!= nil{
		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		   return
		   
		}

		if err:= c.ShouldBindJSON(&item); err != nil{
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if err := db.Model(&List{}).Where("id = ?",id).Update(item).Error ;err!= nil{
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK,gin.H{
			"message" : "Successfully Update",
		})
	}
}