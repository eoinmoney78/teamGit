import './App.css';
import Auth from './components/auth/Auth';
import { useState, useEffect } from 'react';
import Dashboard from './components/dashboard/Dashboard';
import Home from './components/home/Home';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CoffeePage from './components/coffee/CoffeePage';

import TemporaryDrawer from './components/layout/TemporaryDrawer';
import UploadForm from './components/coffee/UploadForm';

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
      letterSpacing: '0.08em',
    },
    h6: {
      fontFamily: 'Droid Serif',
    },
    fontFamily: 'Source Sans Pro',
    h5: {
      fontFamily: 'Droid Serif',
    },
    h4: {
      fontFamily: 'Droid Serif',
    },
    h1: {
      fontFamily: 'Droid Serif',
    },
    h3: {
      fontFamily: 'Droid Serif',
    },
  },
});

function App() {

  const [sessionToken, setSessionToken] = useState('');

  console.log("App.jsx:", sessionToken);

  const updateToken = (newToken) => {
    console.log("updateToken called with newToken:", newToken);
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };



  // useEffect hook is used to load the session token from local storage when the component is mounted.
  //  If there is a token saved in local storage, sessionToken state variable is to that value.

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("useEffect storedToken:", storedToken);
    if (storedToken) {
      setSessionToken(storedToken);
    }
  }, []);
  



// This code renders a logout button in the navigation bar if the sessionToken is not an empty string.


  return (
    <ThemeProvider theme={theme}>
    <div className="App">

      {/* If this sessionToken exists (meaning you're logged in), a Logout button appears inside the TemporaryDrawer menu. You can click this button to log out of the app. TemporaryDrawer and <Logout> components need a way to communicate with the main app about the login session. So, they are given the setSessionToken  */}
      <nav>
         <TemporaryDrawer sessionToken={sessionToken} onLogout={setSessionToken} />
      </nav>

          
      {/* There are six routes defined: one for the authentication page, one for the dashboard page, home,and one for the add-coffee page and editcoffeepage. */}

      <Routes>
          <Route path="/" element={<Auth updateToken={updateToken} />} />

          <Route path="/home" element={<Home token={sessionToken}/>} />

          <Route path="/dashboard" element={<Dashboard token={sessionToken}/>} />

          <Route path="/add-coffee" element={<CoffeePage token={sessionToken} title={"New Coffee"} method={'POST'}/>} />

          <Route path="/edit-coffee/:id" element={<CoffeePage token={sessionToken} title={"Edit Coffee"} method={'PUT'}/>} />

          <Route path="/upload" element={<UploadForm token={sessionToken} />} /> 
        
        </Routes>
    </div>
    </ThemeProvider>
  );

}

export default App;