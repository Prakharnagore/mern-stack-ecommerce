require("express-async-errors");

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorHandlerMiddleware = require("./middleware/error");

const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());

// Route Imports

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

// use Route Imports
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
//middleware
app.use(errorHandlerMiddleware);
module.exports = app;
