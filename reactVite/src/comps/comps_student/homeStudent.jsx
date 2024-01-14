import React, { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import './homeStudent.css';
import FloatingCircle from '../chat/floatingCircle';
import axios from 'axios';
import { API_URL } from '../../services/mainService';
import { AppContext } from '../../contexts/context';
import styled from 'styled-components';


const Container = styled.div`
  min-height: 100vh;
`;
const HomeStudent = () => {
  const { read, setRead } = useContext(AppContext);
  const doApiGetRoom = async () => {
    let url = API_URL + `/chat/room/` + JSON.parse(Cookies.get('user'))._id;
    let data = await axios.get(url);
    console.log(data);
    setRead(data.data[0].studentRead);
   
  }
  const images = [
    'student/image2.jpg',
    'student/image6.jpg',
    'student/image1.jpg',
    'student/image5.jpg',
    'student/image3.jpg',
    'student/image7.jpg',

  ];
  useEffect(() => {
    doApiGetRoom();
  }, [])
  const fname = (JSON.parse(Cookies.get('user'))).name.firstName
  return (
    <Container>
      <div className="container">
        <div className="row">
          <div className='col-md-6'>
            <div className=" mt-4">
              <h1 className="display-4">Hi {fname}</h1>
              <p className="lead">Ready to start practicing?</p>
              <Link to="/student/predict" className="btn btn-outline-secondary">
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
      <FloatingCircle role={'student'} />
    </Container>
  )
}




export default HomeStudent

