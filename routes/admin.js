const express = require("express");
const { authAdmin } = require("../middlewares/auth");
const { CourseModel, validateCourse } = require("../models/course.model");
const { TeacherModel } = require("../models/teacher.model");
const { UserModel } = require("../models/user.model");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "admin api work !" })
})

router.get("/course", authAdmin, async (req, res) => {
  try {
    let data = await CourseModel.find({}).limit(10);
    res.json(data)
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})
router.get("/course/:id", authAdmin, async (req, res) => {
  let userID = req.params.id;
  try {
    let data = await CourseModel.findOne({ _id: userID });
    res.json(data)
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})
router.get("/teachers", authAdmin, async (req, res) => {
  try {
    let data = await TeacherModel.find({}).limit(10);
    res.json(data)
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})
router.get("/teachers/:id", authAdmin, async (req, res) => {
  let userID = req.params.id;
  try {
    let data = await TeacherModel.findOne({ _id: userID });
    res.json(data)
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})
router.get("/students", authAdmin, async (req, res) => {
  try {
    let data = await UserModel.find({}).limit(10);
    res.json(data)
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})
router.get("/students/:id", authAdmin, async (req, res) => {
  let userID = req.params.id;
  try {
    let data = await UserModel.findOne({ _id: userID });
    res.json(data)
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})

router.post("/course", authAdmin, async (req, res) => {
  let validBody = validateCourse(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let course = new CourseModel(req.body);
    await course.save();
    res.status(201).json(course);

  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }

});

router.patch("/teacher/:id", authAdmin, async (req, res) => {
  try {
    let userID = req.params.id;
    let data = await UserModel.updateOne({ _id: userID }, { role: "teacher" })
    let teacher = {
      user_id: userID,
      courses: []
    };
    
    res.json(data);
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
});






module.exports = router;