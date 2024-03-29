
const mongoose = require("mongoose");
const Joi = require("joi");

const courseSchema = new mongoose.Schema({
    level: String,
    gender: Boolean,
    ageGroup: String,
    students:[{ type: mongoose.ObjectId, ref: 'users' }],

    // students: { 
    //     type: [mongoose.ObjectId], 
    //     ref: 'users',
    //     default: [],
    //  }, // Define students as an array of strings
    dateTime: {
        day: String,
        hour: Number
        // hour: String
    },
    teacherId: {
        type: mongoose.ObjectId,
        // default: () => new mongoose.Types.ObjectId(),
        ref: 'teachers'
    },
    date_created: {
        type: Date, default: Date.now()
    },
});

exports.CourseModel = mongoose.model("courses", courseSchema);

exports.validateCourse = (_reqBody) => {
    let joiSchema = Joi.object({
        level: Joi.string().min(1).max(99).required(),
        gender: Joi.boolean().required(),
        ageGroup: Joi.string().min(2).max(99).required(),
        // students: Joi.array().items(Joi.string().min(2).max(200)).allow(null, ""), // Use Joi.array() for an array of strings
        dateTime: Joi.object({
            day: Joi.string().required(),
            hour: Joi.number().min(2).max(23).required()
            // hour: Joi.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required()

        }),
        teacherId: Joi.allow("", null)
    });

    return joiSchema.validate(_reqBody)
};

// students: { 
//     type: [mongoose.ObjectId], 
//     ref: 'users',
//     default: [],
//  }, // Define students as an array of strings

// students: { 
//     type: [{
//       user_id: { type: mongoose.ObjectId, ref: 'users'},
//       // כל השדות הנוספים של תלמיד
//       // ...
//     }],
//     default: [],
// },