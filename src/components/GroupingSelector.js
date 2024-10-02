import React, { useState } from 'react';

const GroupingSelector = ({ grouping, setGrouping, ordering, setOrdering }) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="grouping-selector">
      <button onClick={() => setShowOptions(!showOptions)}>
        {showOptions ? 'Hide' : 'Display'}
      </button>
      {showOptions && (
        <div className="grouping-options">
          <div className="option-group">
            <label>Grouping:</label>
            <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="option-group">
            <label>Ordering:</label>
            <select value={ordering} onChange={(e) => setOrdering(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupingSelector;
