const express= require("express");
if(process.env.NODE_ENV != "production"){
require('dotenv').config()
}
const ejsMate= require("ejs-mate");
const path= require("path");
const dbConnect = require("./config/dbConnect")
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
dbConnect();

const app= express();

//Middleware
app.use(express.json());

//Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);


//Ejs setup
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


app.use("/", authRoutes);
//Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running ${PORT}`);
})