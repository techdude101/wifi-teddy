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
    } else if (e.target.id === "btn_play_1") {
      path = "play1";
    } else if (e.target.id === "btn_play_2") {
      path = "play2";
    } else if (e.target.id === "btn_play_3") {
      path = "play3";
    }
    fetch(`http://192.168.1.157/${path}`)
    .then(res => res.json())
    .then(data => setLedState(data.led));
  }

  return (
    <div className="App">
      <h1>WiFi Teddy</h1>
      <div className="buttonContainer">
        <button onClick={handleClick} id="btn_led">
        {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACI0lEQVRoge3aO2sUURiH8V8U4jWdl0bFNBaJFmolkuAnEOxE0UYLC/EDCGq+gthYi4XEXlKJCOKlEMFLKUkjUUIiaCQaklhMRiQm2ZOdd86AzANvte+e83+Ynd0zL0tLS8t69ASvtwnHcAqH0Y8dy6/N4iPe4QleYyl4/8rsxggmFOFSahy3sKuBvP+wBTfwXbrAyvqG6+jNnP0Ph/BmnYAbrfcYzGqAYXytGHy1msFQLomT+FGDRFmzOFG3RD+ma5QoawoH6pLYjBcZJMp6pvg6D+dqRomyrkRLbMfnBkQmsS0lYOqlu4g9ib2R7MWFyAVz3hur3Ssh7MFigyKLEo4xKR+tIfGHy43QI+FHMkUk+7FhFQY6NaSI7AsIUpX9nRpSRHYGBKlKX6eGFJGfAUGqMtepIUVkJiBIVaY7NaSIjAcEqcpEp4YUkVcBQaryMmKRXnmO7mvVlITH4JQr8gsPE/rqYnQ5QwiDWJD/aizgSJREyf0GRO5FS1DMrr5klJhSHONr4Yw8J+FFnK5LomQkg8jNuiVKbtcocTeXBMVEZbQGidHltbPSi7GKwf+ux4pZcldUffLrw9mAdZbwQDHQbvkviBoqDOt+8PwcT4NyVOa87m/ycw3kXZN+3YscbCDvunyycYnJqM0jx/ZjXbznUeD+YRzHvPSrMY+jjSRN4LI0mXlcity4jpnuAK4p/jCwdcVrc3iLO/hQw94tLS1r8BvUwFigA+O7FAAAAABJRU5ErkJggg=="/> */}
          Toggle LED
        </button>
      </div>
      <div className="buttonContainer">
        <button onClick={handleClick} id="btn_play_1">
          {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAAxElEQVRIie3WMWpCURBG4Q8FSRrtbC2SPhvICmzchVuwtXQLbsE2pVUIkjqQHVgqNmIj6EvxGHhFQAIvcxt/OPVhhrlzh3sKZ4MvTLLFVYNPvJYQB294LiGucMYSw2xxcMQcj9niYIsputni4BvjEuJgjZcS4goXrDDKFgcnLDDIFgd7zNDLFgfvTUHnL23ISJuV7iS3Ooarn1VxkeeUvkDSV2b6J3FQT+pDW8Jb4vRD4Kqe1Kf/Ev4mTj32PhQ6b+9pPT+XHgysHrPM6QAAAABJRU5ErkJggg=="/> */}
          Play</button>
      </div>
      <div className="buttonContainer">
        <button onClick={handleClick} id="btn_play_2">
          {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAAxElEQVRIie3WMWpCURBG4Q8FSRrtbC2SPhvICmzchVuwtXQLbsE2pVUIkjqQHVgqNmIj6EvxGHhFQAIvcxt/OPVhhrlzh3sKZ4MvTLLFVYNPvJYQB294LiGucMYSw2xxcMQcj9niYIsputni4BvjEuJgjZcS4goXrDDKFgcnLDDIFgd7zNDLFgfvTUHnL23ISJuV7iS3Ooarn1VxkeeUvkDSV2b6J3FQT+pDW8Jb4vRD4Kqe1Kf/Ev4mTj32PhQ6b+9pPT+XHgysHrPM6QAAAABJRU5ErkJggg=="/> */}
          Scream</button>
      </div>
      <div className="buttonContainer">
        <button onClick={handleClick} id="btn_play_3">
          {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAAxElEQVRIie3WMWpCURBG4Q8FSRrtbC2SPhvICmzchVuwtXQLbsE2pVUIkjqQHVgqNmIj6EvxGHhFQAIvcxt/OPVhhrlzh3sKZ4MvTLLFVYNPvJYQB294LiGucMYSw2xxcMQcj9niYIsputni4BvjEuJgjZcS4goXrDDKFgcnLDDIFgd7zNDLFgfvTUHnL23ISJuV7iS3Ooarn1VxkeeUvkDSV2b6J3FQT+pDW8Jb4vRD4Kqe1Kf/Ev4mTj32PhQ6b+9pPT+XHgysHrPM6QAAAABJRU5ErkJggg=="/> */}
          Chewbacca</button>
      </div>
      <h1>{ledState ? "On" : "Off"}</h1>
    </div>
  );
}

export default App;
