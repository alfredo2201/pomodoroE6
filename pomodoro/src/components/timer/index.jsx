import React, { useState, useEffect } from "react";
import "./timer.scss";
const Timer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5);
  const [displayMessage, setDisplayMessage] = useState(false);
  useEffect(() => {
    let interval = setInterval(() => {
        clearInterval(interval);

        if(seconds === 0){
            if(minutes !==0  ){
                setSeconds(59)
                setMinutes(minutes-1)
            }else{
                let minutes = displayMessage ? 24 : 4
                let seconds = 59;

                setSeconds(seconds)
                setMinutes(minutes)
                setDisplayMessage(!displayMessage)
            }        
        }else{
            setSeconds(seconds-1)
        }
    }, 1000)
  }, [seconds]);

  const timerMinutes =  minutes < 10 ? `0${minutes}`: minutes
  const timerSeconds =  seconds < 10 ? `0${seconds}`: seconds
  return (
    <div className="container">
      <div className="container__message">
        <div>Break Time! New session starts in: </div>
      </div>
      <div className="container__timer">
        {timerMinutes}:{timerSeconds}
      </div>
    </div>
  );
};

export default Timer;
