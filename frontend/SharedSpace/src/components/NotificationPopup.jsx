// For notification popup.
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './NotificationPopup.css' // Import CSS.

// ____________________________________________________________________________________________________

export function NotificationPopup({ onClose }) {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    // fetch notifs on mount  
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('${import.meta.env.VITE_API_URL}/api/notifications', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setNotifications(data);
                } else {
                    console.error("Failed to fetch notifications:", data.message);
                }
            } catch (error) {
                console.error("Connection error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('${import.meta.env.VITE_API_URL}/api/notifications', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    setNotifications(data);
                }
            } catch (error) {
                console.error("Connection error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const handleNotificationClick = async (notif) => {
        // mark notif as read
        if (!notif.isRead) {
            try {
                const token = localStorage.getItem('token');
                await fetch(`${import.meta.env.VITE_API_URL}/api/notifications/${notif._id}/read`, {
                    method: 'PATCH',
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                setNotifications(prev => 
                    prev.map(n => n._id === notif._id ? { ...n, isRead: true } : n)
                );
            } catch (err) {
                console.error("Mark read error:", err);
            }
        }

        // Redirect to page
        switch (notif.type) {
            case 'challenge_alert':
                navigate('/challenges');
                break;
            case 'friend_request':
                navigate('/profile', { state: { openFriendsTab: true } });
                break;
            default:
        }

        // close popup
        onClose();
    };

    return (
        <div className="notification-popup-card">
            <div className="notification-popup">
                <div className="notification-popup-top">
                    <div className="notification-popup-header">
                        NOTIFICATIONS  {/* Header. */}
                    </div>

                    <button className="notification-close-button" onClick={onClose}>
                        Close  {/* Button closes popup. */}
                    </button>
                </div>

                {/* Notifcation list. */}
                <ul className="notification-popup-list">
                    {loading ? (
                        <p className="loading-state">Loading notifications...</p>
                    ) : notifications.length === 0 ? (
                        <p className="empty-state">No new notifications.</p>
                    ) : (
                        notifications.map((notif) => (
                            <li
                                key={notif._id}
                                className={notif.isRead ? "notification-read" : "notification-unread"}
                                onClick={() => handleNotificationClick(notif)}
                            >
                                <div className={notif.isRead ? "notification-info-read" : "notification-info"}>
                                    <div className={notif.isRead ? "notification-type-read" : "notification-type"}>
                                        {notif.title}
                                    </div>
                                    <div className={notif.isRead ? "notification-time-read" : "notification-time"}>
                                        {new Date(notif.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className={notif.isRead ? "notification-content-read" : "notification-content"}>
                                    {notif.message}
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    )
}