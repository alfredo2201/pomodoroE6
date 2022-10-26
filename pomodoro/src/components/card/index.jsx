import React from "react";
import './card.scss'

const Card = props => {
    const { data, setData, children } = props;
    // console.log(children)
    const handleOnClick = () => {
        const newData = [...data];
        // newData[2].tasks.for(task => task.title !== children)
        const dataFilter = newData[2].tasks.filter(task => 
            task.title !== children
        )
        newData[2].tasks = dataFilter;
        setData(newData);
    }
    return (
        <div>
            <div className='card'>
                <span onClick={handleOnClick}>✅</span>
                {children}
            </div>
        </div>
    )
}

export default Card