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
    let path = "";
    e.preventDefault();
    if (e.target.id === "btn_led") {
      path = "toggle";
    } else if (e.target.id === "btn_play") {
      path = "play";
    }
    fetch(`http://192.168.1.157/${path}`)
    .then(res => res.json())
    .then(data => setLedState(data.led));
  }

  return (
    <div className="App">
      <center>
      <h1>Testing 123</h1>
        <button onClick={handleClick} id="btn_led">Toggle LED</button>
        <br />
        <button onClick={handleClick} id="btn_play">Play</button>
      <h1>{ledState ? "On" : "Off"}</h1>
      </center>
    </div>
  );
}

export default App;
