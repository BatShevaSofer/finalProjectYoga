import { BrowserRouter, Routes, Route } from "react-router-dom"

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'


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
import KidsProgram from './comps/comps_user/program/kids_program'
import TeensProgram from './comps/comps_user/program/teens_program'
import AdultProgram from './comps/comps_user/program/adult_program'
// import AppChat from './AppChat'
import CoursesPage from './comps/comps_student/courses_page'
import HomeChat from "./comps/chat/homeChat"
import { API_URL } from './services/mainService'
import socketIO from 'socket.io-client'
// import socketIO from 'socket.io-client'
const socket = socketIO.connect(API_URL);


function App() {

  return (
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
        <Route path='/program/kids_program' element={<KidsProgram />} />
        <Route path='/program/teens_program' element={<TeensProgram />} />
        <Route path='/program/adult_program' element={<AdultProgram />} />
        <Route path='/admin/courses' element={<Courses />} />
        <Route path='/admin/students' element={<Students />} />
        <Route path='/admin/teachers' element={<Teachers />} />
        <Route path='/admin/schedule' element={<Schedule />} />
        <Route path='/student/pay/:courseId' element={<PaypalPaymentButton />} />

        <Route path='/teacher/my_detailes' element={<TeacherProfile />} />
        <Route path='/teacher/schedule_teacher' element={<TeacherSchedule />} />
        <Route path='/teacher/Courses' element={<TeacherCourses />} />
        <Route path='/student/my_details' element={<StudentProfile />} />
        <Route path='/student/schedule' element={<ScheduleStudent />} />
        {/* <Route path='/student/' element={<ScheduleStudent />} /> */}
        <Route path='/student/coursesPage' element={<CoursesPage />} />
        <Route path='/student/chat' element={<HomeChat socket={socket} />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
