import { useEffect, useState } from 'react';
import { useMain } from "../../services/mainService";
import DisplayAllCourses from './display_all_courses';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const nav=useNavigate()
  const { getCoursesDetails } = useMain();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCoursesDetails();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='container'>
      <div className="mt-5">
      <div className='row'>
        <div className='col-md-12'>
          <div className="text-center">
            <h1 className="display-4">Explore a Variety of Yoga Courses with Us</h1>
            <p className="lead">
              Our yoga courses cater to all ages and levels, from beginners who are new to yoga
              to experts who have been in the field for years. Our instructors are graduates of
              our programs, equipped with professional certifications. Feel free to learn more
              about us in the comments, discover the courses available, and sign in 
              <button className='btn btn-outline-secondary'  onClick={() =>nav('/signUp')}>Join us</button>
            </p>
          </div>
          <div className="jumbotron jumbotron-fluid mt-5 text-center">
            <Container>
              <h3 className="display-5 ">Yoga is a way of life</h3>
              <p className="lead">
                Embrace the journey of self-discovery through the practice of yoga.
              </p>
            </Container>
          </div>
        </div>
        <div className="col-md-12">
          <div className="image-list">
            {/* Add code to display images here */}
            <img className="col-md-2" src="/home/program (1).jpg" alt="" width={250}/>
            <img className="col-md-2" src="/home/program (2).jpg" alt="" width={250}/>
            <img className="col-md-2" src="/home/program (3).jpg" alt="" width={250}/>
            <img className="col-md-2" src="/home/program (4).jpg" alt="" width={250}/>
            <img className="col-md-2" src="/home/program (5).jpg" alt="" width={250}/>
          </div>
        </div>
      </div>
      <div className='row '>
        <div  className="text-center border mt-4 py-4">
          <h3>payment</h3>
          <h5>Monthly payment is collected via direct debit/credit, $200 per month.</h5>
          <Button variant="outline-secondary">More Info</Button>
        </div>
      </div>
      <div className='row'>
        <div className className="text-center mt-4">
          <h3>We're looking forward to welcoming you!!!</h3>
        </div>
      </div>
      </div>
      <DisplayAllCourses courses={courses} />
    </div>
  );
};

export default App;

