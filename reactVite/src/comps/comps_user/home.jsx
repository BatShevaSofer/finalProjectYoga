// import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMain } from "../../services/mainService";
import TeachersList from './teachersList';
import { Carousel } from 'react-bootstrap';

const Home = () => {
  const { getTeacherD } = useMain();
  const [teachers, setTeachers] = useState([]);

  const nav = useNavigate();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await getTeacherD();
        const slicedData = data.slice(0, 6);
        setTeachers(slicedData);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div>
      <div className="article">
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" style={{ height: '90vh' }}>
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" >
              <img src="main.jpg" className="d-block w-100" alt="..." style={{ height: '90vh' }} />
              <div className="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>Some representative placeholder content for the first slide.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="main3.jpg" className="d-block w-100" alt="..." style={{ height: '90vh' }} />
              <div className="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>Some representative placeholder content for the second slide.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="yoga (3).jpg" className="d-block w-100" alt="..." style={{ height: '90vh' }} />
              <div className="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>Some representative placeholder content for the third slide.</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev" >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container-fluid my-4">
        <div className="container py-4">
          <div className="col-md-9 text-center mx-auto welcome_text" >
            <h1 className="display-4">Welcome to Yoga Courses Hub</h1>
            <p className="lead">
              Discover personalized yoga courses for all ages and skill levels. Our expert instructors blend traditional wisdom with modern approaches, fostering growth in a supportive community.
              <br />
              Our site integrates seamlessly with home training through an intuitive app. Stay connected, track progress, and experience a virtual extension of our studio.
            </p>
            <p className="lead">
              Commit to your well-being. Elevate your practice, enrich your life. Embrace harmony with us. Namaste.
            </p>
          </div>
        </div>
      </div>
      <div className="age_group container-fluid mt-5">
        <h2 className=' p-4 display-3'>for evreyone......</h2>
        <div className="row mt-4">
          <div className="col-md-4">
            <div className=" text-center position-relative">
              <Link to='/program/kids_program'>
                <img
                  src="kids.jpg"
                  className="card-img-top rounded-circle larger-circle "
                  alt="Kids"
                />
              </Link>

              <div className="card-title-overlay">
                <h2 className="card-title display-2"><strong>KIDS</strong></h2>
                <div className="card-body">
                  <button className='btn btn-secondary' onClick={() => { nav('/program/kids_program') }}>for details..</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className=" text-center position-relative">
              <Link to='/program/teens_program'>
                <img
                  src="teens (2).jpg"
                  className="card-img-top rounded-circle larger-circle"
                  alt="Teen"
                />
              </Link>

              <div className="card-title-overlay">
                <h2 className="card-title display-2"><strong>TEENS</strong></h2>
                <div className="card-body">
                  <button className='btn btn-secondary' onClick={() => { nav('/program/teens_program') }}>for details..</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className=" text-center position-relative">
              <Link to='/program/adult_program'>
                <img
                  src="adult.jpg"
                  className="card-img-top rounded-circle larger-circle"
                  alt="Adult"
                />
              </Link>

              <div className="card-title-overlay">
                <h2 className="card-title display-2"><strong>ADULT</strong></h2>
                <div className="card-body">
                  <button className='btn btn-secondary' onClick={() => { nav('/program/adult_program') }}>for details..</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className=" what_yoga container-fluid my-4 ">
        <div className="container center my-4">
          <div className="box  mx-auto">
            <h2 className='my-4'>
              <strong> What is yoga?</strong>
            </h2>
            <p className="col-md-9 mx-auto text-center mt-4">
              Yoga is a physical and spiritual practice that integrates body, mind, and spirit. Through the practice of movement, postures, and breath control, yoga promotes flexibility, strength, stability, and internal focus. Beyond the physical benefits, it serves as a tool for calming the mind, reducing stress, and enhancing self-awareness. With its versatility, yoga is suitable for all ages and fitness levels, providing care for both the body and the spirit. It creates unique experiences of mindfulness and connection.</p>
            {/* <button class="btn btn-warning  px-5 text-white center">Join us</button> */}
          </div>
          <a href='/signUp' className='joinus_href text-center'>to enjoy, please join ⟩⟩⟩ </a>
        </div>
      </div>
      <div className="team container-fluid m-0">
        <div className=" py-4 text-center ">
          <h2 className="display-5 my-4">Meet our teachers</h2>
          <div className="row">
          <TeachersList teachers={teachers} />

        {/* {teachers?.map((teacher) => (
          <div key={teacher._id} className="col-md-2 col-sm-3 box">
            <img src={teacher.user_id.image_url} alt={teacher.user_id.name} />
            <h3> {teacher.user_id.name.firstName} {teacher.user_id.name.lastName}</h3>
          </div>
        ))} */}
      </div>

        </div>

      </div>
      <div className=' container-fluid txt_customers m-0 p-0'>
        <div className="container">
          <h2 className='p-3'>What our customers say about us:</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <Carousel>
                <Carousel.Item>
                  <div className="testimonial">
                    <p>"I absolutely love the personalized yoga courses! The blend of traditional wisdom and modern approaches is fantastic. The supportive community and seamless integration with the home training app make it a perfect fit for my wellness journey. Namaste!"</p>
                    <h5>Bili Naor</h5>
                  </div>
                </Carousel.Item>

                <Carousel.Item>
                  <div className="testimonial">
                    <p>"Discovering this platform has been a game-changer for my yoga practice. The expert instructors and the virtual extension of the studio provide an enriching experience. Staying connected and tracking my progress has never been this easy. Thank you for fostering growth in such a supportive environment!"</p>
                    <h5>Shir Levi</h5>
                  </div>
                </Carousel.Item>

                <Carousel.Item>
                  <div className="testimonial">
                    <p>"Committing to my well-being with this system was one of the best decisions I've made. The intuitive app and the seamless integration with home training make it convenient and enjoyable. Elevating my practice and embracing harmony has truly enriched my life. Grateful for this amazing community. Namaste!"</p>
                    <h5>Shevi Mor</h5>
                  </div>
                </Carousel.Item>

              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <footer className="container-fluid">
        <div className=" text-center">
          <p>© Bat-Sheva Sofer & Efrat Gavriel & Aviya Ben-Tzur | developer | 2023 </p>

        </div>

      </footer>
    </div>
  )
}

export default Home