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

      <div className="cols-2">

        <Canvas />

        {currentPoint.x ? <InfoDisplay /> : <ControlsDisplay />}

      </div>


    </div>
  );
}

export default App;
