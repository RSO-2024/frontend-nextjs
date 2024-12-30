import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { Card } from './Card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Footer from './Footer'

export default function Hero() {
    return (

    <div className="flex flex-col md:flex-col lg:flex-row justify-between items-center pt-[20px]">

        <div className="max-w-lg mt-10 lg:mt-0 lg:ml-28 md:pb-32">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Buy and Sell Your <span className="text-orange-500">Dream Cars</span> Effortlessly
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-80">
            Discover a wide range of luxury and premium vehicles at real market prices. <br />
           
          </p>
          <div className="mt-6 flex gap-4">
          <Link href={'#'}><Button className="font-bold hover:text-gray-100">Bid on Auctions</Button></Link>
          <Link href={'create/auction'}><Button className="text-gray-600 font-bold hover:bg-gray-200 hover:text-orange-500" variant={"secondary"}>Create an Auction</Button></Link>
          </div>
        </div>

        <div className='flex w-full items-center justify-center md:py-0 py-11 min-w-[900px]'>
            <div className="grid grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-7">
              <Card 
                imageUrl="./demo-cars/tesla-model-s.jpg"
                carMake="Tesla" 
                carModel="Model S" 
                carYear="2018"
                carMilage="180000"
                transmission="Automatic"
                gas="Electric"
                currentPrice="27'000"
                timeLeft={220000000}
                location='Ljubljana, Slovenia'
                />

              <Card 
                imageUrl="./demo-cars/bmw-m5.jpeg"
                carMake="BMW" 
                carModel="M5" 
                carYear="2017"
                carMilage="75000"
                transmission="Automatic"
                gas="Gasoline"
                currentPrice="35'000"
                timeLeft={330000000}
                location='Maribor, Slovenia'
                />

              <Card 
                imageUrl="./demo-cars/audi-r8.jpg"
                carMake="Audi" 
                carModel="R8" 
                carYear="2016"
                carMilage="62000"
                transmission="Automatic"
                gas="Gasoline"
                currentPrice="50'000"
                timeLeft={150000000}
                location='Ljubljana, Slovenia'
                />

              <Card 
                imageUrl="./demo-cars/mercedes-g.jpg"
                carMake="Mercedes" 
                carModel="G-Class"
                carYear="2015"
                carMilage="120000" 
                transmission="Automatic"
                gas="Gasoline"
                currentPrice="45'000"
                timeLeft={180000000}
                location='Ljubljana, Slovenia'
                />

              <div className='hidden md:hidden lg:hidden 2xl:block'>
              <Card 
                imageUrl="./demo-cars/porsche-panamera.jpg"
                carMake="Porsche" 
                carModel="Panamera"
                carYear="2018"
                carMilage="85,000" 
                transmission="Automatic"
                gas="Gasoline"
                currentPrice="80'000"
                timeLeft={162000000}
                location="Maribor, Slovenia"
              />
              </div>

              <div className='hidden md:hidden lg:hidden 2xl:block'>
              <Card 
                imageUrl="./demo-cars/lamborghini-urus.jpg"
                carMake="Lamborghini" 
                carModel="Urus"
                carYear="2020"
                carMilage="45,000" 
                transmission="Automatic"
                gas="Gasoline"
                currentPrice="220'000"
                timeLeft={200000000}
                location="Koper, Slovenia"
              />
              </div>

            </div>
            </div>
      
    </div>
  )}
  