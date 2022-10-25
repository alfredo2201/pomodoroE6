import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Kanba from './components/kanban';

function App() {

  return (
    <div style={{padding: '50px'}}>
      <h1 style={{marginBottom: '20px'}}>Kanban UI</h1>
      <Kanba />
    </div>
    //npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch
  )
}

export default App
