import { useEffect, useState } from "react";
import { useAdmin } from "../../../services/adminService";
import DisplayData from "./displayData";
import { LinearProgress } from "@mui/material";
import { Row } from 'antd';

const Courses = () => {
    const { getCorses } = useAdmin();
    const [courses, setCourses] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCorses();
                setCourses(data.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Row gutter={16} className='d-flex justify-content-center mt-4'>
                {courses ? (courses.map((course) => (
                    (
                        <DisplayData key={course._id} data={course} />
                        
                    )
                ))) : (
                    <LinearProgress />
                )}
            </Row>
        </div>
    );
};

export default Courses;
