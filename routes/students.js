const express= require("express");
const router = express.Router();
const {authStudent} =require('../middlewares/auth');
const { CourseModel } = require("../models/course.model");



router.get("/:id", authStudent, async (req, res) => {
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
      let courseId = await UserModel.findOne({ _id: req.tokenData._id }, {course_id: 1});
      let courseInfo = await CourseModel.find({_id: { }})
      res.json(courseInfo);
    }
    catch (err) {
      console.log(err)
      res.status(500).json({ msg: "err", err })
    }
  })


module.exports = router;