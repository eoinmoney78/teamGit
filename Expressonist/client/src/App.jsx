import './App.css';
import Auth from './components/auth/Auth';
import { useState, useEffect } from 'react';
import AddCoffeeForm from './components/coffee/AddCoffeeForm';
import Dashboard from './components/dashboard/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Logout from './components/auth/logout/Logout';


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
      <nav>
        <h1>Nav</h1>
        <br />
        {
          sessionToken !== '' ?
            <Logout setToken={setSessionToken} /> :
            null
        }
      </nav>
        <Routes>
          <Route path='/' element={<Auth updateToken={updateToken} />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/add-coffee" element={<AddCoffeeForm />} />

       

        </Routes>
    </div>
  );
}

export default App;
