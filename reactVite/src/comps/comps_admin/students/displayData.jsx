
import { Avatar, Card, Col } from 'antd';
const levels = ['Beginners', 'advanced', 'experts']
const DisplayData = ({ data }) => {
    const calAge = () => {
        data.birthDate = Date.parse(data.birthDate);
        let birthDateObj = new Date(data.birthDate);
        let currentDate = new Date();
        let age = currentDate.getFullYear() - birthDateObj.getFullYear();
        return age;
    }
    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : '';
    };
   
    return (
        <>
            <Col span={4} className='mt-3 text-center'>

                <Card title={`${data.name.firstName} - ${data.name.lastName}`} className='shadow'>
                    {data.image_url ? (<div style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        margin: '0 auto',
                        backgroundImage: `url("${data.image_url}")`,
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
                        }}><strong>{getInitials(data.name.firstName)}</strong></div>

                    )}
                    <p> age : {calAge()}</p>
                    <p>phone: {data.phone}</p>
                    <p>email: {data.email}</p>
                </Card>
            </Col >
        </>
    );
}

export default DisplayData;

