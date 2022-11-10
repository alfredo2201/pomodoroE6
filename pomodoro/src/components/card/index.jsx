import React from "react";
import axios from "axios";
import './card.scss';
import toast from "react-hot-toast";

const Card = props => {
    const { data, setData, children } = props;
    // console.log(children)

    const filterData = async(number, newData)=>{
        const dataFilter = await newData[number].tasks.filter(task =>
                task.title !== children
            )
            // console.log('dataFilterb->',dataFilter)
        return dataFilter
    }
    const handleOnClick = async() => {
        const result = confirm(`¿Desea Eliminar la tarea '${children}'?`);

        if (result) {
            const newData = [...data];
            
            if(newData[0].tasks.find(t => t.title === children)){
                newData[0].tasks = await filterData(0, newData)
            }
            if(newData[1].tasks.find(t => t.title === children)){
                newData[1].tasks = await filterData(1, newData)
            }
            if(newData[2].tasks.find(t => t.title === children)){
                newData[2].tasks = await filterData(2, newData)
            }
            axios.delete(`http://localhost:3000/task/${children}`)
            .then(toast.success(`Tarea ${children} Eliminada`))
            setData(newData);
        }
    }

    const handleUpdate = () =>{
        alert('jajaja')
    }
    return (
        <div>
            <div className='card'>
                <span 
                style={{cursor: "pointer"}}
                onClick={handleOnClick}>✅</span>
                <span 
                style={{cursor: "pointer"}}
                onClick={handleUpdate}
                >📝</span>
                {children}
            </div>
        </div>
    )
}

export default Card