package main

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Template struct {
	gorm.Model
	Username string `gorm:"unique"`
	Password string
	Posts    []Post `gorm:"foreignKey:User"`
}

type Post struct {
	gorm.Model
	Url  string `gorm:"unique"`
	User uint
}

var DB *gorm.DB

func init() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}
	var dberr error

	dsn := os.Getenv("connStr")

	DB, dberr = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if dberr != nil {
		fmt.Println(dberr)
	}

	DB.AutoMigrate(&Template{}, &Post{})
}

func main() {
	r := gin.Default()
	r.Use(cors.Default())
	r.Static("/assets", "./assets")
	r.POST("/register", register)                   //complete
	r.POST("/login", login)                         //complete
	r.GET("/validate", authentication_mw, validate) //complete
	r.POST("/post", func(c *gin.Context) {
		file, _ := c.FormFile("file")
		fmt.Println(file.Filename)
		c.SaveUploadedFile(file, "assests/upload/"+file.Filename)
		c.String(http.StatusOK, fmt.Sprintf("'%s' uploaded!", file.Filename))
		var body struct {
			ID       string
			Username string
			Password string
		}
		if c.Bind(&body) != nil {
			fmt.Println("Cannot bind the data")
			return
		}
		var user Template
		if err := DB.Where("username = ?", body.Username).First(&user).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}

		imageURL := "assests/upload/" + file.Filename + " " + uuid.New().String()[:5]
		newPost := Post{
			Url:  imageURL,
			User: user.ID,
		}

		result := DB.Create(&newPost)
		if result.Error != nil {
			fmt.Println("Error creating post:", result.Error)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create post"})
			return
		}
		fmt.Println(result)
		fmt.Println("Success")
		c.JSON(http.StatusOK, gin.H{})
	})
	r.DELETE("/delete", func(ctx *gin.Context) {
		DB.Delete(&Template{}, "1=1")
	})
	r.POST("/profile", fetch_profile_data)
	r.Run()
}

func validate(c *gin.Context) {
	user, _ := c.Get("user")
	c.JSON(http.StatusOK, gin.H{
		"data": user,
	})
}

// This is set to User when login or register.
// used for reference for other functions
var Main_user_id string

// login the user -- completed
func login(c *gin.Context) {
	var body struct {
		Username string
		Password string
	}
	if c.Bind(&body) != nil {
		fmt.Println("Cannot bind the data")
		return
	}

	var user Template
	DB.Where("Username = ?", body.Username).Find(&user)
	fmt.Println(user)
	if user.ID <= 0 {
		fmt.Println("User e Not found")
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))
	if err != nil {
		fmt.Println("Wrong Password")
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.Username,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("hashcode")))
	if err != nil {
		fmt.Println("Token creation failed")
		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("authorization", tokenString, 3600*24*30, "", "", false, true)
	Main_user_id = user.Username
	fmt.Printf("type is %+v", user)
	fmt.Println()
	fmt.Println(user)
	c.JSON(http.StatusOK, gin.H{
		"data": user.Username,
	})
}

// register new user -- completed
func register(c *gin.Context) {
	var body struct {
		Username string
		Password string
	}
	if c.Bind(&body) != nil {
		fmt.Println("Cannot bind the data")
		return
	}

	hash, error := bcrypt.GenerateFromPassword([]byte(body.Password), 10)
	if error != nil {
		fmt.Println("Cannot generate Hash Value")
		return
	}
	user_uuid := uuid.New().String()
	user := Template{Username: body.Username, Password: string(hash)}
	// result := DB.Select("userstring", "Username", "Password").Create(&user)
	result := DB.Create(&user)
	if result.Error != nil {
		fmt.Println(result.Error)
		return
	}
	fmt.Printf("user_uuid : %v ,user: %v ", user_uuid, user)
	fmt.Println()
	fmt.Println(result.RowsAffected)
	fmt.Println("Succesfully Inserted")
	Main_user_id = user.Username
	c.JSON(http.StatusOK, gin.H{
		"message": "success",
	})
}

// get the posts for his id
// posts done by him - profile page
func fetch_profile_data(c *gin.Context) {
	var body struct {
		ID       string
		Username string
		Password string
	}
	if c.Bind(&body) != nil {
		fmt.Println("Cannot bind the data")
		return
	}
	var user Template
	if err := DB.Where("username = ?", body.Username).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	var posts []Post
	if err := DB.Model(&user).Association("Posts").Find(&posts); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve posts"})
		return
	}
	fmt.Println(posts)
	c.JSON(http.StatusOK, gin.H{
		"data": "result",
	})
}

// retrieve all posts to show in homepage
// func fetch_for_page(c *gin.Context) {

// 	result := DB.Order("CreatedAt desc").Limit(10).Offset(5).Find(&post)

// 	if result.Error != nil {
// 		fmt.Println(result.Error)
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{
// 		"data": result,
// 	})
// }

// middleware used for authentication
func authentication_mw(c *gin.Context) {
	tokenString, err := c.Cookie("authorization")
	if err != nil {
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
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.AbortWithStatus(http.StatusUnauthorized)
		}
		var user Template
		DB.First(&user, claims["sub"])

		if user.ID <= 0 {
			fmt.Println("User does not exists. Try creating new account")
			return
		}
		fmt.Println(claims["sub"], claims["Sub"])

		c.Set("user", user)
	} else {
		fmt.Println(err)
	}
	c.Next()
}
