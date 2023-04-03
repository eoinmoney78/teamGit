
import './App.css';
import Auth from './components/auth/Auth';
import { useState, useEffect } from 'react';
import AddCoffeePage from './components/coffee/AddCoffeePage';
import Dashboard from './components/dashboard/Dashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import EditCoffeePage from './components/coffee/EditCoffeePage';

import { Routes, Route } from 'react-router-dom';
import Logout from './components/auth/logout/Logout';

function App() {
  const [sessionToken, setSessionToken] = useState('');

  console.log("App.jsx:", sessionToken);

  const updateToken = newToken => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, []);

  return (
    <div className="App">
      <nav>
        <br />
        {sessionToken !== '' ? (
          <Logout setToken={setSessionToken} />
        ) : null}
      </nav>

      <Routes>
        <Route path="/" element={<Auth updateToken={updateToken} />} />

        <Route path="/dashboard" element={<Dashboard token={sessionToken} />} />

        <Route path="/add-coffee" element={<AddCoffeePage token={sessionToken} />} />

        <Route
  path="/edit-coffee/:id"
  element={<EditCoffeePage token={sessionToken} />}
/>

        <Route path="/admin-dashboard" element={<AdminDashboard token={sessionToken} />} />
      </Routes>
    </div>
  );
}

export default App;


