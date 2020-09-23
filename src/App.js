import React from 'react';
import './App.css';
import Canvas from './components/Canvas'
import ControlsDisplay from './components/ControlsDisplay'
import InfoDisplay from './components/InfoDisplay'

function App() {

  return (
    <div className="App">

      <InfoDisplay />

      <Canvas />

      <ControlsDisplay />

    </div>
  );
}

export default App;
