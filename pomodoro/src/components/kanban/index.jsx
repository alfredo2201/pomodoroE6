import "./kanban.scss";
import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { listData } from "../../listData.js";
import Timer from "../timer/index";
import Card from "../card";
import CreateTask from "../createTask/index";

// const kanban = () =>{

//   const [data, setData] = useState(listData);
//   const [task, setTask] = useState("");

//   const removeFromList = (list, index)=>{
//     const result = Array.from(list);
//     const [removed] = result.splice(index, 1);
//     return [removed, result];
//   }

//   const addToList = (list, index, element) =>{
//     const result = Array.from(list);
//     result.splice(index, 0, element);
//     return result;
//   }

//   const list = ["to_do", "in_progress", "done"];

//   const generateList = () =>{
//     list.reduce(
//       (acc, listKey) => ({...acc, [listKey] : data}), {}
//     )
//   }

//   function DragList(){
//     const [elements, setElements] = useState(generateList())

//     useEffect(()=>{
//       setElements(generateList())
//     }, [])

//     const onDragEnd = (result) =>{
//       if(!result.destination){
//         return;
//       }

//       const listCopy = {...elements}
//       const sourceList = listCopy[result.source.droppableId];
//       const [removedElement, newSourceList] = removeFromList(
//         sourceList,
//         result.source.index
//       );
//       listCopy[result.source.droppableId] = new newSourceList;
//       const destinationList = listCopy[result.destination.droppableId];
//       listCopy[result.destination.droppableId] = addToList(
//         destinationList,
//         result.destination.index,
//         removedElement
//       )
//       setElements(listCopy);
//     }

//     return(
//       <DragDropContext>
//         {
//           list.map((listKey)=>{
//           })
//         }
//       </DragDropContext>
//     )
//   }
// }

// export default kanban;

const Kanban = () => {
  const [data, setData] = useState(listData);
  const [task, setTask] = useState("");
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

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
      destinationTask.splice(destination.index, 0, removed);

      data[sourceColIndex].tasks = sourceTask;
      // data[sourceColIndex].tasks = sourceCol;
      data[destinationColIndex].tasks = destinationTask;      
      setData(data);
    }
  };


  useEffect(() => {
    
  }, [data]);

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
                    {section.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
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
                            <Card data={data} setData={setData}>
                              {task.title}
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
