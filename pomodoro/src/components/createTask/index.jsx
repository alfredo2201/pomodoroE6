import React, { useState } from "react";
import "./createTask.scss"
import { listData } from "../../listData";
import { v4 as uuidv4 } from "uuid";

const CreateTask = () => {
    const [task, setTask] = useState('');
    // const [data, setData] = useState(listData)

    const handleChange = (event) => {
        // setTask(event.target.value);
        // console.log(task);
    }

    const handleSubmit = (event) => {
        event.preventDefault();        
        const task = event.target.nameTask.value
        setTask(event.target.nameTask.value);
        console.log('task creado ->', task);
        listData[0].tasks.push({
            id: uuidv4(),
            title: task,
            done: false
        });
        console.log(listData);
    }

    return (
        <div>    
            <form className="form"
                onSubmit={handleSubmit}
                onChange={handleChange}
            >
                <label className ="form__label" name="name">Name Task: </label>
                <input className ="form__input" name="nameTask" type={"text"} placeholder={'Name task'} />
                <button className ="form__button" type={'submit'}>Create</button>
            </form>
        </div>
    )
}

export default CreateTask;
