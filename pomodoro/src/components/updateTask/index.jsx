import styled from "styled-components";
import toast from "react-hot-toast";
import axios from "axios";
import {actualizarTask} from '../../helpers/operations'
const UpdateTask = (props) => {
    const { data, setData, setTask, task, title, close } = props;
    // const titleTask = task;
    const handleChange = (event) => {
        // console.log(event.target.value);
        setTask(event.target.value);
    };


    //del listData actualiza el array
    const updateTaskData = (newData) => {
        // let taskFind = newData[0].tasks.findIndex(t => t.title === title);
        let taskFind = newData[0].tasks.findIndex(t => t.title === title);
        if (taskFind !== -1) {
            newData[0].tasks[taskFind].title = task;
            return newData;
        }

        taskFind = newData[1].tasks.findIndex(t => t.title === title);
        if (taskFind !== -1) {
            newData[1].tasks[taskFind].title = task;
            return newData;
        }

        taskFind = newData[2].tasks.findIndex(t => t.title === title);
        if (taskFind !== -1) {
            newData[2].tasks[taskFind].title = task;
            return newData;
        }

    }

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

        //busca una tarea
        // const findTask = searchTask(task);
        let responseData = await axios.get(
            `http://localhost:3000/existTasks/${task}`
        );

        if (responseData.data.length === 0) {
            
            const finData = updateTaskData(newData)
            setData(finData);
            updateTask(task)
            toast.success(`updated task '${title}' to '${task}'`, {duration: 3000})
            
            setTask('')
            close(false)
        } else {
            toast.error(`repeated task ${task}`, {duration: 3000});
            setTask('')
        }
    }

    const updateTask = async() =>{
        await axios.put(`http://localhost:3000/task/${title}`,{
            task: task
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            
            <label style={{ color: 'black' }}>Update   
            <span style={{color: "#1766DC"}}> '{title}'</span>
            </label>
            <div style={{display:"flex",justifyContent:"center",alignItems: "center"}}>
            <input
                style={{ 
                    background: 'white', color: 'black', marginBottom: "10px", padding: "5px" }}
                type="text" name="nameTask" value={task} maxLength="101"
                onChange={handleChange}
            />
            </div>

            <div style={{ display: "flex", 
            alignItems: "center",justifyContent: "center",
            marginTop: "10px"}}>
            <button
                // style={{ display: "flex", alignItems: "center",justifyContent: "center"}}
                style={{padding: "10px", backgroundColor: "cadetblue",
                border:"none", borderRadius: "5px",cursor: "pointer", fontWeight: "500", fontSize: "20px" }}
                type={"submit"}>Actualizar</button>
            </div>

        </form>
        </div>
    )
}

export default UpdateTask;


