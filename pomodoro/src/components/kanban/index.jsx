import "./kanban.scss";
import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { listData } from "../../listData.js";
import Timer from "../timer/index";
import Card from "../card";
import CreateTask from "../createTask/index";
import { actualizarTask } from "../../helpers/operations.js";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Kanban = () => {  
  const [data, setData] = useState([]);
  const [task, setTask] = useState("");

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    //Si es diferente columna
    if (source.droppableId !== destination.droppableId) {
      // SourceColIndex es el indice del task
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);  
      const destinationColIndex = data.findIndex(
        (e) => e.id === destination.droppableId
      );
      const sourceCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];

      console.log(sourceCol)

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      console.log(sourceTask)
      console.log(destinationTask)
      
      const [removed] = sourceTask.splice(source.index, 1);
      if (destinationColIndex == 0) {
        removed.status = "to_do";
        toast.success("Tarea se movió a to do con éxito");
        actualizarTask(removed);
      } else if (destinationColIndex == 1) {
        removed.status = "in_progress";
        actualizarTask(removed);
      } else {
        removed.status = "done";
        !terminarTarea(removed)
      }
      destinationTask.splice(destination.index, 0, removed);
      data[sourceColIndex].tasks = sourceTask;
      data[destinationColIndex].tasks = destinationTask;
      setData(data);
    }
    //Si es la misma columna
    else {
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const sourceCol = data[sourceColIndex];
      const sourceTask = [...sourceCol.tasks];
      //Remueve de la posicion donde se encuentra la tarea seleccionada
      const [removed] = sourceTask.splice(source.index, 1);
      //Y la vuelve a agregar en la posicion donde la soltó
      sourceTask.splice(destination.index, 0, removed);
      data[sourceColIndex].tasks = sourceTask;
      setData(data);
    }
  };

  const terminarTarea = async (task) => {
    const result = await Swal.fire({
      title: "Do you want to finish the task?",
      showCancelButton: true,
      confirmButtonText: "Save",
    });
    if (result.isConfirmed) {
      actualizarTask(task).then((res) => {
        if (res) {
          Swal.fire("Task finished", "", "success");
        }        
      });
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  };

  useEffect(()=>{
    console.log(listData)
    setData(listData)
  },[listData])


  return (
    <div>
      <CreateTask data={data} setData={setData} task={task} setTask={setTask} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban">
          {data.map((section, index) => (
            <Droppable key={index} droppableId={section.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  className="kanban__section"
                  ref={provided.innerRef}
                >
                  <div className="kanban__section__title">{section.title}</div>
                  <div className="kanban__section__content">
                    {section.tasks.map((taskV, index) => (
                      <Draggable
                        key={taskV.id}
                        draggableId={taskV.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              opacity: snapshot.isDragging ? "0.5" : "1",
                            }}
                          >
                            <Card
                              data={data}
                              setData={setData}
                              task={task}
                              setTask={setTask}
                            >
                              {taskV.title}
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
          <Timer />
        </div>
      </DragDropContext>
    </div>
  );
};

export default Kanban;
