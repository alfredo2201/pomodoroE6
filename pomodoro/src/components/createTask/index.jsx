import React, { useState } from "react";
import "./createTask.scss";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const CreateTask = (props) => {
  const { data, setData, setTask, task } = props;
  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newData = [...data];
    console.log(task.length);
    if (task.length > 100) {
      toast.error("The text exceeds the maximum number of characters allowed");
      return;
    }
    if (task.length === 0) {
      toast.error("Empty text field");
      return;
    } 

    //http://127.0.0.1:3000/existTasks
    // alert(task)
    // const responseData = await fetch("http://localhost:3000/existTasks", {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //     "title":task
    //   },
    //   method: "GET",
    // });

    const responseData = await axios.get(
      `http://localhost:3000/existTasks/${task}`
    );
    
    //De esta forma obtiene el arreglo de las coicidencias al momento de traer 
    //las tareas que se repiten
    if (!responseData.data) {

      // await fetch("http://127.0.0.1:3000/task", {
      //     headers: {
      //       "Content-Type": "application/json",
      //       "Access-Control-Allow-Origin": "*",
      //     },
      //     method: "POST",
      //     body: JSON.stringify({
      //       title: task,
      //       status: "to_do",
      //     }),
      //   });

      await axios.post("http://localhost:3000/task", {
        title: task,
        status: "to_do",
      });

      newData[0].tasks.unshift({
        id: uuidv4(),
        title: task,
        status: "to_do",
      });

      setData(newData);
      setTask("");
      toast("Task added successfully", {
        duration: 3000,
        position: "top-center",

        // Styling
        style: {},
        className: "",

        // Custom Icon
        icon: "☑",

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },

        // Aria
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    } else {
      toast("Task already has been added", {
        duration: 3000,
        position: "top-center",

        // Styling
        style: {},
        className: "",

        // Custom Icon
        icon: "❌",

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },

        // Aria
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form__label" name="name">
          Name Task:{" "}
        </label>
        <input
          className="form__input"
          onChange={handleChange}
          value={task}
          name="nameTask"
          type={"text"}
          placeholder={"Name task"}
          maxLength="101"
        />
        <button className="form__button" type={"submit"}>
          Create
        </button>
        <Toaster />
      </form>
    </div>
  );
};

export default CreateTask;
