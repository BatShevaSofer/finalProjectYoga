import {useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
// const token= (JSON.parse(Cookies.get('user'))) ;
import { useTeacher } from '../../services/teacherService'

const TeacherProfile = () => {
  const [teacherInfo, setTeacherInfo] = useState(null);
  const { getTeacherProfile } = useTeacher();

 useEffect(() => {
  const fetchData = async () => {
    try {
        const data = await getTeacherProfile();
        setTeacherInfo(data.data);
    } catch (error) {
        console.error("Error fetching courses:", error);
    }
};

fetchData();
 },[])
 


  return (
    <div>
      <h1>Teacher Profile</h1>
      {teacherInfo ? (
        <div>
          <p>Name: {teacherInfo.name.firstName} {teacherInfo.name.lastName}</p>
          <p>Email: {teacherInfo.email}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading teacher info...</p>
      )}
    </div>
  );
};

export default TeacherProfile;
