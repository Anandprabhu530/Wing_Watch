package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
    _ "github.com/lib/pq"
)

type images struct {
    ID     string
    ViewURL string
    Bird_Name  string
    Watcher string
    Location string
}

type userreg struct{
    ID string
    UserName string
    Password string
}

type user struct{
    UserName string
    posts
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
    {ID: "2", ViewURL:"test02",Bird_Name: "Pink sparrow", Watcher: "Gerry", Location: "Thar"},
    {ID: "3", ViewURL:"test03",Bird_Name: "Dove", Watcher: "Sarah", Location: "Jerusalam"},
}

func main() {
    connectionString := "xxxx-xxxxx-xxxxx"
    db,err := sql.Open("postgres",connectionString);
    if(err!=nil){
        fmt.Println("Database connection error")
    }
    router := gin.Default()
    router.Static("/assets", "./assets")
    router.GET("/posts", getallposts)
    router.GET("/posts/:id", getPostsbyID)
    router.POST("/posts", postImages)
    router.POST("/login", authorize)
    router.POST("/register", register)
    router.Run("localhost:8080")
    defer db.close();
    
}


func createTable(c *gin.Context){
    //if table does not exists create table and the proceed with the rest.
    var query = "CREATE TABEL IF NOT EXISTS USERS"
}


func register(c *gin.Context){
    //var username = c.username - temp usage
    //var password = c.password - temp usage
    //register with username and password
    var check,error := "SELECT USERNAME FROM USERS WHERE USERNAME=Temp"
    if(error!=nil){
        var query = "INSERT INTO USERS USERNAME, PASSWORD"
        return true
    }else{
        fmt.Println("User Already Exists. Try logging in")
        return false
    }
}

func authorize(c *gin.Context){
    //var username = c.username - temp usage
    //var password = c.password - temp usage
    //if(username exists in database and match password) return true else retunr false;
    var pass,error := "SELECT PASSWORD WHERE USERNAME=temp"
    if(error!=nil){
        fmt.Println("User Does not exits.Try creating New account")
    }
    if(query == password){
        return true
    }
    return false
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

    //Save to local disk at assets folder
    //save the post url inside variable with type POSTS and 
    //upload to Postgres

    file, err := c.FormFile("image")
    if(err!=nil){
        fmt.Println("File not Uploaded")
        return    }
	fmt.Println(file.Filename)
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