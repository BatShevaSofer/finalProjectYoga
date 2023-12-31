
import { Card, Col } from 'antd';
const levels = ['Beginners', 'advanced', 'experts']
const DisplayData = ({ data }) => {
    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : '';
    };

    return (
        <>
            <Col span={4} className='mt-3 text-center'>

                <Card title={`${data.user_id?.name?.firstName} - ${data.user_id?.name?.lastName}`} className='shadow'>
                    {data.user_id.image_url ? (<div style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        margin: '0 auto',
                        backgroundImage: `url("${data.user_id.image_url}")`,
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
                        }}><strong>{getInitials(data.user_id.name.firstName)}</strong></div>

                    )}
                </Card>
            </Col>
        </>
    );
}

export default DisplayData;