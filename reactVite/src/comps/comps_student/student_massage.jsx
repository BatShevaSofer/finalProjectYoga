import React from 'react';
import { Link } from 'react-router-dom';

const NotEnrolledMessage = () => {
    return (
        <div>
            <p>You are not enrolled in any courses yet.</p>
            <p>Please join a course:</p>
            <Link to="/courses">Join Courses</Link>
        </div>
    );
};

export default NotEnrolledMessage;