package main 

import(
	"os"
    "fmt"
	"time"
	"net/http"
    // "log"

	"gorm.io/gorm"
	"gorm.io/driver/postgres"
    "github.com/joho/godotenv"
    "github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"github.com/gin-contrib/cors"
	"github.com/golang-jwt/jwt/v5"
)

type User struct {
	gorm.Model
	Username string `gorm:"unique"`
	Password string
}

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
	
	DB.AutoMigrate(&User{})
}

func main(){
    r := gin.Default()
	r.Use(cors.Default())
 	r.Run()
	r.POST("/register", register)
	r.POST("/login",login)
	r.GET("/validate",authentication_mw, validate)
	r.Run()
}

func login(c *gin.Context){
	var body struct {
		Username string
		Password string
	}
	if c.Bind(&body) != nil{
		fmt.Println("Cannot bind the data");
		return
	}
	
	var user User
	DB.First(&user, "Username = ?", body.Username)
	if user.ID == 0{
		fmt.Println("Username or password is incorrect");
		return;
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password),[]byte(body.Password))
	if err!=nil{
		fmt.Println("Error in Encryption")
		return;
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})
	
	tokenString, err := token.SignedString([]byte(os.Getenv("hashcode")))
	if err!=nil{
		fmt.Println("Token creation failed")
		return;
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("authorization",tokenString,3600*24*30,"","",false,true);

	c.JSON(http.StatusOK,gin.H{
		"token":tokenString,
	})
}

func register(c *gin.Context){
	var body struct {
		Username string
		Password string
	}
	if c.Bind(&body) != nil{
		fmt.Println("Cannot bind the data");
		return
	}

	hash , error := bcrypt.GenerateFromPassword([]byte(body.Password),10)
	if error != nil{
		fmt.Println("Cannot generate Hash Value");
		return
	}

	user := User{Username:body.Username,Password:string(hash)}
	result := DB.Create(&user)

	if result.Error != nil{
		fmt.Println("Cannot store in the database");
		return
	}
	fmt.Println("Succesfully Inserted")
	c.JSON(http.StatusOK, gin.H{})
}

func validate(c *gin.Context){
	c.JSON(http.StatusOK,gin.H{
		"message" : "Hello World",
	})
}

func authentication_mw(c *gin.Context){

	tokenString,err := c.Cookie()
	fmt.Println("Hello World")
	if err!=nil{
		fmt.Println"It is not good outside"
		return
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
	
		return os.Getenv("hashcode"), nil
	})
	if err != nil {
		log.Fatal(err)
	}
	
	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		if float64(time.Now().Unix()) > claims["exp"].(float64){
			c.AbortWithStatus(http.StatusUnauthorized)
		}
		
		fmt.Println(claims["sub"], claims["exp"])
	} else {
		fmt.Println(err)
	}
	
	
	c.Next()
}