import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
// import { Link } from 'react-router-dom';



const HomeAdmin = () => {

  
  const images = [
    'admin/img (1).jpg',
    'admin/img (2).jpg',
    'admin/img (3).jpg',
    'admin/img (4).jpg',

  ];

  const fname = (JSON.parse(Cookies.get('user'))).name.firstName
  return (
    <>
      <div className="container">
        <div className="row">
          <div className='col-md-6'>
            <div className=" mt-4">
              <h1 className="display-4">Hi {fname}</h1>
             
            </div>
            <div className="jumbotron jumbotron-fluid mt-4">

              <h1 className="display-2 student_title">Yoga is a way of life</h1>
              <p className="lead">
                Embrace the journey of self-discovery through the practice of yoga.
              </p>
            </div>
          </div>
          <div className='col-md-6 mt-4'>
            <div className="image-list mt-4">
              {images.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image} alt={`Image ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}




export default HomeAdmin

