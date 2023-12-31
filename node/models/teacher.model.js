const mongoose = require("mongoose");


let teacherSchema = new mongoose.Schema({
    user_id: { type: mongoose.ObjectId, ref: 'users' },
    courses: [{ type: mongoose.ObjectId, ref: 'courses' }],
    disc:String,
    date_created: {
        type: Date, default: Date.now()
    }

})



exports.TeacherModel = mongoose.model("teachers", teacherSchema);



