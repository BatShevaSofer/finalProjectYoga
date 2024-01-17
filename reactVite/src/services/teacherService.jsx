
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export const API_URL = "https://yogaprojectbsmch.onrender.com"



export const useTeacher = () => {
  // const nav = useNavigate();




  // const getTeacherProfile = async () => {
  //   try {
  //     let resp = await axios.get(`${API_URL}/teachers/`, {
  //       headers: {
  //         "x-api-key": JSON.parse(Cookies.get('token'))
  //       }
  //     })
  //     console.log(resp);
  //     return resp;
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }

  // }

  const getTeacherProfile = async () => {
    try {
      const token = Cookies.get('token');


      if (!token) {
        console.error("Authentication token is missing.");
        return null;
      }

      const resp = await axios.get(`${API_URL}/teacher/`, {
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
  const getUserIdByTeacher = async (id) => {
    try {
      const token = Cookies.get('token');


      if (!token) {
        console.error("Authentication token is missing.");
        return null;
      }

      const resp = await axios.get(`${API_URL}/teacher/teacherbyid/${id}`, {
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

  const getCoursesTeacher = async () => {
    try {
      const token = Cookies.get('token');
      let resp = await axios.get(`${API_URL}/teacher/courses`, {
        headers: {
          "x-api-key": token
        }
      })
      console.log(resp);
      return resp;
    }
    catch (err) {
      console.log(err);
    }


  }
  const updateDetiles = async (_update, _to) => {
    try {
      const token = Cookies.get('token');

      let resp = await axios.patch(
        `${API_URL}/teacher/updateDetiles`,
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


  const getCourseTeachereById = async (id) => {
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
  const getChats = async (id) => {
    try {
      let resp = await axios.get(`${API_URL}/teacher/chats`, {
        headers: {
          "x-api-key": Cookies.get('token')
        }
      })
      console.log(resp);
      return resp;
    }
    catch (err) {
      console.log(err);
    }
  }

  return { getTeacherProfile, getCoursesTeacher, getCourseTeachereById, updateDetiles, getChats, getUserIdByTeacher }


}