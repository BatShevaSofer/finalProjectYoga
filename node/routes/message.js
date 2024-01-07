const express = require("express");
const router = express.Router();
const { MessagesModel } = require('../models/messages')


router.get("/", (req, res) => {
  res.json({ msg: "messages api work !" })
})

router.get("/massages/:id", async(req, res) => {
    let id = req.params.id;
    try{
        let data = await MessagesModel.find({
            $or: [
                { teacherId: id },
                { student_id: id }
            ]
        })
        res.json(data);
        
    }
    catch(err){
        res.json({err: err, msg: err.message});
    }
})



module.exports = router;