const jwt = require("jsonwebtoken");
const { config } = require("../config/secret")

exports.createToken = (_id, role) => {
    let token = jwt.sign({ _id, role }, config.tokenSecret, { expiresIn: "140000mins" });
    return token;
}


// exports.auth = (req, res, next) => {
//     let token = req.header("x-api-key");
//     if (!token) {
//         return res.status(401).json({ msg: "You need to send token to this endpoint url" })
//     }
//     try {
//         let decodeToken = jwt.verify(token, config.tokenSecret);
//         // add to req , so the next function will recognize0
//         // the tokenData/decodeToken
//         req.tokenData = decodeToken;

//         next();
//     }
//     catch (err) {
//         console.log(err);
//         return res.status(401).json({ msg: "Token invalid or expired, log in again or you hacker!" })
//     }
// }

exports.authAdmin = (req, res, next) => {
    let token = req.header("x-api-key");
    if (!token) {
        return res.status(401).json({ msg: "You need to send token to this endpoint url" })
    }
    try {
        let decodeToken = jwt.verify(token, config.tokenSecret);
        // check if the role in the token of admin
        if (decodeToken.role != "admin") {
            return res.status(401).json({ msg: "Token invalid or expired, code: 3" })
        }

        // add to req , so the next function will recognize
        // the tokenData/decodeToken
        req.tokenData = decodeToken;

        next();
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ msg: "Token invalid or expired, log in again or you hacker!" })
    }
}
exports.authTeacher = (req, res, next) => {
    let token = req.header("x-api-key");
    if (!token) {
        return res.status(401).json({ msg: "You need to send token to this endpoint url" })
    }
    try {
        let decodeToken = jwt.verify(token, config.tokenSecret);
        // check if the role in the token of admin
        if (decodeToken.role != "teacher") {
            return res.status(401).json({ msg: "Token invalid or expired, code: 3" })
        }

        // add to req , so the next function will recognize
        // the tokenData/decodeToken
        req.tokenData = decodeToken;

        next();
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ msg: "Token invalid or expired, log in again or you hacker!" })
    }
}
exports.authStudent = (req, res, next) => {
    let token = req.header("x-api-key");
    if (!token) {
        return res.status(401).json({ msg: "You need to send token to this endpoint url" })
    }
    try {
        let decodeToken = jwt.verify(token, config.tokenSecret);
        // check if the role in the token of admin
        if (decodeToken.role != "student") {
            return res.status(401).json({ msg: "Token invalid or expired, code: 3" })
        }

        // add to req , so the next function will recognize
        // the tokenData/decodeToken
        req.tokenData = decodeToken;

        next();
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ msg: "Token invalid or expired, log in again or you hacker!" })
    }
}
