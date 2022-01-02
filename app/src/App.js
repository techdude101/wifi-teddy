import React, {useState, useEffect} from 'react';

import './App.css';

function App() {
  const [ledState, setLedState] = useState(null);
  useEffect(() => {
    fetch("http://localhost/status")
    .then(res => res.json())
    .then(data => setLedState(data.led));
  }, []);
  
  const handleClick = (e) => {
    let path = "";
    e.preventDefault();
    if (e.target.id === "btn_led") {
      path = "toggle";
    } else if (e.target.id === "btn_play_1") {
      path = "play1";
    } else if (e.target.id === "btn_play_2") {
      path = "play2";
    } else if (e.target.id === "btn_play_3") {
      path = "play3";
    }
    fetch(`http://localhost/${path}`)
    .then(res => res.json())
    .then(data => setLedState(data.led));
  }

  return (
    <div className="App">
      <h1>WiFi Teddy</h1>
      <div className="buttonContainer">
        <button onClick={handleClick} id="btn_led">
          Toggle LED
        </button>
      </div>
      <div className="buttonContainer">
        <button onClick={handleClick} id="btn_play_1">
          Play</button>
      </div>
      <div className="buttonContainer">
        <button onClick={handleClick} id="btn_play_2">
          Scream</button>
      </div>
      <div className="buttonContainer">
        <button onClick={handleClick} id="btn_play_3">
          Chewbacca</button>
      </div>
      <h1>{ledState ? "On" : "Off"}</h1>
    </div>
  );
}

export default App;
