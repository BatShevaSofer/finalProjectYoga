import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const socket = io('http://localhost:3001');

    useEffect(() => {
        socket.on('chat message', (msg) => {
            setMessages([...messages, msg]);
        });

        return () => {
            socket.disconnect();
        };
    }, [messages]);

    const sendMessage = () => {
        socket.emit('chat message', message);
        setMessage('');
    };

    return (
        <div>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
