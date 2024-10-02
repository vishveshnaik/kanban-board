import React from 'react';
import Ticket from './Ticket';

const KanbanBoard = ({ groupedTickets, sortTickets }) => {
  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map(group => (
        <div key={group} className="kanban-column">
          <h3>{group} ({groupedTickets[group].length})</h3>
          {sortTickets(groupedTickets[group]).map(ticket => (
            <Ticket key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
