import  { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
const token= (JSON.parse(Cookies.get('user'))) ;


const TeacherProfile = () => {
  const [teacherInfo, setTeacherInfo] = useState(null);

  useEffect(() => {
    const fetchTeacherInfo = async () => {
      try {
        const response = await fetch('/api/teacher', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Replace with your actual access token
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTeacherInfo(data);
        } else {
          console.error('Failed to fetch teacher info');
        }
      } catch (error) {
        console.error('Error fetching teacher info:', error);
      }
    };

    fetchTeacherInfo();
  }, []);

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
