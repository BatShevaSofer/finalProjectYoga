const mongoose = require('mongoose');
const Joi = require('joi');
const jet = require('jsonwebtoken');
const { config } = require('../config/secret');



let userSchema = new mongoose.Schema({
    id_number: { type: String, unique: true },
    name: {
        firstName: String,
        lastName: String
    },
    password: String,
    birthDate: Date,
    email: {
        type: String,
        unique: true
    },
    phone: String,
    
    role: {
        type: String,
        enum: {
            values: ["admin", "student", "teacher"],
            message: "the value must be either 'admin','user','teacher'",
        },
        default: "student",
    },
    gender: Boolean,
    location: {
        city: String,
        street: String,
        home: Number
    },
    image_url: String,
    active: {
        type: Boolean, default: true,
    },
    date_created: {
        type: Date, default: Date.now()
    },
    HMO: {
        type: String,
        enum: {
            values: ["macabi", "clalit", "leumit", "meuchedet"],
            message: "HMO is required",
        },
    },
    ageGroup: {
        type: String,
        enum: {
            values: ["child", "teen", "adult"],
            message: "the value must be either 'child','teen','adult'",
        },
        required: true
    },
    course_id: { type: mongoose.ObjectId, ref: 'courses' },

})

exports.UserModel = mongoose.model("users", userSchema);



exports.validUser = (_reqBody) => {
    let joiSchema = Joi.object({
        id_number: Joi.string().length(9).required(),

        name: Joi.object({
            firstName: Joi.string().min(2).max(99).required(),
            lastName: Joi.string().min(2).max(99).required()
        }),
        email: Joi.string().min(2).max(99).email().required(),
        HMO: Joi.string().required(),
        password: Joi.string().min(3).max(99).required(),
        phone: Joi.string().min(8).max(99).required(),
        birthDate: Joi.string().required(),
        image_url: Joi.string().min(2).allow(null,'' ),
        gender: Joi.boolean().required(),
        location: Joi.object({
            city: Joi.string().min(2).max(99).required(),
            street: Joi.string().min(2).max(99).required(),
            home: Joi.number().required()
        }),
        course_id: Joi.string().allow(null, '')
    })

    return joiSchema.validate(_reqBody);
}

exports.validLogin = (_reqBody) => {
    let joiSchema = Joi.object({
        email: Joi.string().min(2).max(99).email().required(),
        password: Joi.string().min(3).max(99).required()
    })

    return joiSchema.validate(_reqBody);
}