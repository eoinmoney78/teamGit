
import './App.css';
import Auth from './components/auth/Auth';
import { useState, useEffect } from 'react';
import Dashboard from './components/dashboard/Dashboard';
import { Routes, Route } from 'react-router-dom';
import Logout from './components/auth/logout/Logout';
import TemporaryDrawer from './components/layout/TemporaryDrawer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CoffeePage from './components/coffee/CoffeePage';

//  sessionToken, which is initialized to an empty string, and setSessionToken, which is a function used to update the sessionToken. 

//  also defines an updateToken function, which is used to update the session token and save it to local storage.

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    h2: {
      fontFamily: 'Droid Serif',
      letterSpacing: '0.05em',
    },
    h6: {
      fontFamily: 'Droid Serif',
    },
  },
});

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
    <ThemeProvider theme={theme}>
    <div className="App">
    <nav>

</nav>

        <nav> <TemporaryDrawer setSessionToken={setSessionToken} /> </nav>
      {/* There are three routes defined: one for the authentication page, one for the dashboard page, and one for the add-coffee page. */}

      <Routes>
        <Route path="/" element={<Auth updateToken={updateToken} />} />
        <Route path="/dashboard" element={<Dashboard token={sessionToken}/>} />
        <Route path="/add-coffee" element={<CoffeePage token={sessionToken} method={'POST'}/>} />
        <Route path="/edit-coffee/:id" element={<CoffeePage token={sessionToken} method={'PUT'}/>} />

      </Routes>
    </div>
    </ThemeProvider>
  );

}

export default App;