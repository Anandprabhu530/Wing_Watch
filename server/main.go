package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type images struct {
    ID     string
    ViewURL string
    Bird_Name  string
    Watcher string
    Location string
}

type posts struct{
    ID string
    Likes int
    Location string
    Interactions []string
    Url string
}

var Images = []images{
    {ID: "1", ViewURL:"test01",Bird_Name: "Sparrow", Watcher: "John", Location:"Peru"},
    {ID: "2", ViewURL:"test01",Bird_Name: "Pink sparrow", Watcher: "Gerry", Location: "Thar"},
    {ID: "3", ViewURL:"test01",Bird_Name: "Dove", Watcher: "Sarah", Location: "Jerusalam"},
}

func main() {
    connectionString := "xxxx-xxxxx-xxxxx"
    router := gin.Default()
    router.Static("/assets", "./assets")
    router.GET("/posts", getallposts)
    router.GET("/posts/:id", getPostsbyID)
    router.POST("/posts", postImages)
    router.Run("localhost:8080")
    
}

func getallposts(c *gin.Context){
    c.IndentedJSON(http.StatusOK, Images)
}

func postImages(c *gin.Context) {
    var data struct {
    Location string
    }
    if err := c.BindJSON(&data); err != nil {
        fmt.Println(err)
    }
    Id := uuid.New()

    //upload to Firebase and get the hosted url.
    //then save the post url inside variable with type POSTS and 
    //upload to Postgres

    file, _ := c.FormFile("image")
	log.Println(file.Filename)
	c.SaveUploadedFile(file, dst)
    c.String(http.StatusOK, fmt.Sprintf("'%s' uploaded!", file.Filename))
    fmt.Println("Id:", Id, "Location:", data.Location,"Wings:",0)
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