const express =require("express");
const app = express();
app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

require("dotenv").config();
const Port = process.env.PORT;

app.listen(Port, ()=>{console.log(`server started at localhost ${Port}`)});

const dbConnect = require("./config/dbConnect");
dbConnect();

const user = require("./routes/user");
app.use("/user", user);

//default route
app.get("/", (req, res)=>{
    res.send("Home Page")
})