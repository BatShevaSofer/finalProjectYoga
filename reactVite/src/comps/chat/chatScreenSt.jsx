import ChatInput from './chatInput';
// import MyMessage from './myMessage';
// import Message from './message';
import { useState, useEffect, useContext } from 'react';
import { API_URL } from '../../services/mainService'
import ChatBody from './chatBody'
import Cookies from 'js-cookie';
import axios from 'axios';
import { AppContext } from '../../contexts/context';
const ChatScreen = ({ socket }) => {
    const { setReadS } = useContext(AppContext);
    const [messages, setMessages] = useState([])
    const doApiGetRoom = async () => {
        let url = API_URL + `/chat/room/` + JSON.parse(Cookies.get('user'))._id;
        let data = await axios.get(url);
        console.log(data);
        // JSON.stringify(Cookies.set('room', data))
    }
    const doApiGetMessages = async () => {
        let url = API_URL + `/chat/room/` + JSON.parse(Cookies.get('user'))._id;
        let data = await axios.get(url);
        console.log("data.messages", data.messages);
        setMessages(data.data[0].messages.reverse());
    }
    useEffect(() => {
        doApiGetMessages();
        // doApiGetRoom();
    }, [])



    const onSendMessage = async (text) => {
        const message = {
            student_id: JSON.parse(Cookies.get('user'))._id,
            teacher_id: JSON.parse(Cookies.get('user')).course_id.teacherId._id,
            msg: text,
            role: 'student'
            
        }
        // let temp = [...messages, message]
        // setMessages(temp);
        socket.emit("new-message", message)
        doApiGetMessages();
    }

    // 1 get all the mesagges to the event , connect to socket 
    useEffect(() => {
        let room = {
            user_id: JSON.parse(Cookies.get('user'))._id,
            teacher_id: JSON.parse(Cookies.get('user')).course_id.teacherId._id,
            role: 'student'
        }
        socket.emit("join-room", room)

        console.log("⚡:")
        setReadS(0);

        doApiGetRoom()
    }, []);


    return (
        <div
            className='flex-column p-2 m-0 rounded border border-black'
            style={{
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                width: '500px',
                height: '650px',
                display: 'flex',
                flexDirection: 'column',
                backgroundImage: `url('https://raw.githubusercontent.com/telegramdesktop/tdesktop/dev/Telegram/Resources/art/bg_initial.jpg')`,
                backgroundSize: 'cover', // Adjust to your needs
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}
        >
            <div
                className='d-flex flex-column-reverse'
                style={{ flex: 1, overflowY: 'auto' }}
            >

            </div>
            <div>
                <ChatBody socket={socket} oldMessages={messages} />
            </div>

            <div style={{ width: '100px' }}>
                <ChatInput onSendMessage={onSendMessage} />
            </div>
        </div>
    );
};

export default ChatScreen;
