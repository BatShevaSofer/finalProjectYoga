const express= require("express");
const router = express.Router();
const { validateCourse, CourseModel } = require("../models/course.model");


router.get("/" , (req,res)=> {
  res.json({msg:"courses api work !"})
})




router.post("/", authAdmin, async(req,res) => {
    let validBody = validateCourse(req.body);
    if(validBody.error){
      res.status(400).json(validBody.error.details)
    }
    try{
      let course = new CourseModel(req.body);
      await course.save();
      res.json(course);
    }
    catch(err){
      console.log(err)
      res.status(500).json({msg:"err",err})
    }
  })
  
module.exports = router;