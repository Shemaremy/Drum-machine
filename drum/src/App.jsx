import React, {useState , useEffect } from 'react'
import './App.css'

function App() {




  // Power on and off settings
  const [isOn, setIsOn] = useState(true);
  const togglePower = () => {
    setIsOn(prevState => !prevState);
  };


  // Bank on and off settings
  const [isOn2, setIsOn2] = useState(false);
  const toggleBank = () => {
    setIsOn2(prevState => !prevState);
  };
  

  // Volume and display settings
  const [volume, setVolume] = useState(30);
  const [displayMessage, setDisplayMessage] = useState('');

  
  // Handling volume change
  const handleSliderChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    setDisplayMessage(`Volume: ${newVolume}`);
    clearTimeout(window.volumeTimeout);
    window.volumeTimeout = setTimeout(() => {
      setDisplayMessage('');
    }, 500);
  };
  



  // Drumpads sounds array
  const drumPads = [
    { key: 'Q', sound: 'Heater 1', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3' },
    { key: 'W', sound: 'Heater 2', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3' },
    { key: 'E', sound: 'Heater 3', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3' },
    { key: 'A', sound: 'Heater 4', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3' },
    { key: 'S', sound: 'Clap', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3' },
    { key: 'D', sound: 'Open-HH', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3' },
    { key: 'Z', sound: 'Kick-n\'-Hat', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3' },
    { key: 'X', sound: 'Kick', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3' },
    { key: 'C', sound: 'Closed-HH', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3' }
  ];



  // Play audio
  const playAudio = (key, sound) => {
    const audioElement = document.getElementById(key);
    audioElement.volume = volume / 100;
    audioElement.currentTime = 0;
    audioElement.play();
    setDisplayMessage(sound);
  };

  // Handle click event
  const handlePadClick = (key, sound) => {
    if (isOn) {
      playAudio(key, sound);
    }
  };


  // Handle key press event
  const handleKeyPress = (e) => {
    const pad = drumPads.find(p => p.key === e.key.toUpperCase());
    if (pad && isOn) {
      playAudio(pad.key, pad.sound);
    }
  };



  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isOn, volume]);









  return (
    <div className="App">
      <div id='drum-machine'>
        <div className='left_part'>
          {drumPads.map(pad => (
            <div 
              key={pad.key} 
              className='drum-pad' 
              id={`drum-${pad.key}`} 
              onClick={() => handlePadClick(pad.key, pad.sound)}
            >
              {pad.key}
              <audio className='clip' id={pad.key} src={pad.url}></audio>
            </div>
          ))}
        </div>
        <div className='right_part'>
          <div className='power'>
            <p>Power</p>
            <div className="select" onClick={togglePower}>
              <div className="inner" style={{ backgroundColor: isOn ? 'blue' : 'red', float: isOn ? 'right' : 'left' }}></div>
            </div>
          </div>
          <h2 id='display'>{displayMessage}</h2>
          <div className='volume'>
            <div className="slider-container">
              <input type="range" className="slider" min="0" max="100" value={volume} onChange={handleSliderChange} />
            </div>
          </div>
          <div className='bank'>
            <p>Bank</p>
            <div className="select" onClick={toggleBank}>
              <div className="inner" style={{ backgroundColor: isOn2? 'blue' : 'red', float: isOn2 ? 'right' : 'left' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
