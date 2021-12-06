const express = require("express");
const router = express.Router();
const path = require("path");
const StudentModel = require("./models/student");
const BlackListModel = require("./models/blackList");
const jwt = require("jsonwebtoken");
const checkLogin = require("./middleWare/checkLogin");
const checkRole = require("./middleWare/checkRole");

router.get('/ejs', async (req,res)=>{
  try {
    const listStudent = await StudentModel.find()
    res.render('page/index', { listStudent, test: '<h1> day la the h1 </h1>'})
  } catch (error) {
    res.json({mess:'loi server'})
  }
})

router.get("/checkLogin", async function (req, res) {
  try {
    const check = await BlackListModel.findOne({ token: req.cookies.UID });
    if (check) {
      res.json({ status: 400, mess: "token khong hop le" });
    } else {
      const data = jwt.verify(req.cookies.UID, "thai");
      const user = await StudentModel.findOne({ _id: data.id });
      if (user) {
        res.json({ mess: "da dang nhap", status: 200 });
      } else {
        res.send({ mess: "chua dang nhap", status: 400 });
      }
    }
  } catch (error) {
    res.json({ status: 500, mess: "server error", error });
  }
});

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./views/drop.html"));
});

router.get("/home", checkLogin, function (req, res) {
  res.sendFile(path.join(__dirname, "./views/home.html"));
});

router.get("/register", function (req, res) {
  res.sendFile(path.join(__dirname, "./views/register.html"));
});

router.get("/changePass", checkLogin, function (req, res) {
  res.sendFile(path.join(__dirname, "./views/changePass.html"));
});

router.get("/show", checkLogin, checkRole, function (req, res) {
  res.sendFile(path.join(__dirname, "./views/show.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/login.html"));
});
module.exports = router;
