var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var razorpayRouter = require("./routes/razorpay");
var orderRouter = require("./routes/order");
var productRouter = require("./routes/products");
var formDataRouter = require("./routes/formData");
var cloudinaryRouter = require("./routes/cloudinary");
const { default: mongoose } = require("mongoose");
const session = require("express-session");
const authMiddleware = require("./middleware/authMiddleware");

var app = express();
// connect to mongoose
mongoose
  // .connect("mongodb://127.0.0.1:27017/nyota")
  .connect(process.env.MONGO_DB)
  .then(() => console.log("Connnected to DB"))
  .catch((err) => console.log(err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/razorpay", razorpayRouter);
app.use("/order", authMiddleware.identifyUser, orderRouter);
app.use("/product", productRouter);
app.use("/formData", formDataRouter);
app.use("/cloudinary", cloudinaryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
