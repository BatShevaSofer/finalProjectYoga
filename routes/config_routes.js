const indexR=require('./index')
const adminR=require('./admin')
const teacherR=require('./teachers')
const studentR=require('./students')


exports.routesInit=(app)=>{
    app.use("/",indexR)
    app.use("/admin",adminR)
    app.use("/teacher",teacherR)
    app.use("/student",studentR)
}