import { useEffect, useState } from "react";
import { useAdmin } from "../../../services/adminService";
import DisplayData from "./displayData";
import { LinearProgress } from "@mui/material";
import { Row } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
`;

const Teachers = () => {
    const { getTeachers } = useAdmin();
    const [teachers, setTeachers] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTeachers();
                setTeachers(data);
            } catch (error) {
                console.error("Error fetching teachers:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Container>

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
            </Container>

    );
};

export default Teachers;
