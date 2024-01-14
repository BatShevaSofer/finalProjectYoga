import React from 'react'
import './footer.css';

const Footer = () => {
  return (
    <div className='footer '>
      <div className="container">
        <div className="row">
          <div className="col-md-6 copyright">
            <p>© Bat-Sheva Sofer & Efrat Gavriel & Aviya Ben-Tzur | developer | 2023</p>
           
            <a href="/home" className='link_footer_home'>Home</a>
          </div>
          <div className='col-md-6'>
          <div className=" footer-icons">
            <a href="https://twitter.com/" target="_blank"><i class="fa fa-twitter-square" aria-hidden="true"></i></a>
            <a href="https://www.facebook.com/" target="_blank"><i className="fa fa-facebook-square" aria-hidden="true"></i></a>
            <a href="https://www.linkedin.com/" target="_blank"><i className="fa fa-linkedin-square" aria-hidden="true"></i></a>
            <a href="https://www.instagram.com/" target="_blank"><i className="fa fa-instagram" aria-hidden="true"></i></a>
          </div>
            <a href="/login" className='link_footer_login mt-3'>login</a>
        </div>
        </div>
      
         
      </div>
    </div>
  )
}

export default Footer
