
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export const API_URL = "https://yogaprojectbsmch.onrender.com"



export const useStudent = () => {
  




  

  const getStudentProfile = async () => {
    try {
      const token = Cookies.get('token');
      
      
      if (!token) {
        console.error("Authentication token is missing.");
        return null;
      }
  
      const resp = await axios.get(`${API_URL}/student/`, {
        headers: {
          "x-api-key": token
        }
      });
  
      console.log(resp);
      return resp;
    } catch (err) {
      console.error("Error fetching teacher profile:", err);
      if (err.response) {
        console.error("Server responded with:", err.response.data);
      }
      return null;
    }
  };

  
  const updateDetiles = async (_update, _to) => {
    try {
      console.log('_update:', _update);
      console.log('_to:', _to);
      const token = Cookies.get('token');
      console.log(token);

      let resp = await axios.patch(
        `${API_URL}/student/updateDetiles`,
        {
          "update": _update,
          "to": _to
        },
        {
          headers: {
            "x-api-key": token
          }
        }
      );
  
      console.log('Response from updateDetiles:', resp);
      return resp;
    } catch (error) {
      console.error('Error in updateDetiles:', error);
    }
  };


    const getCourse = async () => {
    try {
      const token = Cookies.get('token');
      let resp = await axios.get(`${API_URL}/student/course`, {
        headers: {
          "x-api-key": token
        }
      })
      return resp;
    }
    catch (err) {
      console.log(err);
    }


  }

  const addStudentToCourse = async (idCourse, idStudent) => {
    try {
      await axios.patch(`${API_URL}/student/course/${idCourse}/student/${idStudent}`, null, {
        headers: {
          "x-api-key": Cookies.get('token')
        }
      });
  
      return true;  // הוספת הסטודנט לקורס הצליחה
    } catch (err) {
      console.error(err);
      return false; // הוספת הסטודנט לקורס נכשלה
    }
  };
  


    return { getStudentProfile,updateDetiles,getCourse,addStudentToCourse}

  
}