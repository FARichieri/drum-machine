import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

const soundsName = {
  heaterKit: "Heater Kit",
  smoothPianoKit: "Smooth Piano Kit"
};

const soundsGroup = {
  heaterKit: bankOne,
  smoothPianoKit: bankTwo
}

const KeyboardKey = ({ play, deactivateAudio, sound: { id, keyTrigger, url, keyCode } }) => {
  const handleKeydown = (e) => {
    if(keyCode === e.keyCode) {
      const audio = document.getElementById(keyTrigger);
      play(keyTrigger, id);
      deactivateAudio(audio)
    }
  }
  
  React.useEffect(() => {
      document.addEventListener('keydown', handleKeydown);
  }, [])

  return (
    <button value="test" id={keyCode} className="drum-pad" key={keyCode.id} onClick={() => play(keyTrigger, id)}>
      <audio className="clip" src={url} id={keyTrigger} />
      {keyTrigger}
    </button>
  );
}

const Keyboard = ({ sounds, play, power, deactivateAudio }) =>  (
  <div className="keyboard" key={sounds}>
    {power 
      ? sounds.map((sound) => <KeyboardKey sound={sound} play={play} deactivateAudio={deactivateAudio} key={sound.id} />)
      : sounds.map((sound) => <KeyboardKey sound={{...sound, url: "#" }} play={play} deactivateAudio={deactivateAudio} key={sound.id} />)        
    }
  </div>
);

const DumControle = ({ stop, name, power, volume, handleVolumeChange, changeSoundGroup }) => (
  <div id="display">
    <p className="name">{name}</p>
    <div className='volume'>
      <input
        max="1"
        min="0"
        step='0.01'
        type="range"
        value={volume}
        onChange={handleVolumeChange}
      />
      <h2>Volume: %{Math.round(volume * 100)}</h2>
    </div>
    <div className='buttons'>
      <button className='changeButton' onClick={changeSoundGroup}>Change bank</button>
      <button className={power ? 'onButton' : 'offButton'} onClick={stop}>{power ? 'ON' : 'OFF'}</button>
    </div>
  </div>
);

const App = () => {
  const [power, setPower] = React.useState(true);
  const [volume, setVolume] = React.useState(.5);
  const [soundName, setSoundName] = React.useState("");
  const [soundType, setSoundType] = React.useState("heaterKit");
  const [sounds, setSounds] = React.useState(soundsGroup[soundType]);
  
  const styleActiveKey = (keyTrigger) => {
    keyTrigger.parentElement.style.backgroundColor = "#ffffff"
    keyTrigger.parentElement.style.color = "#000000"
    keyTrigger.parentElement.style.boxShadow = "0 0 10px 1px white"
  }
 
 const deactivateAudio = (audio) => {
   setTimeout(() => {
     audio.parentElement.style.backgroundColor = "#00800098"
     audio.parentElement.style.color = "#ffffff"
     audio.parentElement.style.boxShadow = "none"

   }, 300)
 }

  const play = (keyTrigger, sound) => {
    setSoundName(sound)
    const audio = document.getElementById(keyTrigger);
    styleActiveKey(audio);
    audio.currentTime = 0;
    audio.play();
    deactivateAudio(audio)
  }

  const stop = () => {
     setPower(!power)
  }
  
  const changeSoundGroup = () => {
    setSoundName("")
    if(soundType === "heaterKit"){
        setSoundType("smoothPianoKit");
        setSounds(soundsGroup.smoothPianoKit);
    } else {
        setSoundType("heaterKit");
        setSounds(soundsGroup.heaterKit);
    }
  }
  
  const handleVolumeChange = e => {
    setVolume(e.target.value)
  }
  
  const setKeyVolume = () => {
    const audioes = sounds.map(sound => document.getElementById(sound.keyTrigger));
    audioes.forEach(audio => {
      if(audio) {
        audio.volume = volume;
      }
    }) 
  }

  return (
    <div id="drum-machine">
      <div className='drum-container'>
      {setKeyVolume()}
      <div className="wrapper">
        <Keyboard sounds={sounds} play={play} power={power} deactivateAudio={deactivateAudio} />
        <DumControle 
          stop={stop}
          power={power}
          volume={volume} 
          name={soundName || soundsName[soundType]} 
          changeSoundGroup={changeSoundGroup}
          handleVolumeChange={handleVolumeChange} 
         />
      </div>
      </div>
      <p className='by'><a href="https://github.com/FARichieri" target="_blank" rel="noreferrer">By frichieri</a></p>
    </div>
  )
};

export default App;
