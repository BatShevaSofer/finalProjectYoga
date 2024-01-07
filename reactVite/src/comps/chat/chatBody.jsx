import { useEffect, useState } from 'react';
import MyMessage from './myMessage';


const ChatBody = ({ socket, oldMessages }) => {
  // const [messages, setMessages] = useState([]);

  console.log("oldMessages", oldMessages)

  // useEffect(() => {
  //   socket.on('new-message', (data) => {
  //     // setMessages([data, ...messages])
  //     console.log("new ", data)
  //   })
  // }, [socket]);

  return (<>
    <div
      className='p-2 flex-column m-0'
      style={{
        width: '850px',
        height: '500px',
        display: 'flex',
        flexDirection: 'column',
        // backgroundImage: `url('https://raw.githubusercontent.com/telegramdesktop/tdesktop/dev/Telegram/Resources/art/bg_initial.jpg')`,
        // backgroundSize: 'cover', // Adjust to your needs
        // backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'center',
      }}
    >
      <div
        className='d-flex flex-column-reverse p-3'
        style={{ flex: 1, overflowY: 'auto' }}
      >



        {oldMessages?.map((message, index) => (

          <MyMessage
            message={message}
            // last={index === 0  || message?.user_id?._id !== oldMessages[index -1].user_id?._id}
            // last={index === oldMessages.length - 1 || message?.user_id?._id !== oldMessages[index + 1].user_id?._id}
            // alignLeft={false}
            key={index}
            index={index}
          />

        ))}


        {/* ___________________________________________________________________________________
        {oldMessages.map((message, index) => (

          <MyMessage
            message={message}
            // last={index === 0 || message?.user_id?._id !== oldMessages[index - 1].user_id?._id}
            // last={index === oldMessages.length - 1 || message?.user_id?._id !== oldMessages[index + 1].user_id?._id}
            alignLeft={false}
            key={index}
            index={index}
          />

        ))} */}

      </div>
    </div>
  </>
  )
}

export default ChatBody