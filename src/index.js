require("dotenv").config();
const express = require("express");
const PORT = process.env.SERVER_PORT;
const { sequelize } = require("./models");

const ProductRoute = require("./routes/product_route");
const UserRoute = require("./routes/user_route");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

sequelize
  .authenticate()
  .then((error) => {
    console.log("database has been established succesfully");
  })
  .catch((error) => {
    console.log("connection error", error);
  });

app.get("/", (req, res) => {
  res.send("Hello World!, DY");
});

app.use("/api/product", ProductRoute);
app.use("/api/user", UserRoute);

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
