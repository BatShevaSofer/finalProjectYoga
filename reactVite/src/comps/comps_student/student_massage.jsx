// import React from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const NotEnrolledMessage = () => {
    const fname = (JSON.parse(Cookies.get('user'))).name.firstName

    return (
        <div>
            <h1 className="display-5">Hi {fname}</h1>

            <h3>You are not enrolled in any courses yet.</h3>
            <h4>Please join a course:</h4>
            <Link to="/student/coursesPage">Join Course</Link>
        </div>
    );
};

export default NotEnrolledMessage;
