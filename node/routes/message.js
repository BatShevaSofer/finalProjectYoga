const express = require("express");
const router = express.Router();
const { MassagesModel, validMessages } = require('../models/messages.model')


router.get("/", (req, res) => {
    res.json({ msg: "messages api work !" })
})

router.get("/room/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let data = await MassagesModel.find({
            student_id: id
        })
        res.json(data);

    }
    catch (err) {
        res.json({ err: err, msg: err.message });
    }
})




router.post('/room', async (req, res) => {
    let validBody = validMessages(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let message = new MassagesModel(req.body);
        message.messages = [];
        await message.save();
        res.status(200).json(message);
    }
    catch (err) {
        res.json({ err: err.message });
    }
})
router.patch('/message/:roomId', async (req, res) => {
    try {
        let room = await MassagesModel.findOne({ room_id: req.params.roomId });
        let messagesT = room.messages
        messagesT.push(req.body.message)
        let data = await MassagesModel.updateOne({ room_id: req.params.roomId }, { messages: messagesT })
        res.status(200).json({ data, msg: req.body.message });
    }
    catch (err) {
        res.json({ err: err.message });
    }
})


module.exports = router;