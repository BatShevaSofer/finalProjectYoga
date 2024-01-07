const Joi = require("joi");
const mongoose = require("mongoose");
// const Joi = require("joi");


let messagesSchema = new mongoose.Schema({
    teacherId: { type: mongoose.ObjectId, ref: 'teachers' },
    student_id: { type: mongoose.ObjectId, ref: 'users' },
    room_id: String,
    messages: [Object],
    date_created: {
        type: Date, default: Date.now()
    },
    teacherRead: Number,
    studentRead: Number
})

exports.validMessages = (_reqBody) => {
    let joiSchema = Joi.object({
        teacherId: Joi.required(),
        student_id: Joi.required(),
        room_id: Joi.required(),
        messages: Joi.required()
    });
    return joiSchema.validate(_reqBody);

}



exports.MassagesModel = mongoose.model("messages", messagesSchema);


