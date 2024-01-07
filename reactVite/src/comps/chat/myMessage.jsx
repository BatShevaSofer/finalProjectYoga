// MyMessage.js
// import React from 'react';

import Cookies from "js-cookie";

const MyMessage = ({ message }) => {
  // console.log(last,"last");
  return (
    <>
      {(message.id == JSON.parse(Cookies.get('user'))._id) ? (
        <div
          className={`bg-secondary d-flex text-white p-1 justify-content-center px-3 mt-1 align-left`}
          style={{
            width: 'auto',
            borderRadius: '20px 20px 20px 20px',
            maxWidth: `${message.message.length * 10}px`,
            minWidth: '10px',
            whiteSpace: 'pre-wrap',
            boxShadow: '0 4px 8px rgba(137,137,137,0.75)'
          }}
        >
          {message.message}
        </div>
      ) : (
        <div
          className={`bg-info d-flex text-white p-1 justify-content-center px-3 mt-1 align-right flex-start`}
          style={{
            width: 'auto',
            borderRadius: '20px 20px 20px 20px',
            maxWidth: `${message.message.length * 10}px`,
            minWidth: '10px',
            whiteSpace: 'pre-wrap',
            boxShadow: '0 4px 8px rgba(137,137,137,0.75)'
          }}
        >
          {message.message}
        </div>
      )}






    </>
  );
};

export default MyMessage;
