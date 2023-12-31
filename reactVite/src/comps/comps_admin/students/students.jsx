import { useEffect, useState } from "react";
import { useAdmin } from "../../../services/adminService";
import DisplayData from "./displayData";
import { LinearProgress } from "@mui/material";
import { Row } from 'antd';

const Students = () => {
    const { getStudents } = useAdmin();
    const [students, setStudents] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getStudents();
                setStudents(data.data);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Row gutter={16} className='d-flex justify-content-center mt-4'>
                {students ? (students.map((student) => (
                    (
                        <DisplayData key={student._id} data={student} />
                    )
                ))) : (
                    <LinearProgress />
                )}
            </Row>
        </div>
    );
};

export default Students;
