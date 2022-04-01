const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")

dotenv.config()

mongoose.connect(process.env.MONGO_URL
  
).then(()=>console.log("MongoDB connected")).catch((err)=>{
    console.log("MongoDB Error:",err)
});

app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)

app.listen(process.env.PORT || 3001, () => {
  console.log("backend server running on port: 3001");
});
