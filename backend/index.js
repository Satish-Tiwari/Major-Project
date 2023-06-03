require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression");
const express = require("express");
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(compression());

//  //! Uncaught Exception Error...
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutdown the server due to Uncaught Exception`);
  process.exit(1);
});

//  //! Connect Database...
const dbConnect = require("./database/dbConnect");
dbConnect();

//  //! Routers...
app.get("/", (req, res) => {
  return res.status(200).json({ success: true, message: "API Works" });
});


//  //* User Route...
const userRoute = require("./routers/userRoute");
app.use(userRoute);
//  //* Product Route...
const productRoute = require("./routers/productRoute");
app.use(productRoute);
//  //* Order Route...
app.use(require("./routers/orderRoute"));
//  //* Admin Route...
app.use(require("./routers/adminRoute"));


const server = app.listen(process.env.PORT, (e) => {
  console.log(
    `server running at http://${process.env.HOST}:${process.env.PORT}`
  );
});

//  //! Error Handler...
const errors = require("./middleware/errors");
app.use(errors);

//  //! Unhandled Rejection...
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutdown the server due to Unhandled Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
