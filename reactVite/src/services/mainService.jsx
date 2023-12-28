
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export const API_URL = "http://localhost:3003"



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
      alert(error.message);
    }
  }
  const signUp = async (_idNumber, _firstName, _lastName, _email, _password, _phone, _hmo, _birthdate) => {
    try {
      let resp = await axios.post(`${API_URL}/signup`, {
        "idNumber": _idNumber,
        "fullName": {
          _firstName,
          _lastName
        }
        ,
        "email": _email,

        "hmo": _hmo,
         "password": _password,
        "phone": _phone,
        "birthdate": _birthdate,
      });
      console.log(resp);
      Cookies.set('token', resp.data.token);
      Cookies.set('user', JSON.stringify(resp.data.user));
      // console.log(JSON.parse(Cookies.get('user')));
      nav(`/login`)
      return resp;
    }
    catch (error) {
      console.log(error);
    }
  }

  return { login, signUp }

}
