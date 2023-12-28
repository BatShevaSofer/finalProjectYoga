
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export const API_URL = "http://localhost:3001"



export const useTeacher = () => {
  // const nav = useNavigate();




  const getTeacherProfile = async () => {
    try {
      let resp = await axios.get(`${API_URL}/teachers/`, {
        headers: {
          "x-api-key": JSON.parse(Cookies.get('token'))
        }
      })
      console.log(resp);
      return resp;
    }
    catch (err) {
      console.log(err);
    }

  }
  const getCoursesTeacher = async () => {
    try {
      let resp = await axios.get(`${API_URL}/teachers/courses`, {
        headers: {
          "x-api-key": JSON.parse(Cookies.get('token'))
        }
      })
      console.log(resp);
      return resp;
    }
    catch (err) {
      console.log(err);
    }


  }


  const getCourTeachereById = async (id) => {
    try {
        let resp = await axios.get(`${API_URL}/teachers/courses/${id}`, {
            headers: {
                "x-api-key": JSON.parse(Cookies.get('token'))
            }
        })
        console.log(resp);
        return resp;
    }
    catch (err) {
        console.log(err);
    }
}

    return { getTeacherProfile, getCoursesTeacher ,getCourTeachereById}

  
}