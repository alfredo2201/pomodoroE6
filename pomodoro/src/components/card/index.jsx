import React from "react";
import './card.scss'

const Card = (props) =>{
    return(
        <div className="card">
            {props.childen}
        </div>
    )
}

export default Card;