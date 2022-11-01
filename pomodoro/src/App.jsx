import React from "react";
import "./App.scss";
import Kanban from "./components/kanban";

function App() {
  return (
    <div style={{ padding: "50px" }}>
      <h1 style={{ marginBottom: "10px" }}>Pomodoro</h1>      
      <Kanban />              
    </div>
  );
}

export default App;
