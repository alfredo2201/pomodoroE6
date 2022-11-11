import "./kanban.scss";
import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { listData, addTask } from "../../listData.js";
import Timer from "../timer/index";
import Card from "../card";
import CreateTask from "../createTask/index";
import axios from "axios";

const Kanban = () => {
  const [data, setData] = useState(listData);
  const [task, setTask] = useState("");

  const actualizarTask = async (task) =>{
    console.log(task)
    await axios({
      method: 'put',
      url: `http://localhost:3000/task`,
      data:{
        task
      }
      });
  } 

  const onDragEnd = (result) => {
    if (!result.destination) return;    
    const { source, destination } = result;

    //Si es diferente columna
    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const destinationColIndex = data.findIndex(
        (e) => e.id === destination.droppableId
      );
      const sourceCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);      
      if(destinationColIndex == 0){
        removed.status = "to_do";
      }else if(destinationColIndex == 1){
        removed.status = "in_progress";
      }else{
        removed.status = "done";
      }
      actualizarTask(removed)
      destinationTask.splice(destination.index, 0, removed);

      data[sourceColIndex].tasks = sourceTask;
      data[destinationColIndex].tasks = destinationTask;  
      console.log(data)    
      setData(data);      
    }
    //Si es la misma columna
    else{
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

  useEffect(() => {
  }, []);

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
                            <Card data={data} setData={setData}
                            task={task} setTask={setTask}
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
