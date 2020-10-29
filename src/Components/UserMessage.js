import React from 'react';

const UserMessage = ({ msg }) => {
  return (
    <div className="user-message">
      <div className="avatar" data-name="Você"></div>
      {msg.content}
      <span className="time">{msg.time}</span>
    </div>
  )
}

export default UserMessage;