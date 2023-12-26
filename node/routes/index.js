const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const router = express.Router();
const { validLogin, UserModel, validUser } = require('../models/user.model');
const { createToken } = require('../middlewares/auth')


router.get("/", (req, res) => {
  res.json({ msg: "courses api work !" })
})

router.post("/signup", async (req, res) => {
  let validBody = validUser(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let user = new UserModel(req.body);

    user.password = await bcrypt.hash(user.password, 10);
    // מתרגם ליוניקס
    user.birthDate = Date.parse(user.birthDate);
    let birthDateObj = new Date(user.birthDate);
    let currentDate = new Date();
    let age = currentDate.getFullYear() - birthDateObj.getFullYear();
    if (age < 3) {
      return res.status(300).json({ "msg": "you are too young..." })
    }
    else if (age <= 13) {
      user.ageGroup = "child"
    }
    else if (age <= 20) {
      user.ageGroup = "teen"
    }
    else {
      user.ageGroup = "adult"
    }
    user.course_id = null;
    await user.save();
    user.password = "***";
    res.status(201).json(user);
  }
  catch (err) {
    if (err.code == 11000) {
      return res.status(500).json({ msg: "Email already in system, try log in", code: 11000 })

    }
    console.log(err);
    res.status(500).json({ msg: "err 123", err })
  }
})

router.post("/login", async (req, res) => {
  let validBody = validLogin(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
      return res.status(401).json({ msg: "email is worng" })
    }
    let authPassword = await bcrypt.compare(req.body.password, user.password);
    if (!authPassword) {
      return res.status(401).json({ msg: "Password is worng" });
    }
    let token = createToken(user._id, user.role);
    res.json({ token });
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})
module.exports = router;