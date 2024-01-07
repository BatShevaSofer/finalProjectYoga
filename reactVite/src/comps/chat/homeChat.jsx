import React from 'react'
import ChatScreen from './chatScreen'

const HomeChat = ({ socket }) => {
    return (
        <div>
            <ChatScreen socket={socket} />
        </div>
    )
}

export default HomeChat
