const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
require("./db/connection");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log(process.env.DB_URL);
  res.status(200).send("Working!");
});

//Routes
const userRoutes = require("./Routes/userRoutes");
app.use("/user", userRoutes);
const sellerRoutes = require("./Routes/sellerRoutes");
app.use("/seller", sellerRoutes);
const productRoutes = require("./Routes/productRoutes");
app.use("/product", productRoutes);
const wishlistRoutes = require("./Routes/wishlistRoute");
app.use("/wishlist", wishlistRoutes);
const cartRoutes = require("./Routes/cartRoutes");
app.use("/cart", cartRoutes);
const orderRoutes = require("./Routes/orderRoutes");
app.use("/order", orderRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
