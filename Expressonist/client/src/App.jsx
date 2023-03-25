import './App.css';
import Auth from './components/auth/Auth';
import { useState, useEffect } from 'react';

import Dashboard from './components/dashboard/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  const [sessionToken, setSessionToken] = useState('');

  console.log("App.jsx:", sessionToken)
  const updateToken = newToken => {
    localStorage.setItem("token", newToken)
    setSessionToken(newToken);
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'))
    }
  }, [])

  /* All possible routes */

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Auth updateToken={updateToken} />} />
          <Route path="/dashboard" element={<Dashboard />} />
       
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
