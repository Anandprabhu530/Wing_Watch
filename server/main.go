package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type images struct {
    ID     string  `json:"id"`
    Name  string  `json:"Name"`
    Watcher string  `json:"Watcher"`
    Location  string `json:"location"`
}

type posts struct{
    ID string `json:"id"`
    Wings string `json:"Wings"`
    Location string `json:"Location"`
    Interactions string `json:"Interactions"`
}

var Images = []images{
    {ID: "1", Name: "Sparrow", Watcher: "John", Location:"Peru"},
    {ID: "2", Name: "Pink sparrow", Watcher: "Gerry", Location: "Thar"},
    {ID: "3", Name: "Dove", Watcher: "Sarah", Location: "Jerusalam"},
}

func main() {
    router := gin.Default()
    router.GET("/posts", getallposts)
    router.GET("/posts/:id", getPostsbyID)
    router.POST("/posts", postImages)
    router.Run("localhost:8080")
}

func getallposts(c *gin.Context){
    c.IndentedJSON(http.StatusOK, Images)
}

func postImages(c *gin.Context) {
    var newPost images
    if err := c.BindJSON(&newPost); err != nil {
        return
    }
    Images = append(Images, newPost)
    c.IndentedJSON(http.StatusCreated, newPost)
}

func getPostsbyID(c *gin.Context) {
    id := c.Param("id")
    for _, a := range Images {
        if a.ID == id {
            c.IndentedJSON(http.StatusOK, a)
            return
        }
    }
    c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Image not found"})
}