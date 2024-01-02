const express = require("express");
const { authAdmin } = require("../middlewares/auth");
const { CourseModel, validateCourse } = require("../models/course.model");
const { TeacherModel } = require("../models/teacher.model");
const { UserModel } = require("../models/user.model");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "admin api work !" })
})



router.get("/courses", authAdmin, async (req, res) => {
  try {
    let data = await CourseModel.find({})
      .limit(10)
      .populate({
        path: 'teacherId',
        populate: {
          path: 'user_id',
          select: 'name image_url'
        }
      })
      .populate({
        path: 'students',
        select: 'name'
      });
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
    let data = await CourseModel.findOne({ _id: userID })
      .populate({
        path: 'teacherId',
        select: 'name image_url'

      })
      .populate({
        path: 'students',
        select: 'name image_url'
      });
    res.json(data)
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})



router.get("/teachers", authAdmin, async (req, res) => {
  try {
    let data = await TeacherModel.find()
      .limit(10)
      .populate({
        path: 'user_id',
        select: 'name image_url'
      })
      .populate({
        path: 'courses',
        select: 'level gender ageGroup students',
        populate: {
          path: 'students',
          select: 'name'
        }
      })
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
    let data = await TeacherModel.findOne({ _id: userID }).populate('user_id').populate('courses');
    res.json(data)
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})



router.get("/students", authAdmin, async (req, res) => {
  try {
    let data = await UserModel.find({ role: "student" })
      .limit(10)
      .populate({
        path: 'course_id',
        select: 'level teacherId',
        populate: {
          path: 'teacherId',
          select: 'user_id',
          populate:{
            path: 'user_id',
            select: 'name'
          }
        }
      });
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
    course.teacherId = null;
    await course.save();
    res.status(201).json(course);
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }

});


router.patch("/course/:idCourse/teacher/:idteacher", authAdmin, async (req, res) => {
  try {
    let idCourse = req.params.idCourse;
    let idTeacher = req.params.idteacher;

    // עדכון הקורס עצמו
    let data = await CourseModel.updateOne({ _id: idCourse }, { teacherId: idTeacher });

    // משיג את המורה שאליו יש לעדכן את מערך הקורסים
    let teacher = await TeacherModel.findById(idTeacher);

    // עדכון מערך הקורסים בתוך המורה
    teacher.courses.push(idCourse);
    await teacher.save();

    res.json({ "data": data });
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
});



//הופך מתלמיד למורה ומוסיף לטבלת teachers
router.patch("/teacher/:id", authAdmin, async (req, res) => {
  try {
    let userID = req.params.id;
    let data = await UserModel.updateOne({ _id: userID }, { role: "teacher" })
    let teacher = {
      user_id: userID,
      courses: []
    };
    let newTeach = new TeacherModel(teacher);
    await newTeach.save();

    res.json({ "data": data, "teacher": teacher });
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
});



module.exports = router;