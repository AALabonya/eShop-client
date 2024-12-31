"use client"

import React, { useState, useEffect } from 'react';


interface TimeLeft {
    [key: string]: number;
  }
  
  export const Countdown = ({ targetDate }: { targetDate: string }) => {
    const calculateTimeLeft = (): TimeLeft => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeft: TimeLeft = {};
  
      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
  
      return timeLeft;
    };
  
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
  
      return () => clearTimeout(timer);
    }, [timeLeft]);
  
    const timerComponents: JSX.Element[] = [];
  
    Object.keys(timeLeft).forEach((interval) => {
      if (!timeLeft[interval]) {
        return;
      }
  
      timerComponents.push(
        <span
          key={interval}
          className="bg-[#80b500] overflow-hidden text-white shadow-xl lg:h-20 lg:px-10 rounded-xl lg:text-2xl font-bold flex flex-col justify-center items-center"
        >
          <h1 className="text-3xl font-bold">{timeLeft[interval]}</h1>
          <h1 className="text-lg">{interval}</h1>
        </span>
      );
    });
  
    return (
      <div className="flex justify-center space-x-4 py-10">
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      </div>
    );
  };
  

  const BestDeal = () => {
    const targetDate = '2025-07-01T00:00:00'; // Specify the countdown target date
  
    return (
      <div className="py-9 overflow-hidden">
        <header className="flex flex-col md:flex-row items-center justify-between pb-9">
                        <h2 className="lg:text-4xl text-4xl font-bold tracking-tight text-gray-900 lg:text-start text-center ">
                            Best Deal
                        </h2>
                    </header>
        <div
          className="space-y-3 border rounded"
          style={{
            backgroundImage: `url("/banner.jsx.png")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '50vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
    
          <h1 className="lg:text-6xl md:text-3xl text-2xl pt-7 font-bold text-center text-black">
            Grab the Best Offer of <br /> This Week!
          </h1>
  
          {/* Countdown Timer */}
          <Countdown targetDate={targetDate} />
        </div>
      </div>
    );
  };
  
  export default BestDeal;