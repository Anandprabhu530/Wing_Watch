package main 

import(
	"os"
    "fmt"
	"time"
	"net/http"

	"gorm.io/gorm"
	"github.com/google/uuid"
	"gorm.io/driver/postgres"
    "github.com/joho/godotenv"
    "github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"github.com/gin-contrib/cors"
	"github.com/golang-jwt/jwt/v5"
)

type User struct {
	gorm.Model
	ID string `gorm:"unique"`
	Username string `gorm:"unique"`
	Password string
	Posts []Post `gorm:"many2many:user_languages;"`
}

type Post struct{
	gorm.Model
	url string
	UserID  uint `gorm:"ID"`
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
	r.Static("/assets", "./assets")
	r.POST("/register", register)
	r.POST("/login",login)
	r.GET("/validate",authentication_mw, validate)
	r.POST("/post", func(c *gin.Context) {
		file, _ := c.FormFile("file")
		log.Println(file.Filename)
		c.SaveUploadedFile(file, dst)
		c.String(http.StatusOK, fmt.Sprintf("'%s' uploaded!", file.Filename))
		post(file.Filename)
	r.Run()
}

var main_user_id;

func login(c *gin.Context){
	var body struct {
		ID string
		Username string
		Password string
	}
	if c.Bind(&body) != nil{
		fmt.Println("Cannot bind the data");
		return
	}
	
	var user User
	DB.First(&user, "Username = ?", body.Username)
	if user.ID == ""{
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
	main_user_id = userId
	c.JSON(http.StatusOK,gin.H{
		"data":userId,
	})
}

func register(c *gin.Context){
	var body struct {
		ID string
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
	userId := uuid.New().String()
	user := User{ID:userId,Username:body.Username,Password:string(hash)}
	result := DB.Create(&user)

	if result.Error != nil{
		fmt.Println("Cannot store in the database");
		return
	}
	fmt.Println("Succesfully Inserted")
	main_user_id = userId
	c.JSON(http.StatusOK, gin.H{})
}

func validate(c *gin.Context){
	c.JSON(http.StatusOK,gin.H{
		"data" : userId,
	})
}


func post(c *gin.Context){
	fmt.Println("Inside post new post"
	url := uuid.New().String()
	newpost = Post{url:url,userId:main_user_id}
	result := DB.Create(&newpost)

	if result.error != nil{
		fmt.Println("Cannot insert the post")
		return
	}
	c.JSON(http.StatusOK,gin.H{})
}


func authentication_mw(c *gin.Context){
	tokenString,err := c.Cookie("authorization")
	if err!=nil{
		fmt.Println("It is not good outside")
		return
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
	
		return os.Getenv("hashcode"), nil
	})
	if err != nil {
		fmt.Println(err)
	}
	
	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		if float64(time.Now().Unix()) > claims["exp"].(float64){
			c.AbortWithStatus(http.StatusUnauthorized)
		}
		var user User
		DB.First(&user, claims["sub"])

		if user.ID==""{
			fmt.Println("User does not exists. Try creating new account");
			return
		}
		fmt.Println(claims["sub"], claims["Sub"])

		c.Set("user",user)
	} else {
		fmt.Println(err)
	}
	c.Next()
}