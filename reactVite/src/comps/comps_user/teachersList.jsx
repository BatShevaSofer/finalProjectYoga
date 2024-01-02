
// TeachersList.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const TeacherModalContent = ({ teacher, handleClose }) => {
    const nav = useNavigate();
    
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>{teacher.user_id.name.firstName} {teacher.user_id.name.lastName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={teacher.user_id.image_url} alt={teacher.user_id.name} style={{ width: '100%' }} />
                <h4>description:</h4>
                <p>{teacher.description}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {/* ניתוב לדף המורה */}
                <Button variant="primary" onClick={() =>nav('/our_teachers')}>
                    all Teachers
                </Button>
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
            <div key={teacher._id} className="col-md-2 col-sm-3">
                <TeacherModal teacher={teacher} />
            </div>
        ))}
    </div>
);

export default TeachersList;


