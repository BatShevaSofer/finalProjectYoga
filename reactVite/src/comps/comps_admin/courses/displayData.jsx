import { Button, Card, Col, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useAdmin } from "../../../services/adminService";
// export default DisplayData;


const DisplayData = ({ data }) => {
    const [visible, setVisible] = useState(false);
    const [visibleAddTeacher, setVisibleAddTeacher] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState({ "user_id": { "name": { "firstName": "select", "lastName": "teacher" } } });
    const levels = ['Beginners', 'advanced', 'experts']
    const { getTeachers, addTeacherToCourse } = useAdmin();
    const showModal = () => {
        setVisible(true);
    };
    useEffect(() => {
        getTeachers().then((teachers) => {
            console.log("teachers: ", teachers);
            setTeachers(teachers)
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const handleCancel = () => {
        setVisible(false);
    };
    const showModalAddTeacher = () => {
        setVisibleAddTeacher(true);

    };
    useEffect(() => {
        console.log("selectedTeacher", selectedTeacher);
    }, [selectedTeacher])


    const handleCancelAddTeacher = () => {
        setVisibleAddTeacher(false);
    };
    const handleSelect = (id) => {
        const teacher = teachers.find((t) => t._id === id);
        setSelectedTeacher(teacher);
    };


    const handleAddTeacher = async () => {
        if (selectedTeacher.user_id.name.firstName != "select") {
            addTeacherToCourse(data._id, selectedTeacher._id).then((teacher) => {
                console.log(teacher);
            }).catch((err) => {
                alert(err);
            });
        }
        else{
            alert("Please select a teacher");
        }
    }
    return (
        <>
            <Col span={8} className='mt-3 text-center'>
                <Card title={`${levels[data.level - 1]} - ${data.gender ? 'Male' : 'Female'} - ${data.ageGroup}`} className='shadow'>
                    <p>day: {data.dateTime.day}</p>
                    <p>hour: {data.dateTime.hour}</p>
                    <p>Teacher: {data.teacherId?.user_id.name.firstName} {data.teacherId?.user_id.name.lastName}</p>
                    <Button onClick={showModal}>view students</Button>
                    {
                        !data.teacherId ? (
                            <Button className="mx-2" onClick={showModalAddTeacher}>add teacher</Button>
                        ) : null
                    }
                </Card>
            </Col>
            <Modal
                title="Students"
                visible={visible}
                onCancel={handleCancel}
                footer={null}
            >
                {data.students && data.students.map((student) => {
                    return <p key={student._id}>{student.name.firstName}  {student.name.lastName}</p>;
                })}

            </Modal>
            <Modal
                title="Add teacher"
                visible={visibleAddTeacher}
                onCancel={handleCancelAddTeacher}
                footer={null}
                className="text-center"
            >
                <label className="m-4"><strong>Select teacher:</strong></label>
                <Select value={`${selectedTeacher?.user_id?.name.firstName} ${selectedTeacher?.user_id?.name.lastName}`} onChange={handleSelect}>
                    <option value="">select teacher</option>
                    {teachers ? (teachers.map((teacher) => (
                        <option key={teacher._id} value={teacher._id}>
                            {`${teacher.user_id.name.firstName} ${teacher.user_id.name.lastName}`}
                        </option>
                    ))) : (
                        <option >
                            no teachers
                        </option>
                    )
                    }
                </Select>

                <Button onClick={handleAddTeacher}>Add</Button>
            </Modal>
        </>
    );
}

export default DisplayData;
