"use client"

import React from 'react'
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
}

export const Card: React.FC<CardProps> = ({
    imageUrl, carMake, carModel,
    carYear, carMilage, transmission, 
    gas, currentPrice, timeLeft }) => {
    return (
        <div className="w-[280px] h-[320px] border border-gray-300
        rounded-lg flex flex-col items-center overflow-hidden hover:shadow-lg
        transition-all duration-200 hover:scale-105
        hover:border-gray-400">
            <div className="h-[600px] overflow-hidden">
                <img src={imageUrl} alt="" className="object-cover w-full h-full" />
            </div>

            <div className='w-full flex items-baseline justify-between px-2 py-2
            font-semibold text-sm'>
                <div className='border border-gray-300 p-1 rounded-md px-2'>
                    <h1>{carMake} {carModel}</h1>
                </div>

                <div className='border border-gray-300 p-1 rounded-md px-2'>
                    <h1>{carYear}</h1>
                </div>  
            </div>

            <div className='w-full flex items-center justify-evenly text-[12px] font-medium'>

                <div className="flex flex-col items-center justify-center">
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
                
                <div className="flex flex-col items-center justify-center">
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    height="24px" viewBox="0 -960 960 960" 
                    width="24px" fill="gray">
                    <path d="M160-120q-50 0-85-35t-35-85q0-39 22.5-70t57.5-43v-254q-35-12-57.5-43T40-720q0-50 35-85t85-35q50 0 85 35t35 85q0 39-22.5 70T200-607v87h240v-87q-35-12-57.5-43T360-720q0-50 35-85t85-35q50 0 85 35t35 85q0 39-22.5 70T520-607v87h200q17 0 28.5-11.5T760-560v-47q-35-12-57.5-43T680-720q0-50 35-85t85-35q50 0 85 35t35 85q0 39-22.5 70T840-607v47q0 50-35 85t-85 35H520v87q35 12 57.5 43t22.5 70q0 50-35 85t-85 35q-50 0-85-35t-35-85q0-39 22.5-70t57.5-43v-87H200v87q35 12 57.5 43t22.5 70q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T200-240q0-17-11.5-28.5T160-280q-17 0-28.5 11.5T120-240q0 17 11.5 28.5T160-200Zm0-480q17 0 28.5-11.5T200-720q0-17-11.5-28.5T160-760q-17 0-28.5 11.5T120-720q0 17 11.5 28.5T160-680Zm320 480q17 0 28.5-11.5T520-240q0-17-11.5-28.5T480-280q-17 0-28.5 11.5T440-240q0 17 11.5 28.5T480-200Zm0-480q17 0 28.5-11.5T520-720q0-17-11.5-28.5T480-760q-17 0-28.5 11.5T440-720q0 17 11.5 28.5T480-680Zm320 0q17 0 28.5-11.5T840-720q0-17-11.5-28.5T800-760q-17 0-28.5 11.5T760-720q0 17 11.5 28.5T800-680ZM160-240Zm0-480Zm320 480Zm0-480Zm320 0Z"/>
                    </svg>
                    <h1 className="mt-2 text-center">{transmission}</h1>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    height="24px" viewBox="0 -960 960 960" 
                    width="24px" fill="grey">
                    <path d="M160-120v-640q0-33 23.5-56.5T240-840h240q33 0 56.5 23.5T560-760v280h40q33 0 56.5 23.5T680-400v180q0 17 11.5 28.5T720-180q17 0 28.5-11.5T760-220v-288q-9 5-19 6.5t-21 1.5q-42 0-71-29t-29-71q0-32 17.5-57.5T684-694l-84-84 42-42 148 144q15 15 22.5 35t7.5 41v380q0 42-29 71t-71 29q-42 0-71-29t-29-71v-200h-60v300H160Zm80-440h240v-200H240v200Zm480 0q17 0 28.5-11.5T760-600q0-17-11.5-28.5T720-640q-17 0-28.5 11.5T680-600q0 17 11.5 28.5T720-560ZM240-200h240v-280H240v280Zm240 0H240h240Z"/>
                    </svg>
                    <h1 className="mt-2 text-center">{gas}</h1>
                </div>
            </div>

            <div className='h-full flex justify-between gap-2 py-2'>

                <div className='w-[160px]'>
                <Countdown duration={timeLeft}/></div>

                <div className='col-span-1 justify-self-end'>
                <Link href="#"><Button variant={'outline'}
                className='hover:bg-orange-400 hover:text-white'>
                {`${currentPrice} €`}</Button></Link></div>

            </div>
        </div>
    )
}