const express = require("express");
const ejs = require("ejs");
const app = express();
require("dotenv").config();
const path = require("path");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views")); 


const appRouter = require("./routes");
const User = require("./models/user");
const Category = require("./models/category");
const Product = require("./models/product");
const router = require("./routes");
const {signupUserController, loginUserController} = require("./controller/user-controller")
const {createCategoryController,coustmizeCategoryController,deleteCategoryController} = require("./controller/category-controller")
const{createProductController,getProductController,putProductController,deleteProductController} = require("./controller/product-controller")

const verifyToken = require("./middleware/auth")



const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const cookieParser = require('cookie-parser');
app.use(cookieParser()); // Parse cookies



app.use("/api/v1", appRouter);
app.use(express.static(path.join(__dirname, "public")));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});


// Redirect Page
app.get("/dashboard",(req,res)=>{
  res.render("dashboard")
})

// Login
app.get('/login',verifyToken, (req, res) => {
  res.render('login');
});

// Signup
app.get("/signup", (req, res) => {
  res.render("signup");
});

// User
app.post('/signup',signupUserController);
app.post("/login",verifyToken,loginUserController)

// Category-Navbar
app.get("/curd",(req,res)=>{
  res.render("c-navbar")
})

// Category-Create
app.get("/category",(req,res)=>{
  res.render("category")
})

// Category-Update
app.get("/coustmize",(req,res)=>{
  res.render("updatecategory")
})

// Category-Delete
app.get("/delete",(req,res)=>{
  res.render("deletecategory")
})

// Product-Navbar
app.get("/product",(req,res)=>{
  res.render("p-navbar")
})

// Product-Create
app.get('/create',(req,res)=>{
  res.render("createproduct")
})

// Category
app.post("/create",createCategoryController)
app.post("/coustmize",coustmizeCategoryController)
app.post("/delete",deleteCategoryController)

//Product
app.post("/create",createProductController)
app.get("/get/:id",getProductController)
app.put("/put/:id",putProductController)
app.delete("/delete/:id",deleteProductController)
// Port
app.listen(PORT, () => {
  console.log(`Server is listening on : ${PORT}`);
});

module.exports = appRouter; 
