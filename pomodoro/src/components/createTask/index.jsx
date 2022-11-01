import React, { useState } from "react";
import "./createTask.scss"
import { listData } from "../../listData";
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from "uuid";

const notify = (text) => toast(text);

const CreateTask = (props) => {
    const {data, setData, setTask, task} = props;
    const handleChange = (event) => {
        setTask(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newData = [...data]
        console.log(task.length)
        if(task.length > 100){
            toast.error("The text exceeds the maximum number of characters allowed")            
            return 
        }
        if(task.length === 0){
            toast.error("Empty text field")
            return
        } 
        await fetch('http://localhost:3000/task',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body:{
                title: task,
                status: 'to_do'
            }
        })
        newData[0].tasks.push({            
            id: uuidv4(),
            title: task,
            done: false
        });
        setData(newData);
        setTask('');   
        toast.success("Task added successfully")
    }

    return (
        <div>    
            <form 
                className="form"
                onSubmit={handleSubmit}>
                <label className ="form__label" name="name">Name Task: </label>
                <input className ="form__input" onChange={handleChange} value={task}
                name="nameTask" type={"text"} placeholder={'Name task'} maxLength="101" />
                <button className ="form__button" type={'submit'} >Create</button>
                <Toaster/>
            </form>
        </div>
    )
}

export default CreateTask;
