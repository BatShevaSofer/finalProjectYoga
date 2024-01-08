const express = require("express");
const router = express.Router();
const { authTeacher } = require("../middlewares/auth");
const { UserModel, validUser } = require("../models/user.model");
const { TeacherModel } = require("../models/teacher.model");
const mongoose = require("mongoose");
const { MassagesModel } = require("../models/messages.model");

// router.get("/" , (req,res)=> {
//   res.json({msg:"teachers api work !"})
// })


router.get("/", authTeacher, async (req, res) => {
  try {
    let userInfo = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0 });
    res.json(userInfo);
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})

router.get("/teacherbyid/:id", authTeacher, async (req, res) => {
  let id = req.params.id
  try {
    let userInfo = await TeacherModel.findOne({ _id: id });
    res.json(userInfo);
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})


router.get("/courses", authTeacher, async (req, res) => {
  try {
    const teacherInfo = await TeacherModel.findOne({ user_id: req.tokenData._id }).populate('courses');

    // const teacherInfo = await TeacherModel.findOne({ user_id: req.tokenData._id }, { password: 0 });


    // if (!teacherInfo) {
    //   // User not found
    //   return res.status(404).json({ msg: "teacher not found" });
    // }
    // const userId=userInfo._id;

    // const teacherInfo   n=await TeacherModel.findOne({ idUser:userId  });
    // const teacherCourses = await CourseModel.find({ _id: { $in: teacherInfo.courses } }) || [];

    res.json(teacherInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error", error: err.message });
  }
});





router.get("/courses/:courseId", authTeacher, async (req, res) => {
  try {
    const userId = req.tokenData._id;
    const userInfo = await UserModel.findOne({ _id: userId }, { password: 0 });

    if (!userInfo) {
      return res.status(404).json({ msg: "User not found" });
    }

    const courseId = req.params.courseId;

    // Find the course by ID within the user's courses array
    const course = userInfo.courses.find(course => course._id.toString() === courseId);

    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error", error: err.message });
  }
});


router.get('/chats', authTeacher, async (req, res) => {
  const userId = req.tokenData._id;
  try {
    let teacher = await TeacherModel.findOne({ user_id: userId });
    console.log(teacher);
    console.log(teacher._id);
    let chats = await MassagesModel.find({ teacherId: teacher._id })
      .populate({
        path: 'student_id',
        select: 'name image_url'
      })
    console.log(chats);
    res.status(200).json(chats);
  }
  catch (err) {
    res.json({ error: err.message });
  }

})

// // מעדכן פרטי משתמש


// router.patch("/updateFirstName/:newFirstName", authTeacher, async (req, res) => {
//   try {
//     const userID = req.tokenData._id;
//     const newFirstName = req.params.newFirstName;

//     // מעדכן משתמש
//     const data = await UserModel.updateOne(
//       { _id: userID },
//       { $set: { "name.firstName": newFirstName } }
//     );

//     res.json({ data });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: "err", err });
//   }
// });



router.patch("/updateDetiles", authTeacher, async (req, res) => {
  let validBody = validUser(req.body);

  try {
    const userID = req.tokenData._id;
    const update = req.body.update;
    const to = req.body.to;

    // מעדכן משתמש

    const data = await UserModel.updateOne({ _id: userID }, { [update]: to });


    res.json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
});

module.exports = router;