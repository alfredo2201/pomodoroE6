import React, { useState } from "react";
import "./createTask.scss";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import {obtenTaskExistente,agregarTask} from "../../helpers/operations.js"

const CreateTask = (props) => {
  const { data, setData, setTask, task } = props;
  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newData = [...data];

    if (task.length > 100) {
      toast.error("The text exceeds the maximum number of characters allowed");
      return;
    }
    if (task.length === 0) {
      toast.error("Empty text field");
      return;
    } 
    const taskExistente = await obtenTaskExistente()
    //De esta forma obtiene el arreglo de las coicidencias al momento de traer 
    //las tareas que se repiten
    if (!(taskExistente.data.length)) {
      const taskAgregado = await agregarTask(task)

      if(!(taskAgregado.data.length)){
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
          style: {},
          className: "",
          icon: "☑",
          iconTheme: {
            primary: "#000",
            secondary: "#fff",
          },
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
      }else{
        toast("Error saving task", {
          duration: 3000,
          position: "top-center",
          style: {},
          className: "",
          icon: "❌",
          iconTheme: {
            primary: "#000",
            secondary: "#fff",
          },
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
      }      
    } else {      
      toast("Task already has been added", {
        duration: 3000,
        position: "top-center",
        style: {},
        className: "",
        icon: "❌",
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
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
