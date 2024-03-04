package main 

import(
    "fmt"
    // "log"
    "os"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
    "github.com/joho/godotenv"
    "github.com/gin-gonic/gin"
)

var DB *gorm.DB

func init(){
    err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}
	var dberr error
	dsn := os.Getenv("connStr")
	DB, dberr = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if(dberr!=nil){
		fmt.Println(dberr)
	}
    type User struct {
		gorm.Model
		Name string
	}
}

func main(){
    r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Run()
}