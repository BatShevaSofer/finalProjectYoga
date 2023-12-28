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
import Courses from './comps/comps_admin/courses'


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
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='teacher/my_detailes' element={<TeacherProfile />} />
        <Route path='admin/courses' element={<Courses />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
