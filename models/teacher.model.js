const mongoose = require("mongoose");


let teacherSchema = new mongoose.Schema({
    user_id: String,
    courses: [mongoose.ObjectId],
    date_created: {
        type: Date, default: Date.now()
    }

})



exports.TeacherModel = mongoose.model("teachers", teacherSchema);



