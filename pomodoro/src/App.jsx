import React from "react";
import "./App.scss";
import Kanban from "./components/kanban";
import Timer from "./components/timer";
import CreateTask from "./components/createTask";

function App() {
  return (
    <div style={{ padding: "50px" }}>
      <h1 style={{ marginBottom: "10px" }}>Pomodoro</h1>
      <CreateTask />
      <Kanban />        
    </div>
  );
}

export default App;
