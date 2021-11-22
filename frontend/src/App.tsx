import React, {useEffect} from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(()=>{
    axios.post('/api/v1/token/', {
      username: 'admin',
      password: '1234567'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and have fun.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
