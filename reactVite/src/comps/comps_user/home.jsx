// import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMain } from "../../services/mainService";
import TeachersList from './teachersList';
import { Carousel } from 'react-bootstrap';

const Home = () => {
  const { getTeacherD } = useMain();
  const [teachers, setTeachers] = useState([]);
  const address = "128 Yigal Alon St, Tel Aviv";

  const nav = useNavigate();

  const handleButtonClick = (page) => {
    nav(`/${page}`);
  };

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
              <div className="carousel-caption d-none d-md-block ">
                {/* <h2 ><em>WELCOME</em></h2> */}
                <h4 className='display-2'><em>Yoga is a way of life</em>  </h4>

              </div>
            </div>
            <div className="carousel-item">
              <img src="main3.jpg" className="d-block w-100" alt="..." style={{ height: '90vh' }} />
             
            </div>
            <div className="carousel-item">
              <img src="yoga (3).jpg" className="d-block w-100" alt="..." style={{ height: '90vh' }} />
            
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
        <div className="container py-4" >
          <div className="col-md-9 text-center mx-auto welcome_text"  >
            <h1 className="display-4"  >Welcome to Yoga Courses Hub</h1>
            <p className="lead">
              Discover personalized yoga courses for all ages and skill levels. Our expert instructors blend traditional wisdom with modern approaches, fostering growth in a supportive community.
              <br />
              Our site integrates seamlessly with home training through an intuitive app. Stay connected, track progress, and experience a virtual extension of our studio.
            </p>
            <p className="lead" >
              Commit to your well-being. Elevate your practice, enrich your life. Embrace harmony with us. Namaste.
            </p>
          </div>
        </div>
      </div>
      <div className="age_group container-fluid mt-5">
        <h2 className=' p-4 display-3' >for evreyone......</h2>
        <div className="row mt-4">
          <div className="col-md-4">
            <div className=" text-center position-relative">
                <img
                  src="kids.jpg"
                  className="card-img-top rounded-circle larger-circle "
                  alt="Kids"
                />

              <div className="card-title-overlay">
                <h2 className="card-title display-2"><strong>KIDS</strong></h2>
                <div className="card-body">
                  <button className='btn btn-secondary' onClick={() => handleButtonClick('kids')}>for details..</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className=" text-center position-relative">
                <img
                  src="teens (2).jpg"
                  className="card-img-top rounded-circle larger-circle"
                  alt="Teen"
                />

              <div className="card-title-overlay">
                <h2 className="card-title display-2"><strong>TEENS</strong></h2>
                <div className="card-body">
                  <button className='btn btn-secondary' onClick={() => handleButtonClick('teens')}>for details..</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className=" text-center position-relative">
                <img
                  src="adult.jpg"
                  className="card-img-top rounded-circle larger-circle"
                  alt="Adult"
                />

              <div className="card-title-overlay">
                <h2 className="card-title display-2"><strong>ADULT</strong></h2>
                <div className="card-body">
                  <button className='btn btn-secondary' onClick={() => handleButtonClick('adult')}>for details..</button>
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
          </div>

        </div>

      </div>
      <div className='container-fluid my-4'>
        <div className='container text-center my-4'>
          <div className='row'>
            <div className='col-md-6 mt-4'>
              <h2 className='display-5'>Our Location</h2>
              <p className='display-1'>{address}</p>
            </div>
            <div className='col-md-6'>
              <iframe
                title="Google Map"
                width="600"
                height="450"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.799361639956!2d34.7984235249077!3d32.074675019548174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4b987755e617%3A0xb52d651b7217d7b0!2z15nXkteQ15wg15DXnNeV158gMTI4LCDXqtecINeQ15HXmdeRLdeZ16TXlQ!5e0!3m2!1siw!2sil!4v1704566731218!5m2!1siw!2sil"
                allowFullScreen
              ></iframe>
            </div>
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

export default Home;