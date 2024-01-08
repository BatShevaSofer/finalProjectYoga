import { Button, Card, Col, Modal } from 'antd'

import { Content } from 'antd/es/layout/layout';
import  { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../contexts/context';
import ChatScreen from './chatScreen';

const DisplayChats = ({ data, socket }) => {
    const [visible, setVisible] = useState(false);
    const { readT, setReadT } = useContext(AppContext)
    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : '';
    };
    useEffect(() => {
        setReadT(data.teacherRead)
    }, [])
    return (
        <div>
            <Col span={7} className='mt-3 text-center'>
                <Card title={`${data?.student_id?.name?.firstName} - ${data?.student_id?.name?.lastName}`} className='shadow'>
                    {data.student_id?.image_url ? (<div style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        margin: '0 auto',
                        backgroundImage: `url("${data.student_id?.image_url}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}>
                    </div>) : (
                        <div style={{
                            backgroundColor: '#a16e77',
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            margin: '0 auto',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '2em',
                            color: 'white'
                        }}><strong>{getInitials(data.student_id?.name.firstName)}</strong></div>
                    )}
                    {(data.teacherRead != 0) ? (
                        <Content className='text-danger m-2'><strong>Unread messages: {readT}</strong></Content>
                    ) : null}

                    <Button
                        onClick={() => { setVisible(!visible) }}
                        className='mt-2'
                    >Open chat</Button>



                </Card>

                <Modal
                    visible={visible}
                    onCancel={() => { setVisible(!visible) }}
                    style={{ padding: 0 }}
                    footer={null}
                    
                >
                    <ChatScreen socket={socket} data={data}/>

                </Modal>
            </Col>
        </div>
    )
}

export default DisplayChats
