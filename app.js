const express = require("express"); // import express
const path = require("path");
const app = express(); // tạo app
const cookieParser = require("cookie-parser");
const IndexRouter = require("./indexRouter");
const StudentRouter = require("./studentRouter");
const StudentModel = require("./models/student");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "./public/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");

app.use("/public", express.static(path.join(__dirname, "./public")));

app.post("/profile", upload.single("user"), async function (req, res, next) {
  console.log(req.file.path.indexOf("public"));
  var path = req.file.path;
  var index = path.indexOf("public");
  var avatar = path.slice(index, path.length);
  await StudentModel.create({
    username: req.body.username,
    password: req.body.password,
    avatar,
  });
  res.json({ mess: "ok" });
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
});

app.use("/student", StudentRouter);
app.use("/", IndexRouter);

app.listen(process.env.PORT || 3000); // cho 1 cổng để liên lạc

// || đk hoặc,  tìm cái đúng
