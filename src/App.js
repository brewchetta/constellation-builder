import React from 'react';
import './App.css';

import Canvas from './components/Canvas'
import ControlsDisplay from './components/ControlsDisplay'
import InfoDisplay from './components/InfoDisplay'

import { useSelector } from 'react-redux'

function App() {

  // State

  const currentPoint = useSelector(s => s.currentPoint)

  return (
    <div className="App">


      <Canvas />

      <ControlsDisplay />
      {currentPoint.x ? <InfoDisplay /> : null}

    </div>
  );
}

export default App;
