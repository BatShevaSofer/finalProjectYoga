const express = require("express");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const mongoose = require("mongoose");
const router = express.Router();
const { validLogin, UserModel, validUser } = require('../models/user.model');
const { createToken } = require('../middlewares/auth')
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: true, 
  auth: {
    user: 'b0583247452@gmail.com', // יש להכניס את הכתובת המייל שלך
    pass: 'grraezalarqjwrry', // יש להכניס את הסיסמה שלך
  },
});


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
    let user = await UserModel.findOne({ email: req.body.email })
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
  const { to, subject, password } = req.body;

  
  const mailOptions = {
    from: 'aviyat123@gmail.com', 
    to,
    subject,
    text: `Your new password is: ${password}`,
  };


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
module.exports = router;