import './App.css';
import Auth from './components/auth/Auth';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {

  const [ sessionToken, setSessionToken ] = useState('');


  const updateToken = newToken => {
    localStorage.setItem("token", newToken)
    setSessionToken(newToken);
  }

  useEffect(() => {
    if(localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'))
    }
  }, [])

  /* All possible routes */

  return (
    <div className="App">
      <Routes>
          <Route
            path='/'
            element={<Auth updateToken={updateToken} />}
          />
      </Routes>
    </div>
  );
}

export default App;
