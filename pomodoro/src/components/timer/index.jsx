import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import "./timer.scss";

const Timer = () => {
  const [timer, setTimer] = useState(10); // 25 minutes
  const [start, setStart] = useState(false);
  const firstStart = useRef(true);
  const tick = useRef();
  let breaks = 0;
  let breakTime = false;
  
  useEffect(() => {
    if (firstStart.current) {
      firstStart.current = !firstStart.current;
      return;
    }
    if (start) {
      tick.current = setInterval(() => {
        setTimer((timer) => {
          let time = timer - 1;   
          if(time <= 5 && time > 0 && !breakTime){
            toast('Break time starts in: '+time, {
              duration: 1000,
              position: 'top-center',
            
              // Styling
              style: {},
              className: '',
            
              // Custom Icon
              icon: '⌚',
            
              // Change colors of success/error/loading icon
              iconTheme: {
                primary: '#000',
                secondary: '#fff',
              },
            
              // Aria
              ariaProps: {
                role: 'status',
                'aria-live': 'polite',
              },
            });
          }          
          if (time === 0 && !breakTime) {                      
            breaks++
            console.log("break: "+breaks);
            if (breaks === 4 && !breakTime) {
              breakTime = true; 
              breaks = 0
              return 15;
            }
            breakTime = true;                        
            return 3;          
          } else if (time === 0) {
            console.log("Pasa el break");
            breakTime = false;
            return 10;
          }          
          return time; 
        });
      }, 1000);
    } else {
      clearInterval(tick.current);
    }    
  }, [start]);

  const breakTimer = () => {
    if (breakTime) {
      if (breaks === 3) {
        setTimer(25);
        breaks = 0;
      }
      setTimer(20);
      breaks++;
    } else {
      setTimer(15);
    }
  };
  const toggleStart = () => {
    setStart(!start);
  };

  const dispSecondsAsMins = (seconds) => {
    const mins = Math.floor(seconds / 60);
    let seconds_ = seconds % 60;
    if (seconds_ < 10) {
      seconds_ = "0" + seconds_;
    }
    if (seconds == 0 && !breakTime) {
      toggleStart();
      breakTime = true;
      breakTimer();
    } else {
      breakTime = false;
    }
    return (
      (mins == 0 ? "00" : mins.toString()) +
      ":" +
      (seconds_ == 0 ? "00" : seconds_.toString())
    );
  };

  return (
    <div className="container">
      <div className="container__message">
        <div>Break Time! New session starts in: </div>
      </div>
      <div className="container__timer">{dispSecondsAsMins(timer)}</div>
      <div className="buttons">
        <button className="buttons__start" onClick={toggleStart}>
          {!start ? "Start" : "Stop"}
        </button>
        <Toaster/>
      </div>
    </div>
  );
};

export default Timer;
