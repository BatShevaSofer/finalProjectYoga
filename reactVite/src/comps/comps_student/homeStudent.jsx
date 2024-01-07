import React, { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import './homeStudent.css';
import FloatingCircle from '../chat/floatingCircle';
import axios from 'axios';
import { API_URL } from '../../services/mainService';
import { AppContext } from '../../contexts/context';


const HomeStudent = () => {
  const {read, setRead} = useContext(AppContext);
  const doApiGetRoom = async () => {
    let url = API_URL + `/chat/room/` + JSON.parse(Cookies.get('user'))._id;
    let data = await axios.get(url);
    console.log(data);
    setRead(data.data[0].studentRead);
    // if(data.length > 0) {


    // }
    // JSON.stringify(Cookies.set('room', data))
  }
  const images = [
    'student/image2.jpg',
    'student/image6.jpg',
    'student/image1.jpg',
    'student/image5.jpg',
    'student/image3.jpg',
    'student/image7.jpg',

  ];
  useEffect(() =>{
    doApiGetRoom();
  },[])
  const fname = (JSON.parse(Cookies.get('user'))).name.firstName
  return (
    <>
      <div className="container">
        <div className="row">
          <div className='col-md-6'>
            <div className=" mt-4">
              <h1 className="display-4">Hi {fname}</h1>
              <p className="lead">Ready to start practicing?</p>
              <Link to="/student/myProgram" className="btn btn-outline-secondary">
                Let's Practice!
              </Link>
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
      <FloatingCircle dataRead={read}/>
    </>
  )
}




export default HomeStudent

