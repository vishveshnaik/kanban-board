import React from 'react';
import './Ticket.css'; // Let's add custom CSS for better styling

const Ticket = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        <img
          className="ticket-user-avatar"
          src="https://via.placeholder.com/40"
          alt="User Avatar"
        />
      </div>
      <div className="ticket-title">{ticket.title}</div>
    <div className="ticket-priority-tag">
      <span className="priority-icon">…</span>
      <span className="ticket-type">
  <svg width="12" height="12" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '4px' }}>
    <circle cx="3" cy="3" r="3" fill="#6c757d" />
  </svg>
  Feature Request
</span>

    </div>
    </div>
  );
};

export default Ticket;
