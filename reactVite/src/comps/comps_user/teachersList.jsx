
// TeachersList.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import calculateAge from './helpers'

const TeacherModalContent = ({ teacher, handleClose }) => {
    const nav = useNavigate();

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>{teacher.user_id.name.firstName} {teacher.user_id.name.lastName}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: '1', order: '2', paddingLeft: '20px', textAlign: 'left' }}>
                    <h5>{`Age: ${calculateAge(teacher.user_id.birthDate)}`}</h5>
                    <h5>Description:</h5>
                    <p>{teacher.description}</p>
                  
                </div>
                <div style={{ flex: '1', order: '1', paddingRight: '20px', textAlign: 'right' }}>
                    <img src={teacher.user_id.image_url} alt={teacher.user_id.name} style={{ width: '100%' , height:'80%'}} />
                  
                </div>
            </Modal.Body>

            <Modal.Footer>
                
                <button className="btn btn-outline-secondary" onClick={() => nav('/our_teachers')}>
                    all Teachers
                </button>
                <button className="btn btn-outline-secondary" onClick={handleClose}>
                    Close
                </button>
            </Modal.Footer>
        </>
    );
}

const TeacherModal = ({ teacher }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="box" onClick={handleShow}>
                <img src={teacher.user_id.image_url} alt={teacher.user_id.name} />
                <h3>{teacher.user_id.name.firstName} {teacher.user_id.name.lastName}</h3>
            </div>

            <Modal show={show} onHide={handleClose}>
                <TeacherModalContent teacher={teacher} handleClose={handleClose} />
            </Modal>
        </>
    );
};

const TeachersList = ({ teachers }) => (

    <div className="row">
        {teachers?.map((teacher) => (
            <div key={teacher._id} className="col-md-2 col-sm-4">
                <TeacherModal teacher={teacher} />
            </div>
        ))}
    </div>
);

export default TeachersList;


