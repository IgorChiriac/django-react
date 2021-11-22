import React, {useContext, useEffect} from 'react';
import './App.css';
import { AuthContext } from './context/AuthContext';


function App() {
  const { logInUser, isLoading, user } = useContext(AuthContext);
  useEffect(()=>{
    logInUser()
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        {isLoading && 'Loading'}
        {user && 'Current user is: ' + user?.username}
      </header>
    </div>
  );
}

export default App;
