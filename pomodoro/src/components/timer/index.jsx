import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import "./timer.scss";

let textTime = "Time to work"
let breaks = 0;
let breakTime = false;

const Timer = () => {
  const [timer, setTimer] = useState(10); // 25 minutes
  const [start, setStart] = useState(false);
  const firstStart = useRef(true);
  const tick = useRef();

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
          if (time == 0 && !breakTime) {                      
            breaks++;           
            textTime = `Time to break\n Break number: ${breaks}`
            toggleStart() 
            toast((t) => (
              <span>
                 <b>Break Time start...</b>
                <button onClick={() =>{ 
                  //Es para seguir con el braek
                  
                  toast.dismiss(t.id)             
                  setStart(!start)
                }}>
                  Continue
                </button>
              </span>
            ));           
            if (breaks === 4 && !breakTime) {              
              breaks = 0
              console.log(breakTime)
              return 15;
            }      
            breakTime = true                                      
            return 3;
               
          } else if (time == 0) {            
            breakTime = false;
            toggleStart()
            console.log("Work : "+breakTime)   
            textTime = "Time to work"            
            return 10;
          }          
          return time; 
        });
      }, 1000);
    } else {
      clearInterval(tick.current);
    }    
  }, [start]);

  const toggleStart = () => {
    setStart(!start);
    if(start){
      toast('Timer paused', {
        duration: 1500,
        position: 'bottom-right',
      
        // Styling
        style: {
          width:200,
          height: 50,
          background: 'cadetblue'          
        },
        className: '',
      
        // Custom Icon
        icon: '⌚',
      
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#212',
          secondary: '#AAAAAA',
        },
      
        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    }
  };

  const dispSecondsAsMins = (seconds) => {
    const mins = Math.floor(seconds / 60);
    let seconds_ = seconds % 60;
    if (seconds_ < 10) {
      seconds_ = "0" + seconds_;
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
        <div>
          <p>{textTime}</p>        
        </div>
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
