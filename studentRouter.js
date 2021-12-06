const express = require("express");
const router = express.Router();
const path = require("path");
const StudentModel = require("./models/student");
const BlacListModel = require("./models/blackList");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.get("/", function (req, res) {
  StudentModel.find()
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.get("/find", function (req, res) {
  StudentModel.findOne({
    username: req.query.username,
    password: req.query.password,
  })
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.get("/page", function (req, res) {
  StudentModel.find()
    .skip((req.query.page - 1) * 3)
    .limit(3)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.get("/:id", function (req, res) {
  console.log(req.params);
  StudentModel.findOne({ _id: req.params.id })
    .then(function (data) {
      console.log(48, data);
      res.render('components/userinfo', data)
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.post("/", (req, res) => {
  StudentModel.findOne({ username: req.body.username })
    .then(async function (data) {
      if (data) {
        res.json("username đã được sử dụng");
      } else {
        const newPass = await bcrypt.hash(req.body.password, 10);
        StudentModel.create({
          username: req.body.username,
          password: newPass,
          name: req.body.name,
        }).then(function (data) {
          res.json(data);
        });
      }
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.post("/login", async (req, res) => {
  try {
    let data = await StudentModel.findOne({
      username: req.body.username,
    });
    if (data) {
      const checkPassword = await bcrypt.compare(
        req.body.password,
        data.password
      );
      if (checkPassword) {
        const token = jwt.sign({ id: data._id }, "thai", { expiresIn: "7d" });
        res.json({ mess: "dang nhap thanh cong", status: 200, idUser: token });
      } else {
        res.json({ mess: "sai password", status: 400 });
      }
    } else {
      res.json({ mess: "sai username", status: 400 });
    }
  } catch (error) {
    res.json({ status: 500, mess: "server error", error });
  }
});

router.put("/:id", function (req, res) {
  StudentModel.updateOne(
    { _id: req.params.id },
    {
      password: req.query.newPass,
    }
  )
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      console.log(err);
    });
});

router.delete("/:id", (req, res) => {
  StudentModel.deleteOne({ _id: req.params.id })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
});

router.post("/logout", async (req, res) => {
  try {
    await BlacListModel.create({ token: req.cookies.UID });
    res.json({ status: 200, mess: "dang xuat ok" });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
