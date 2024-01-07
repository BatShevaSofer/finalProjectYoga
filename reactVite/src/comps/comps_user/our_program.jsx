import React from 'react';
import { Card, Button } from 'react-bootstrap';
import {useNavigate } from 'react-router-dom';


const OurProgram = ({ title}) => {
    const nav = useNavigate();
    const handleJoinClick = () => {
        nav('/signUp')
    };

    return (
        <div className='container'>
          

            {/* <p>{additionalText}</p> */}
            <h1>{title} Program</h1>
            <div className="d-flex justify-content-around">
                <div className="mt-4">
                    <Card style={{ width: '25rem', height: '20rem' }}>
                        <Card.Body>
                            <Card.Title><h2>Beginners</h2></Card.Title>
                            Yoga classes for<strong>beginners</strong>  are designed for those who are taking their first steps in yoga.
                            For those who want to thoroughly and methodically learn the basics of yoga poses in a precise and clear way, and develop for themselves a personal discipline of practice.
                            <Button variant="primary" className="mx-2"
                                onClick={handleJoinClick}
                            >Join</Button>
                        </Card.Body>
                    </Card>

                </div>
                <div className="mt-4">
                    <Card style={{ width: '25rem', height: '20rem' }}>
                        <Card.Body>
                            <Card.Title><h2>Advanced</h2></Card.Title>
                            Yoga classes for <strong>advanced</strong> students are intended for students who have been practicing for about a year and a half to two years in a row, and who have a basic understanding of postures, know the instructors and the basic instructions of each instructor.
                            <Button variant="primary" className="mx-2"
                                onClick={handleJoinClick}
                            >Join</Button>
                        </Card.Body>
                    </Card>

                </div>
                <div className="mt-4">
                    <Card style={{ width: '25rem', height: '20rem' }}>
                        <Card.Body>
                            <Card.Title><h2>Experts</h2></Card.Title>
                            Yoga classes for <strong>experts</strong> are intended for experienced practitioners who have been practicing for at least two consecutive years.
                            The practice is suitable for practitioners of different methods.
                            Familiarity with yoga instructors and breathing practices - asana and pranayama, and familiarity with working with yoga aids is required.
                            The ability to stay in inverted positions is required (at least 5 minutes in headstand - Shirasasana).
                            <Button variant="primary" className="mx-2"
                                onClick={handleJoinClick}
                            >Join</Button>
                        </Card.Body>
                    </Card>

                </div>
            </div>
        </div>
    );
};

export default OurProgram;
