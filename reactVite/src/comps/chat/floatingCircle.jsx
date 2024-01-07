import { useContext, useState } from 'react';
import { Button } from 'antd';
import Cookies from 'js-cookie';
import ChatScreen from './chatScreen';
import { API_URL } from '../../services/adminService'
import socketIO from 'socket.io-client'
import { AppContext } from '../../contexts/context';
const socket = socketIO.connect(API_URL);
const FloatingCircle = () => {
    const [isVisible, setIsVisible] = useState(true);
    const { read } = useContext(AppContext);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };


    const circleStyle = {
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: '80px',  // גודל העיגול
        height: '80px',
        backgroundImage: `url('${JSON.parse(Cookies.get('user')).course_id?.teacherId?.user_id?.image_url}')`,  // הוספת רקע תמונה
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // שמירת יחסי גובה ורוחב
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };



    return (
        <>
            {(read != 0) ? (
                <Button
                    type="pink"
                    shape="circle"
                    icon={read}
                    size="large"
                    style={{ ...circleStyle, color: 'red', fontWeight: 'bold', fontSize: '2rem', textShadow: '10px rgba(255, 255, 255, 1)' }}
                    onClick={toggleVisibility}
                />
            ) :
                (<Button
                    type="secondary"
                    shape="circle"
                    // icon={isVisible ? 'eye-invisible' : 'eye'}
                    size="large"
                    style={circleStyle}
                    onClick={toggleVisibility}
                />)
            }

            {!isVisible && (<div
                // visible={!isVisible}
                style={{
                    position: 'fixed',
                    bottom: 50,
                    right: 50,
                    backgroundImage: `url('https://raw.githubusercontent.com/telegramdesktop/tdesktop/dev/Telegram/Resources/art/bg_initial.jpg')`,
                    backgroundSize: 'cover', // Adjust to your needs
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
                className='m-0 p-0'
            >
                <ChatScreen socket={socket} />
            </div>)}
        </>
    );
};

export default FloatingCircle;
