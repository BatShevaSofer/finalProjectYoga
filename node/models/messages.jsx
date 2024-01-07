const mongoose = require("mongoose");
// const Joi = require("joi");


let messagesSchema = new mongoose.Schema({
    teacherId: { type: mongoose.ObjectId, ref: 'teachers' },
    student_id: [{ type: mongoose.ObjectId, ref: 'users' }],
    room_id: String,
    date_created: {
        type: Date, default: Date.now()
    }
})



exports.MassagesModel = mongoose.model("messages", messagesSchema);


