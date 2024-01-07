const express= require("express");
const router = express.Router();
const mongoose = require("mongoose");

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
  
  router.patch("/course/:idCourse/student/:idStudent", authStudent, async (req, res) => {
    try {
      const idCourse = req.params.idCourse;
      const idStudent = req.params.idStudent;
  
      // עדכון המשתמש
      let userData = await UserModel.updateOne({ _id: idStudent }, { $set: { course_id: idCourse } });
  
      // קבלת הקורס
      let course = await CourseModel.findById(idCourse);
  
      // בדיקה אם המערך קיים, ואם לא - יצירתו
      if (!course.students) {
        course.students = [];
      }
  
      // הוספת התלמיד למערך
      course.students.push(idStudent);
      await course.save();
  
      res.json({ data: userData });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "שגיאה פנימית בשרת", error: err.message });
    }
  });
  
  
  // router.get('/checkUser/:username', async (req, res) => {
  //   const username = req.params.username;
  
  //   try {
  //     const user = await User.findOne({ username });
  
  //     if (user) {
  //       // המשתמש קיים
  //       res.json({ exists: true, user });
  //     } else {
  //       // המשתמש לא קיים
  //       res.json({ exists: false });
  //     }
  //   } catch (error) {
  //     console.error('Error checking user:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // });
module.exports = router;