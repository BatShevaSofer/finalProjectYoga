import { useEffect, useState } from "react";
import { useAdmin } from "../../../services/adminService";
import DisplayData from "./displayData";
import { LinearProgress } from "@mui/material";
import { Row } from 'antd';

const Teachers = () => {
    const { getTeachers } = useAdmin();
    const [teachers, setTeachers] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTeachers();
                setTeachers(data.data);
            } catch (error) {
                console.error("Error fetching teachers:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Row gutter={16} className='d-flex justify-content-center mt-4'>
                {teachers ? (teachers.map((teacher) => (
                    (
                        <DisplayData key={teacher._id} data={teacher} />
                    )
                ))) : (
                    <LinearProgress />
                )}
            </Row>
        </div>
    );
};

export default Teachers;
