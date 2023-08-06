const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./Routes/user');
const authRoute = require('./Routes/authentication');
const productRoute = require('./Routes/product');
const cartRoute = require('./Routes/cart');
const ordersRoute = require('./Routes/order');

const app = express();
const router = express.Router();
dotenv.config();


mongoose
.connect(process.env.MONGO_URL,
)
.then(() => {
    console.log("DB Connected");
})
.catch((err) => {
    console.log(err);
});

app.use(express.json());
app.use("/api/users",userRoute);
app.use("/api/authentication",authRoute);
app.use("/api/products",productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", ordersRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log('backend server is running on port 5000');
});