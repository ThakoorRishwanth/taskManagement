import React from 'react';

const Notification = ({ notifications = [] }) => {
    if (!Array.isArray(notifications)) {
        console.error("Notifications should be an array");
        return null;
    }

    return (
        <div>
            {notifications.length > 0 ? (
                <ul>
                    {notifications.map((notification, index) => (
                        <li key={index}>{notification.message}</li>
                    ))}
                </ul>
            ) : (
                <p>No notifications</p>
            )}
        </div>
    );
};

export default Notification;
