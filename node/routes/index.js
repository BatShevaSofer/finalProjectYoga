const express = require("express");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const mongoose = require("mongoose");
const router = express.Router();
const { TeacherModel } = require("../models/teacher.model");
const { CourseModel } = require("../models/course.model");
const { validLogin, UserModel, validUser } = require('../models/user.model');
const { createToken } = require('../middlewares/auth')
const { transporter, generatePassword } = require('../helpers/mail');
const {authTeacher } = require('../middlewares/auth');
let mailPassword = [];
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
    user.email = user.email.toLowerCase();
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
    console.log("cvbn");
    user.course_id = user.course_id || null;
    user.image_url = user.image_url || "";
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
    let email1 = req.body.email.toLowerCase();
    let user = await UserModel.findOne({ email: email1 })
    if (!user) {
      return res.status(401).json({ msg: "email is worng" })
    }
    let authPassword = await bcrypt.compare(req.body.password, user.password);
    if (!authPassword) {
      return res.status(401).json({ msg: "Password is worng" });
    }
    let token = createToken(user._id, user.role);
    res.json({ token, user });
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})

router.post('/sendMail', (req, res) => {
  let { to } = req.body;
  let password = generatePassword();
  to = to.toLowerCase();
  const mailOptions = {
    from: 'yoganoreply70@gmail.com',
    to,
    subject: "verified email",
    text: `Your new password is: ${password}`,
  };
  mailPassword.push({ to, password })
  console.log(mailPassword)


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});



function updateArray(updatedArray) {
  // הצהרה חוזרת על המערך המעודכן
  mailPassword = [...updatedArray];
}
router.patch('/resetpassword', async (req, res) => {
  let { passwordV, password, email } = req.body;
  email = email.toLowerCase();
  console.log("mailPassword", mailPassword);
  let obj = mailPassword.find(item => item.to == email);
  console.log("obj", obj);
  const filteredArr = mailPassword.filter(item => item.to !== email);
  updateArray(filteredArr);
  console.log("mailPassword reset", mailPassword);
  if (obj.password == passwordV) {
    let passwordB = await bcrypt.hash(password, 10);
    let data = await UserModel.updateOne({ email: email }, { password: passwordB });
    res.json(data);
  } else {
    res.json({ msg: "the password not match" })
  }
});


router.get("/teacherDetails", async (req, res) => {
  try {
    let data = await TeacherModel.find()
      .populate({
        path: 'user_id',
        select: 'name image_url birthDate '
      })
    res.json(data)
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})

router.get("/coursesDetails", async (req, res) => {
  try {
    let data = await CourseModel.find()
    res.json(data)
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})





module.exports = router;