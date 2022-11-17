import React from "react";
import axios from "axios";
import './card.scss';
import toast from "react-hot-toast";
import { useState } from "react";
import Modal from "../modal";
import moment from "moment/moment";

const Card = (props) => {
    const { data, setData, children, task, setTask, time, status } = props;
    const [statusTask, setStatusTask] = useState(true)
    // console.log(children)
    const [isOpen, setOpen] = useState(false);
    const filterData = async (number, newData) => {
        const dataFilter = await newData[number].tasks.filter(task =>
            task.title !== children
        )
        // console.log('dataFilterb->',dataFilter)
        return dataFilter
    }
    const handleOnClick = async () => {
        const result = confirm(`¿Desea Eliminar la tarea '${children}'?`);

        if (result) {
            const newData = [...data];

            if (newData[0].tasks.find(t => t.title === children)) {
                newData[0].tasks = await filterData(0, newData)
            }
            if (newData[1].tasks.find(t => t.title === children)) {
                newData[1].tasks = await filterData(1, newData)
            }
            if (newData[2].tasks.find(t => t.title === children)) {
                newData[2].tasks = await filterData(2, newData)
            }
            axios.delete(`http://localhost:3000/task/${children}`)
                .then(toast.success(`Tarea ${children} Eliminada`))
            setData(newData);
        }
    }

    const handleUpdate = () => {
        setOpen(true);
    }

    return (
        <div id="container_card">
            <div className='card'>
                <span
                    style={{ cursor: "pointer" }}
                    onClick={handleUpdate}
                >📝</span>
                <p>{children}</p>
                <span
                    className="remove_icon"
                    onClick={handleOnClick}>🗑️</span>


            </div>
            {
                    (status === 'done') ?
                        <span className="time_card">Done on: {moment(time).format('MMMM Do YY, h:mm a')}</span>
                        :
                        null
                }
            <Modal open={isOpen} close={setOpen}
                task={task}
                setTask={setTask}
                data={data}
                setData={setData}
                title={children}
            />
        </div>
    )
}

export default Card