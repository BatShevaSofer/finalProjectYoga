
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export const API_URL = "http://localhost:3001"



export const useAdmin = () => {
    // const nav = useNavigate();


    const getCorses = async () => {
        try {
            let resp = await axios.get(`${API_URL}/admin/courses`, {
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


    const getCourseById = async (id) => {
        try {
            let resp = await axios.get(`${API_URL}/admin/course/${id}`, {
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


    const getTeachers = async () => {
        try {
            let resp = await axios.get(`${API_URL}/admin/teachers`, {
                headers: {
                    "x-api-key": Cookies.get('token')
                }
            })
            console.log(resp);
            return resp.data;
        }
        catch (err) {
            console.log(err);
        }
    }

    const getTeacherById = async (id) => {
        try {
            let resp = await axios.get(`${API_URL}/admin/teachers/${id}`, {
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

    const getStudents = async () => {
        try {
            let resp = await axios.get(`${API_URL}/admin/students`, {
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


    const getStudentById = async (id) => {
        try {
            let resp = await axios.get(`${API_URL}/admin/students/${id}`, {
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

    const addCourse = async () => {
        try {
            let resp = await axios.post(`${API_URL}/admin/course`, {
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

    const addTeacherToCourse = async (idCourse, idTeacher) => {
        try {
            let resp = await axios.patch(`${API_URL}/admin/course/${idCourse}/teacher/${idTeacher}`, null, {
                headers: {
                    "x-api-key": Cookies.get('token')
                }
            })
            console.log(resp);
            window.location.reload()
            return resp;
        }
        catch (err) {
            console.log(err);
            return err.message;
        }
    }

    const addTeacher = async (id) => {
        try {
            let resp = await axios.patch(`${API_URL}/admin/teacher/${id}`, null, {
                headers: {
                    "x-api-key": Cookies.get('token')
                }
            });
            console.log(resp);
            window.location.reload();
            return resp;
        }
        catch (err) {
            console.log(err);
        }
    }


    return { getCorses, getCourseById, getTeachers, getTeacherById, getStudents, getStudentById, addTeacherToCourse, addTeacher, addCourse }
}
