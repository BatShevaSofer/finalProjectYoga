const indexR=require('./index')
const adminR=require('./admin')
const teacherR=require('./teachers')
const studentR=require('./students')
const chatR = require('./message')

exports.routesInit=(app)=>{
    app.use("/",indexR)
    app.use("/admin",adminR)
    app.use("/teacher",teacherR)
    app.use("/student",studentR)
    app.use("/chat",chatR)
}