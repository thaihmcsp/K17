const jwt = require("jsonwebtoken");
const { use } = require("../indexRouter");
const BlackListModel = require("../models/blackList");
const StudentModel = require("../models/student");

async function checkRole(req, res, next) {
  try {
    if (req.user.role === "monitor") {
      next();
    } else {
      res.json({ status: 400, mess: "k cos quyen" });
    }
  } catch (error) {
    res.json({ error, status: 500, mess: "loi server" });
  }
}

module.exports = checkRole;
