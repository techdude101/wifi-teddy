import {useState, useEffect} from 'react';

import './App.css';

function App() {
  const [ledState, setLedState] = useState(null);
  useEffect(() => {
    fetch("http://192.168.1.157/status")
    .then(res => res.json())
    .then(data => setLedState(data.led));
  }, []);
  
  const handleClick = (e) => {
    e.preventDefault();
    fetch("http://192.168.1.157/toggle")
    .then(res => res.json())
    .then(data => setLedState(data.led));
  }

  return (
    <div className="App">
      <center>
      <h1>Testing 123</h1>
      <button onClick={handleClick}>Test</button>
      <h1>{ledState ? "On" : "Off"}</h1>
      </center>
    </div>
  );
}

export default App;
