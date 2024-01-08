import { BrowserRouter, Routes, Route } from "react-router-dom"


import './App.css'
import Home from './comps/comps_user/home'
import HeaderAdmin from "./comps/comps_static/header_admin"
import HeaderTeacher from "./comps/comps_static/header_teacher"
import HeaderStudent from "./comps/comps_static/header_student"
import ForgotPassword from './comps/forgot-password'
import Footer from "./comps/comps_static/footer"
import Login from "./comps/login"
import Header from "./comps/comps_static/header"
import Signup from "./comps/signUp"
import TeacherProfile from "./comps/comps_teacher/teacher"
import TeacherCourses from "./comps/comps_teacher/teacherCourses"
import About from "./comps/comps_user/about"
import Courses from "./comps/comps_admin/courses/courses"
import Students from "./comps/comps_admin/students/students"
import StudentProfile from "./comps/comps_student/students"
import Programs from "./comps/comps_user/programs"
import OurTeachers from "./comps/comps_user/our_teachers"
import Teachers from "./comps/comps_admin/teachers/teachers"
import ScheduleStudent from './comps/comps_student/schedule_student'
import TeacherSchedule from './comps/comps_teacher/schedule_teacher'
import Schedule from './comps/comps_admin/schedule'
import PaypalPaymentButton from './comps/paypal'
import HomeStudent from './comps/comps_student/homeStudent'
import CoursesPage from './comps/comps_student/courses_page'
import OurProgram from "./comps/comps_user/our_program"
// import HomeChat from "./comps/chat/homeChat"
import { AppContext } from './contexts/context'
import MyPredict from './comps/predict'
import React, { useState } from "react"
import HomeTeacher from "./comps/comps_teacher/home_teacher"
// import TeacherChats from "./comps/comps_teacher/teacherChats"
import Chats from "./comps/comps_teacher/chat/Chats"
// import socketIO from 'socket.io-client'



function App() {
  const [readS, setReadS] = useState();
  const [readT, setReadT] = useState();
  return (
    <React.Fragment>
      <AppContext.Provider value={
        {
          readS, setReadS,
          readT, setReadT
        }
      }
      >
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<Header />} />
            <Route path='/admin/*' element={<HeaderAdmin />} />
            <Route path='/teacher/*' element={<HeaderTeacher />} />
            <Route path='/student/*' element={<HeaderStudent />} />

          </Routes>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/our_teachers" element={<OurTeachers />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path="/kids" element={<OurProgram title="Kids" />} />
            <Route path="/teens" element={<OurProgram title="Teens" />} />
            <Route path="/adult" element={<OurProgram title="Adult" />} />
            {/* <Route path='/program/kids_program' element={<KidsProgram />} /> */}
            {/* <Route path='/program/teens_program' element={<TeensProgram />} /> */}
            {/* <Route path='/program/adult_program' element={<AdultProgram />} /> */}
            <Route path='/admin/courses' element={<Courses />} />
            <Route path='/admin/students' element={<Students />} />
            <Route path='/admin/teachers' element={<Teachers />} />
            <Route path='/admin/schedule' element={<Schedule />} />
            <Route path='/admin/schedule' element={<Schedule />} />
            
            <Route path='/teacher' element={<HomeTeacher />} />
            <Route path='/teacher/my_detailes' element={<TeacherProfile />} />
            <Route path='/teacher/schedule_teacher' element={<TeacherSchedule />} />
            <Route path='/teacher/Courses' element={<TeacherCourses />} />
            <Route path='/teacher/chats' element={<Chats />} />



            <Route path='/student/pay/:courseId' element={<PaypalPaymentButton />} />
            <Route path='/student' element={<HomeStudent />} />
            <Route path='/student/my_details' element={<StudentProfile />} />
            <Route path='/student/schedule' element={<ScheduleStudent />} />
            {/* <Route path='/student/' element={<ScheduleStudent />} /> */}
            <Route path='/student/coursesPage' element={<CoursesPage />} />
            <Route path='/student/predict' element={<MyPredict />} />
            {/* <Route path='/student/chat' element={<HomeChat  />} /> */}

          </Routes>
          <Footer />
        </BrowserRouter>
      </AppContext.Provider>
    </React.Fragment>
  )
}

export default App
