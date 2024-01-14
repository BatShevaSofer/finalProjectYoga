import { useEffect, useState } from "react";
import { useMain } from "../../services/mainService";
import DisplayAllTeachers from './display_all_teachers'
import { LinearProgress } from "@mui/material";
import styled from 'styled-components';


const Container = styled.div`
  min-height: 100vh;
`;
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
            <Container>
                <div className='container-fluid'>
                    <div className='container '>
                        <div gutter={16} className='d-flex justify-content-center mt-4 row'>

                            {teachers ? (teachers.map((teacher) => (
                                (<div className="col-md-4 col-sm-12 mt-3 text-center">
                                    <DisplayAllTeachers key={teacher._id} teacher={teacher} />
                                </div>
                                )
                            ))) : (
                                <LinearProgress />
                            )}
                        </div></div></div>
            </Container>

    );
};

export default OurTeachers;
