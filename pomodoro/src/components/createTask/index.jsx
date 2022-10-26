import React, { useState } from "react";
import Kanban from "../kanban";
import { listData } from "../../listData";
import { v4 as uuidv4 } from "uuid";

const CreateTask = () => {
    const [task, setTask] = useState('');
    // const [data, setData] = useState(listData)

    const handleChange = (event) => {
        setTask(event.target.value);
        console.log(task);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // setTask(event.target.nameTask.value);
        console.log('task creado ->', task);
        listData[0].tasks.push({
            id: uuidv4(),
            name: task
        });
        console.log(listData);
    }

    return (
        <div>
            <h1 className="title">bbbbb</h1>

            <form className="form"
                onSubmit={handleSubmit}
                onChange={handleChange}
            >
                <label name="name">name task</label>
                <input name="nameTask" type={"text"} placeholder={'name task'} />
                <button type={'submit'}>create task</button>
            </form>
        </div>
    )
}

export default CreateTask;
