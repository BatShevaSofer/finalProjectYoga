import React from 'react';
import { Card, Collapse } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './our_program.css';

const OurProgram = ({ title }) => {
    const nav = useNavigate();

    const handleJoinClick = () => {
        nav('/signUp');
    };
    let additionalText = '';
    let collageImages = [];
    if (title === 'Kids') {
        additionalText = 'Yoga classes for kids are specially designed for young minds to explore yoga in a fun and playful way.';
        collageImages = ['kids (2).jpg', 'kids (6).jpg', 'kids (5).jpg', 'kids (4).jpg', 'kids (7).jpg'];
    } else if (title === 'Teens') {
        additionalText = 'Yoga classes for teens focus on building strength, flexibility, and mindfulness in a supportive environment.';
        collageImages = ['teens (1).jpg', 'teens (2).jpg', 'teens (4).jpg', 'teens (5).jpg', 'teens (8).jpg'];
    } else if (title === 'Adult') {
        additionalText = 'Yoga classes for adults cater to a diverse range of practitioners, providing a holistic approach to health and well-being.';
        collageImages = ['adult (2).jpg', 'adult (4).jpg', 'adult (5).jpg', 'adult (6).jpg'];
    }
    return (
        <div className='container-fluid text-center'>

            <h1 className='mt-4 title_program'>{title} Program</h1>
            <p className="large-font">{additionalText} </p>
            <Collapse in={true}>
                <div className="collage-container">
                  {collageImages.map((image, index) => (
                    <img key={index} src={`home/age_program/${image}`} alt={`Collage ${index + 1}`} className="collage-image" width={280} height={280} style={{ margin: '8px' }} />
                  ))}
                </div>
              </Collapse>
            <div className="d-flex justify-content-around">
                <div className="mt-4 col-md-3 col-sm-4 ">
                    <Card className="custom-card">
                        <Card.Body>
                            <Card.Title><h2 className="pink-text">Beginners</h2></Card.Title>
                            <p className="large-font">
                                Yoga classes for <strong>beginners</strong> are designed for those who are taking their first steps in yoga.
                                For those who want to thoroughly and methodically learn the basics of yoga poses in a precise and clear way, and develop for themselves a personal discipline of practice.
                            </p>
                        </Card.Body>
                    </Card>
                </div>
                <div className="mt-4 col-md-3 col-sm-4">
                    <Card className="custom-card">
                        <Card.Body>
                            <Card.Title><h2 className="pink-text">Advanced</h2></Card.Title>
                            <p className="large-font">
                                Yoga classes for <strong>advanced</strong> students are intended for students who have been practicing for about a year and a half to two years in a row, and who have a basic understanding of postures, know the instructors and the basic instructions of each instructor.
                            </p>
                        </Card.Body>
                    </Card>
                </div>
                <div className="mt-4 col-md-3 col-sm-4">
                    <Card className="custom-card">
                        <Card.Body>
                            <Card.Title><h2 className="pink-text">Experts</h2></Card.Title>
                            <p className="large-font">
                                Yoga classes for <strong>experts</strong> are intended for experienced practitioners who have been practicing for at least two consecutive years.
                                The practice is suitable for practitioners of different methods.
                                Familiarity with yoga instructors and breathing practices - asana and pranayama, and familiarity with working with yoga aids is required.
                                The ability to stay in inverted positions is required (at least 5 minutes in headstand - Shirasasana).
                            </p>
                        </Card.Body>
                    </Card>
                </div>
            </div>
          

            <div className='text-center mt-4'>
                <button className="btn btn-outline-danger mx-4 col-md-2 " onClick={handleJoinClick}>Join Us</button>
            </div>
        </div>
    );
};

export default OurProgram;
