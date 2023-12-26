import { BrowserRouter, Routes, Route } from "react-router-dom"

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Home from './comps/comps_user/home'
import { Header } from './comps/comps_static/header'
import { HeaderAdmin } from "./comps/comps_static/header_admin"
import ResponsiveAppBar from "./comps/navbar_mui"
import Footer from "./comps/comps_static/footer"

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Header />} />
        <Route path='/admin' element={<HeaderAdmin />} />
        
      </Routes>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/nav' element={<ResponsiveAppBar />} />
        <Route path='/training_programs' element={<HeaderAdmin />} />
        <Route path='/th' element={<Footer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
