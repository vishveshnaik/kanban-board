import React, { useEffect, useState } from 'react';
import KanbanBoard from './components/KanbanBoard';
import GroupingSelector from './components/GroupingSelector';
import './App.css';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]); // Store users data
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status');
  const [ordering, setOrdering] = useState(localStorage.getItem('ordering') || 'priority');
  const [groupedTickets, setGroupedTickets] = useState({});

  // Fetch data from the API
  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users); // Store users data
      });
  }, []);

  // Group and save to localStorage whenever grouping or ordering changes
  useEffect(() => {
    localStorage.setItem('grouping', grouping);
    localStorage.setItem('ordering', ordering);

    let grouped = {};
    if (grouping === 'status') {
      grouped = groupByStatus(tickets);
    } else if (grouping === 'user') {
      grouped = groupByUser(tickets, users); // Pass users data to groupByUser
    } else if (grouping === 'priority') {
      grouped = groupByPriority(tickets);
    }
    setGroupedTickets(grouped);
  }, [grouping, ordering, tickets, users]);

  // Group tickets by status
  const groupByStatus = (tickets) => {
    return tickets.reduce((acc, ticket) => {
      const { status } = ticket;
      if (!acc[status]) acc[status] = [];
      acc[status].push(ticket);
      return acc;
    }, {});
  };

  // Group tickets by user, matching userId to the user's name
  const groupByUser = (tickets, users) => {
    return tickets.reduce((acc, ticket) => {
      const user = users.find((u) => u.id === ticket.userId);
      const userName = user ? user.name : 'Unknown User'; // fallback if user not found
      if (!acc[userName]) acc[userName] = [];
      acc[userName].push(ticket);
      return acc;
    }, {});
  };

  // Group tickets by priority
  const groupByPriority = (tickets) => {
    return tickets.reduce((acc, ticket) => {
      const { priority } = ticket;
      if (!acc[priority]) acc[priority] = [];
      acc[priority].push(ticket);
      return acc;
    }, {});
  };

  // Sorting tickets within each group
  const sortTickets = (group) => {
    return [...group].sort((a, b) => {
      if (ordering === 'priority') {
        return b.priority - a.priority;
      } else if (ordering === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  return (
    <div className="app">
      <header>
        <GroupingSelector
          grouping={grouping}
          setGrouping={setGrouping}
          ordering={ordering}
          setOrdering={setOrdering}
        />
      </header>
      <KanbanBoard groupedTickets={groupedTickets} sortTickets={sortTickets} />
    </div>
  );
};

export default App;

