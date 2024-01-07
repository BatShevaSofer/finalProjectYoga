import ChatInput from './chatInput';
// import MyMessage from './myMessage';
// import Message from './message';
import React, { useState, useEffect } from 'react';
import { API_URL } from '../../services/mainService'
import ChatBody from './chatBody'
import Cookies from 'js-cookie';
const ChatScreen = ({ eventId, userId, socket }) => {

    const [messages, setMessages] = useState([])

    const doApiMessages = async () => {
        let url = API_URL + `/messages/byEventId/${eventId}`;
        try {
            // let resp = await doApiGet(url);
            // console.log("🔥",resp.data.messages)
            // setMessages(resp.data.messages)
            
        }

        catch (err) {
            console.log(err);
        }
    }


    const onSendMessage = async (text) => {
        const message = {
            user_id: JSON.parse(Cookies.get('user'))._id,
            text: text,
            time_stamp: Date()
        }
        let temp = [...messages, message]
        setMessages(temp);
        socket.emit("new-message", message)
    }

    // 1 get all the mesagges to the event , connect to socket 
    useEffect(() => {
        socket.emit("join-room", JSON.parse(Cookies.get('user'))._id)
        console.log("⚡:")
        
        doApiMessages()
    }, []);


    return (
        <div
            className='flex-column p-3 m-3'
            style={{
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                width: '905px',
                height: '650px',
                display: 'flex',
                flexDirection: 'column',
                backgroundImage: `url('https://raw.githubusercontent.com/telegramdesktop/tdesktop/dev/Telegram/Resources/art/bg_initial.jpg')`,
                backgroundSize: 'cover', // Adjust to your needs
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >
            <div
                className='d-flex flex-column-reverse'
                style={{ flex: 1, overflowY: 'auto' }}
            >

                {/* {messages.map((message, index) => (
                    message.user_id._id === userId ?
                        <MyMessage message={message} last={true} alignLeft={false} key={index} /> : <Message message={message} last={true} alignLeft={true} key={index} />
                ))} */}
                {/* {messages.length > 0 && messages.map((message, index) => {
                    // message.user_id === userId ?
                    <Message message={message} last={true} alignLeft={true} key={index} />
                    //     <MyMessage message={message} last={true} alignLeft={false} key={index} /> :
                    //     <Message message={message} last={true} alignLeft={true} key={index} />

                })} */}

            </div>
            <div>
                <ChatBody socket={socket}  oldMessages={messages}  />
            </div>

            <div className='mt-auto'>
                <ChatInput onSendMessage={onSendMessage} />
            </div>
        </div>
    );
};

export default ChatScreen;