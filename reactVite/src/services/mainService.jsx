
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export const API_URL = "https://yogaprojectbsmch.onrender.com"


export const useMain = () => {
  const nav = useNavigate();


  const login = async (_email, _password) => {
    try {
      let resp = await axios.post(`${API_URL}/login`, {
        "email": _email,
        "password": _password
      });
      console.log(resp);
      Cookies.set('token', resp.data.token);
      Cookies.set('user', JSON.stringify(resp.data.user));
      // console.log(JSON.parse(Cookies.get('user')));
      nav(`/${resp.data.user.role}`)
      return resp;
    }
    catch (error) {
      console.log(error);
      return error;

    }
  }

  const signUp = async (_idNumber, _firstName, _lastName, _email, _password, _phone, _hmo, _birthdate, _city, _street, _home, _gender, _imageUrl) => {
    try {
      let resp = await axios.post(`${API_URL}/signup`, {
        "id_number": _idNumber,
        "name": {
          "firstName": _firstName,
          "lastName": _lastName
        },
        "password": _password,
        "birthDate": _birthdate,
        "email": _email,
        "phone": _phone,
        "gender": Boolean(_gender),
        "location": {
          "city": _city,
          "street": _street,
          "home": Number(_home)
        },
        "HMO": _hmo,
        "image_url": _imageUrl

      });
      Cookies.set('user', JSON.stringify(resp.data.user));
      nav(`/login`)
      return resp;
    }
    catch (error) {
      console.log(error);
    }
  }
  const sendMail = async (to) => {
    try {
      let resp = await axios.post(`${API_URL}/sendMail`, {
        "to": to,
      });
      console.log(resp);
      return resp;

      // console.log(JSON.parse(Cookies.get('user')));
      // nav(`/${resp.data.user.role}`)
      // return resp;
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }
  const resetP = async (email, newP, passwordV) => {
    try {
      let resp = await axios.patch(`${API_URL}/resetpassword`, {
        "passwordV": passwordV,
        "password": newP,
        "email": email
      });
      console.log(resp);
      return resp;

      // console.log(JSON.parse(Cookies.get('user')));
      // nav(`/${resp.data.user.role}`)
      // return resp;
    }
    catch (error) {
      console.log(error);
      alert()
      throw error;
    }
  }
  const getTeacherD = async () => {
    try {
      const resp = await axios.get(`${API_URL}/teacherDetails/`);
      const data = resp.data;
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };
  const getCoursesDetails = async () => {
    try {
      let resp = await axios.get(`${API_URL}/coursesDetails`)
      const data = resp.data;
      console.log(data);
      return data;
    }
    catch (err) {
      console.log(err);
    }
  }




  return { login, signUp, sendMail, resetP, getTeacherD, getCoursesDetails }

}
