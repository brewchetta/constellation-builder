import React from 'react';
import './App.css';
import Canvas from './components/Canvas'

function App() {
  return (
    <div className="App">

      <Canvas />

      <span>Controls: CTRL + Z to undo the last line</span>
      <span>Controls: CTRL + X to undo the last point</span>
      <span>Controls: CTRL + C to remove current point</span>

    </div>
  );
}

export default App;
