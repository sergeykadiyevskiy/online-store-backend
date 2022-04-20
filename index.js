const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv")
const stripeRoute = require("./routes/stripe")
const authRoute = require("./routes/auth")
const cartRoute = require("./routes/cart")
const productRoute = require("./routes/product")
const orderRoute = require("./routes/order")
const userRoute = require("./routes/users")
const cors = require("cors")

dotenv.config()

mongoose.connect(process.env.MONGO_URL
  
).then(()=>console.log("MongoDB connected")).catch((err)=>{
    console.log("MongoDB Error:",err)
});

app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/carts", cartRoute)
app.use("/api/checkout", stripeRoute)
app.use("/api/orders", orderRoute)
app.use("/api/products", productRoute)
app.use("/api/users", userRoute)


app.listen(process.env.PORT || 3001, () => {
  console.log("backend server running on port: 3001");
});
