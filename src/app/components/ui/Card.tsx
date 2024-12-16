"use client"

import React from 'react'
import { useState } from 'react';
import { Countdown } from './Countdown';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface CardProps {
    imageUrl: string;
    carMake: string;
    carModel: string;
    carYear: string;
    carMilage: string;
    transmission: string;
    gas: string;
    currentPrice: string;
    timeLeft: number;
    location: string;
}

export const Card: React.FC<CardProps> = ({
    imageUrl, carMake, carModel,
    carYear, carMilage, transmission, 
    gas, currentPrice, timeLeft, location }) => {

    const [mouseOn, setMouseOn] = useState(false)

    return (
        <div className="w-[280px] h-[340px] border border-gray-300
        rounded-lg flex flex-col items-center overflow-hidden hover:shadow-lg
        transition-all duration-200 hover:scale-105
        hover:border-gray-400">
            <div className="h-[200px] overflow-hidden">
                <img src={imageUrl} alt="" className="object-cover w-full h-full" />
            </div>

            <div className='w-full flex items-baseline justify-between px-2 py-2
            font-semibold text-sm'>
                <div className='border border-gray-300 p-1 rounded-md px-2 hover:cursor-default'>
                    <h1>{carMake} {carModel}</h1>
                </div>

                <div className='border border-gray-300 p-1 rounded-md px-2 hover:cursor-default'>
                    <h1>{carYear}</h1>
                </div>  
            </div>

            <div className='w-full flex items-center justify-evenly text-[12px] font-medium'>

                <div className="flex flex-col items-center justify-center hover:cursor-default">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="gray"
                    >
                    <path d="M418-340q24 24 62 23.5t56-27.5l224-336-336 224q-27 18-28.5 55t22.5 61Zm62-460q59 0 113.5 16.5T696-734l-76 48q-33-17-68.5-25.5T480-720q-133 0-226.5 93.5T160-400q0 42 11.5 83t32.5 77h552q23-38 33.5-79t10.5-85q0-36-8.5-70T766-540l48-76q30 47 47.5 100T880-406q1 57-13 109t-41 99q-11 18-30 28t-40 10H204q-21 0-40-10t-30-28q-26-45-40-95.5T80-400q0-83 31.5-155.5t86-127Q252-737 325-768.5T480-800Zm7 313Z" />
                    </svg>
                    <h1 className="mt-2 text-center">{`${carMilage} km`}</h1>
                </div>
                
                <div className="flex flex-col items-center justify-center hover:cursor-default">
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    height="24px" viewBox="0 -960 960 960" 
                    width="24px" fill="gray">
                    <path d="M160-120q-50 0-85-35t-35-85q0-39 22.5-70t57.5-43v-254q-35-12-57.5-43T40-720q0-50 35-85t85-35q50 0 85 35t35 85q0 39-22.5 70T200-607v87h240v-87q-35-12-57.5-43T360-720q0-50 35-85t85-35q50 0 85 35t35 85q0 39-22.5 70T520-607v87h200q17 0 28.5-11.5T760-560v-47q-35-12-57.5-43T680-720q0-50 35-85t85-35q50 0 85 35t35 85q0 39-22.5 70T840-607v47q0 50-35 85t-85 35H520v87q35 12 57.5 43t22.5 70q0 50-35 85t-85 35q-50 0-85-35t-35-85q0-39 22.5-70t57.5-43v-87H200v87q35 12 57.5 43t22.5 70q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T200-240q0-17-11.5-28.5T160-280q-17 0-28.5 11.5T120-240q0 17 11.5 28.5T160-200Zm0-480q17 0 28.5-11.5T200-720q0-17-11.5-28.5T160-760q-17 0-28.5 11.5T120-720q0 17 11.5 28.5T160-680Zm320 480q17 0 28.5-11.5T520-240q0-17-11.5-28.5T480-280q-17 0-28.5 11.5T440-240q0 17 11.5 28.5T480-200Zm0-480q17 0 28.5-11.5T520-720q0-17-11.5-28.5T480-760q-17 0-28.5 11.5T440-720q0 17 11.5 28.5T480-680Zm320 0q17 0 28.5-11.5T840-720q0-17-11.5-28.5T800-760q-17 0-28.5 11.5T760-720q0 17 11.5 28.5T800-680ZM160-240Zm0-480Zm320 480Zm0-480Zm320 0Z"/>
                    </svg>
                    <h1 className="mt-2 text-center">{transmission}</h1>
                </div>

                <div className="flex flex-col items-center justify-center hover:cursor-default">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    height="24px" viewBox="0 -960 960 960" 
                    width="24px" fill="grey">
                    <path d="M160-120v-640q0-33 23.5-56.5T240-840h240q33 0 56.5 23.5T560-760v280h40q33 0 56.5 23.5T680-400v180q0 17 11.5 28.5T720-180q17 0 28.5-11.5T760-220v-288q-9 5-19 6.5t-21 1.5q-42 0-71-29t-29-71q0-32 17.5-57.5T684-694l-84-84 42-42 148 144q15 15 22.5 35t7.5 41v380q0 42-29 71t-71 29q-42 0-71-29t-29-71v-200h-60v300H160Zm80-440h240v-200H240v200Zm480 0q17 0 28.5-11.5T760-600q0-17-11.5-28.5T720-640q-17 0-28.5 11.5T680-600q0 17 11.5 28.5T720-560ZM240-200h240v-280H240v280Zm240 0H240h240Z"/>
                    </svg>
                    <h1 className="mt-2 text-center">{gas}</h1>
                </div>
            </div>

            <div className='h-[55px] flex justify-between gap-2 pt-2 hover:cursor-default'>

                <div className='w-[160px]'>
                <Countdown duration={timeLeft}/>
                </div>

                <div>
                <Link href="#"><Button variant={'outline'} 
                onMouseEnter={() => {setMouseOn(true)}}
                onMouseLeave={() => {setMouseOn(false)}}
                className='hover:bg-orange-400 hover:text-white w-[90px] text-[12px]'>
                <svg xmlns="http://www.w3.org/2000/svg" height="0px" viewBox="0 -960 960 960" width="20px" fill={`${mouseOn? 'white' : 'gray'}`}><path d="M600-120q-118 0-210-67T260-360H120v-80h122q-2-11-2-20v-40q0-9 2-20H120v-80h140q38-106 130-173t210-67q69 0 130.5 24T840-748l-70 70q-35-29-78.5-45.5T600-740q-75 0-136.5 38.5T370-600h230v80H344q-2 11-3 20t-1 20q0 11 1 20t3 20h256v80H370q32 63 93.5 101.5T600-220q48 0 92.5-16.5T770-282l70 70q-48 44-109.5 68T600-120Z"/></svg>
                {mouseOn ? "Bid" : currentPrice}</Button></Link>
                </div>

            </div>

            <div className='flex items-center justify-between w-full px-1'>
                <div className='flex h-[50px] gap-1 items-center text-[13px] font-medium pl-2 hover:cursor-default'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="gray"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg>
                    <h1>{location}</h1>
                </div>

            <div>
                <span className="inline-flex items-center rounded-md bg-red-50 mr-2 px-1 py-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-700/10 hover:cursor-default">
                    Top% Offer
                </span>
            </div>
            </div>


        </div>
    )
}