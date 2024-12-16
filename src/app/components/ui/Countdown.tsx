"use client"
import { useState, useEffect } from "react";

interface TimeProps {
    duration: number;
}

export function Countdown( {duration} : TimeProps ) {
    const [time, setTime] = useState(duration)

    function parseTime(t : number) {
        const days = Math.floor(t / (1000 * 60 * 60 * 24)).toString().padStart(2, "0")
        t %= 1000 * 60 * 60 * 24;
        const hours = Math.floor(t / (1000 * 60 * 60)).toString().padStart(2, "0")
        t %= 1000 * 60 * 60;
        const minutes = Math.floor( t / (1000 * 60)).toString().padStart(2, "0")
        t %= 1000 * 60;
        const seconds = Math.floor(t / 1000).toString().padStart(2, "0") 

        return { days, hours, minutes, seconds}
    }

    const { days, hours, minutes, seconds } = parseTime(time);

    useEffect(() => {
        if (time > 0) {
          const timer = setTimeout(() => {
            setTime((prevTime) => prevTime - 1000); 
          }, 1000);
    
          return () => clearTimeout(timer);
        }
      }, [time]);

    return (
        <div className="flex items-center justify-center text-[14px] font-semibold 
        gap-1 px-2 py-1 border border-gray-400 rounded-xl text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="gray"><path d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm40 320q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Z"/></svg>
            <div className="w-[120px]">
              <h1>{`${days} : ${hours} : ${minutes} : ${seconds}`}</h1>
            </div>
        </div>
    )
}