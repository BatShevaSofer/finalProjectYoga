// import React from 'react'
import { useEffect, useState } from 'react';
import { useTeacher } from '../../../services/teacherService'
import DisplayChats from './displayChats';
import socketIO from 'socket.io-client'
import { API_URL } from '../../../services/mainService';
const socket = socketIO.connect(API_URL);
const Chats = () => {

    const { getChats } = useTeacher();
    const [chats, setChats] = useState([]);

    useEffect(() => {
        getChats()
            .then((chats) => {
                console.log(chats);
                setChats(chats.data)
            })
            .catch((err) => { console.log(err); });


    }, [])
    return (
        <div className='row container'>
            {chats && chats?.map((chat) => { return (<DisplayChats key={chat._id} data={chat} socket={socket} />) })}
        </div>
    )
}

export default Chats
