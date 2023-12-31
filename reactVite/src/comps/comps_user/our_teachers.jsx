import { useEffect, useState } from "react";
import { useMain } from "../../services/mainService";
import DisplayAllTeachers from './display_all_teachers'
import { LinearProgress } from "@mui/material";
import { Row } from 'antd';

const OurTeachers = () => {
    const { getTeacherD } = useMain();
    const [teachers, setTeachers] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTeacherD();

                setTeachers(data);
            } catch (error) {
                console.error("Error fetching teachers:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Row gutter={16} className='d-flex justify-content-center mt-4'>
                {teachers ? (teachers.map((teacher) => (
                    (
                        <DisplayAllTeachers key={teacher._id} teacher={teacher}  />
                    )
                ))) : (
                    <LinearProgress />
                )}
            </Row>
        </>
    );
};

export default OurTeachers;
