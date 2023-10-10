const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect=()=>{
    mongoose.connect(process.env.MongoDB_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
    ).then(()=> {console.log("DB connected successfullly")})
    .catch((err)=>{
        console.log("Could not connect to Database");
        console.log(err.message);
        process.exit(1);
    })
}

module.exports = dbConnect;