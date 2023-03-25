
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const coffeeEntries = [
    {
      id: 1,
      name: 'Coffee 1',
      date: '2022-05-10',
      rating: 4,
      notes: 'This coffee had a rich, smooth flavor.'
    },
    {
      id: 2,
      name: 'Coffee 2',
      date: '2022-05-12',
      rating: 3,
      notes: 'This coffee was a bit bitter for my taste.'
    },
    {
      id: 3,
      name: 'Coffee 3',
      date: '2022-05-15',
      rating: 5,
      notes: 'This coffee was absolutely delicious!'
    },
  ];

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard! Here, you can manage your coffee entries, view statistics, and more.</p>

      <div className="coffee-entries">
        <h2>Coffee Entries</h2>
        {coffeeEntries.map(entry => (
          <div key={entry.id} className="coffee-entry">
            <h3>{entry.name}</h3>
            <p>Date: {entry.date}</p>
            <p>Rating: {entry.rating}</p>
            <p>Notes: {entry.notes}</p>
          </div>
        ))}
      </div>

      <Link to="/CoffeeEntryForm">
        <button>Add Coffee Entry</button>
      </Link>
    </div>
  );
};

export default Dashboard;


