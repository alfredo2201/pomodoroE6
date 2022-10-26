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
        console.log(listData);
        listData[0].tasks.push({
            id: uuidv4(),
            name: task
        })
        console.log(listData);
    }

    return (
        <div>
            <h1 className="title">bbbbb</h1>

            <form className="form"
                // onSubmit={event => {
                //     event.preventDefault();

                //     console.log(event.target.nameTask.value);
                //     setTask(event.target.nameTask.value);
                //     console.log('->',task);
                // }}
                onSubmit={handleSubmit}
                onChange={handleChange}
            >
                <label name="name">name task</label>
                <input name="nameTask" type={"text"} placeholder={'name task'} />
                {/* <input type={"submit"} value={'create task'} /> */}
                <button type={'submit'}>create task</button>
            </form>
            {
                task !== '' ? <h1>hola mundo</h1> : null
            }
        </div>
    )
}

export default CreateTask;
