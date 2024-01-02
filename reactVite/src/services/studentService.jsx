
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export const API_URL = "http://localhost:3001"



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
      const token = Cookies.get('token');
  
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
  
      console.log(resp);
      return resp;
    } catch (err) {
      console.log(err);
    }
  };
  

  

    return { getStudentProfile,updateDetiles}

  
}