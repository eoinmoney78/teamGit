
import './App.css';
import Auth from './components/auth/Auth';
import { useState, useEffect } from 'react';
import AddCoffeePage from './components/coffee/AddCoffeePage'; // Import the parent component
import Dashboard from './components/dashboard/Dashboard';
import { Routes, Route } from 'react-router-dom';
import Logout from './components/auth/logout/Logout';
import TemporaryDrawer from './components/layout/TemporaryDrawer';
import CoffeeForm from './components/coffee/CoffeeForm';

//  sessionToken, which is initialized to an empty string, and setSessionToken, which is a function used to update the sessionToken. 

//  also defines an updateToken function, which is used to update the session token and save it to local storage.

function App() {

  const [sessionToken, setSessionToken] = useState('');

  console.log("App.jsx:", sessionToken);

  const updateToken = newToken => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };


  // useEffect hook is used to load the session token from local storage when the component is mounted.
  //  If there is a token saved in local storage, sessionToken state variable is to that value.

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, []);



// This code renders a logout button in the navigation bar if the sessionToken is not an empty string.

  return (
    <div className="App">
      <nav>
        <br />
        <nav> <TemporaryDrawer setSessionToken={setSessionToken} /> </nav>

        {sessionToken !== '' ? (
          <Logout setToken={setSessionToken} />
        ) : null}
      </nav>
  
      {/* There are three routes defined: one for the authentication page, one for the dashboard page, and one for the add-coffee page. */}

      <Routes>
        <Route path="/" element={<Auth updateToken={updateToken} />} />
        <Route path="/dashboard" element={<Dashboard token={sessionToken}/>} />
        <Route path="/add-coffee" element={<AddCoffeePage token={sessionToken}/>} />
        <Route path="/coffee-form" component={CoffeeForm} />
   

      </Routes>
    </div>
  );
}

export default App;