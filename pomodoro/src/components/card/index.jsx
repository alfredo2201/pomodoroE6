import React from "react";
import './card.scss'

const Card = props => {
    return (
        
        <div>
            <div 
            // style={{display: "flex", alignItems: "center"}}
            >
            {/* <span style={{display: "flex", alignItems: "center"}}>{ true ? "✅" : "❌"}</span> */}
            </div>
            <div className='card'>
            {props.children}
        </div>
        </div>
    )
}

export default Card