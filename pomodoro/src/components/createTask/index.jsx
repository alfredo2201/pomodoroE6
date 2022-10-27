import React, { useState } from "react";
import "./createTask.scss"
import { listData } from "../../listData";
import { v4 as uuidv4 } from "uuid";

const CreateTask = (props) => {
    const {data, setData, setTask, task} = props;
    // const [task, setTask] = useState('');
    // const [data, setData] = useState(listData)

    const handleChange = (event) => {
        setTask(event.target.value);
        // console.log(task);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newData = [...data]
        newData[0].tasks.push({
            id: uuidv4(),
            title: task,
            done: false
        });
        setData(newData);
        setTask('');
        // document.getElementsByClassName('form__input').value = '';
    }

    return (
        <div>    
            <form 
                className="form"
                // id="form"
                onSubmit={handleSubmit}
            >
                <label className ="form__label" name="name">Name Task: </label>
                <input className ="form__input" onChange={handleChange} value={task}
                name="nameTask" type={"text"} placeholder={'Name task'} />
                <button className ="form__button" type={'submit'}>Create</button>
            </form>
        </div>
    )
}

export default CreateTask;
