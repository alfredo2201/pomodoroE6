import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { data } from "../../data";
import Card from "../card";
const Kanba = () =>{
    const [task, setTask] = useState(data);

    const onDragEnd = result =>{
        console.log(result);
    }

    return(
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban">
                {
                    task.map(section =>(
                        <Droppable
                            key={section.id}
                            droppableId={section.id}
                        >
                            {(provided)=>(
                                <div
                                    {...provided.droppableProps}
                                    className='kanban_section'
                                    ref={provided.innerRef}
                                >
                                    <div className="kanban_section_title">
                                        {section.title}
                                    </div>

                                    <div className="kanban_section_content">
                                    {
                                        section.tasks.map((task, index)=>{
                                            <Card>
                                                {task.title}
                                            </Card>
                                        })
                                    }
                                </div>
                                </div>
                                
                            )}
                        </Droppable>
                    ))
                }
            </div>
        </DragDropContext>
    )
}

export default Kanba;