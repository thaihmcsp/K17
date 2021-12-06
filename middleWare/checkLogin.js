const jwt = require("jsonwebtoken");
const BlackListModel = require("../models/blackList");
const StudentModel = require("../models/student");

async function checkLogin(req, res, next) {
  try {
    const check = await BlackListModel.findOne({ token: req.cookies.UID });
    if (check) {
      res.json({ status: 400, mess: "token khong hop le" });
    } else {
      const data = jwt.verify(req.cookies.UID, "thai");
      const user = await StudentModel.findOne({ _id: data.id });
      if (user) {
        req.user = user;
        next();
      } else {
        res.send({ mess: "chua dang nhap", status: 400 });
      }
    }
  } catch (error) {
    res.json({ status: 500, mess: "server error", error });
  }
}

module.exports = checkLogin;
