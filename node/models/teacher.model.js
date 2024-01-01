const mongoose = require("mongoose");
// const Joi = require("joi");


let teacherSchema = new mongoose.Schema({
    user_id: { type: mongoose.ObjectId, ref: 'users' },
    courses: [{ type: mongoose.ObjectId, ref: 'courses' }],
    description:String,
    date_created: {
        type: Date, default: Date.now()
    }

})



exports.TeacherModel = mongoose.model("teachers", teacherSchema);
// exports.validateTeacher= (_reqBody) => {
//     let joiSchema = Joi.object({
     
//     });

//     return joiSchema.validate(_reqBody);
// };




