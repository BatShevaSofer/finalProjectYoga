// import React from 'react'

const Home = () => {
  return (
    <div>
      <div className="article">
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" style={{ height: '95vh' }}>
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" >
              <img src="../../../public/image1.jpg" className="d-block w-100" alt="..." style={{ height: '95vh' }} />
              <div className="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>Some representative placeholder content for the first slide.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="../../../public/image2.jpg" className="d-block w-100" alt="..." style={{ height: '95vh' }} />
              <div className="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>Some representative placeholder content for the second slide.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="../../../public/image3.jpg" className="d-block w-100" alt="..." style={{ height: '95vh' }} />
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
      {/* <div className="container">
        <h1>welcome!!!</h1>
        <div>
          <div className="header">
            <h1>Welcome to Yoga Courses Hub</h1>
            <p>Where holistic well-being meets tailored practice</p>
          </div>

          <div className="main-content">
            <div className="course-section">
              <h2>Explore our Yoga Courses</h2>
              <p>Our site hosts a sophisticated system that seamlessly integrates three age groups and three proficiency levels for a comprehensive yoga experience: Beginner, Intermediate, and Advanced.</p>
            </div>

            <div className="course-section">
              <h2>Professional Instructors</h2>
              <p>Our team of dedicated and highly skilled instructors brings their expertise to each course, ensuring a personalized journey for every participant.</p>
            </div>

            <div className="course-section">
              <h2>Home Training App</h2>
              <p>For those who prefer the convenience of home training, we offer a unique solution—an intuitive app seamlessly integrated into our website.</p>
            </div>

            <div className="course-section">
              <h2>Commit to Your Well-being</h2>
              <p>Commit to your well-being and embark on a transformative journey with us. Whether in the studio or at home, our yoga courses are designed to elevate your practice and enrich your life.</p>
              <a href="#" className="cta-button">Get Started</a>
            </div>
          </div>
        </div> */}

      {/* </div> */}
    </div>
  )
}

export default Home