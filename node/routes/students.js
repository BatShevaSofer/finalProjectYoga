const express= require("express");
const router = express.Router();
const {authStudent} =require('../middlewares/auth');
const { CourseModel } = require("../models/course.model");
const { UserModel } = require("../models/user.model");
const { validUser } = require("../models/user.model");


router.get("/", authStudent, async (req, res) => {
    try {
      let userInfo = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0 });
      res.json(userInfo);
    }
    catch (err) {
      console.log(err)
      res.status(500).json({ msg: "err", err })
    }
  })

  router.get("/course", authStudent, async (req, res) => {
    try {
      let courseId = await UserModel.findOne({ _id: req.tokenData._id }, {course_id: 1}).populate('course_id');
      // let courseInfo = await CourseModel.find({_id: { }})
      res.json(courseId);
    }
    catch (err) {
      console.log(err)
      res.status(500).json({ msg: "err", err })
    }
  })


  router.patch("/updateDetiles", authStudent, async (req, res) => {
    let validBody = validUser(req.body);
    
    try {
      const userID = req.tokenData._id;
      const update=req.body.update;
      const to=req.body.to;
  
      // מעדכן משתמש
     
      const data = await UserModel.updateOne({ _id: userID }, { [update]: to });
  
  
      res.json({ data });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "err", err });
    }
  });
module.exports = router;