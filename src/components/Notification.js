import React from 'react';

const Notification = ({ showNotification }) => {
  return (
    <div className={`notification-container ${showNotification ? 'show' : ''}`}>
      <p>Már használtad ezt a betűt.</p>
    </div>
  );
};

export default Notification;
