import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { Card } from './Card'

export default function Hero() {
    return (
      <div className="bg-white">
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-orange-100/20">
          <div className="mx-auto max-w-fit pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
            <div className="px-6 lg:px-0 lg:pt-4">
              <div className="mx-auto max-w-2xl">
                <div className="max-w-lg">
                  <img
                    className="h-11"
                    src="./icon.svg"
                    alt="Your Company"
                  />
                 
                  <h1 className="mt-10 text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                    Car Auctions Made Easy
                  </h1>
                  <p className="mt-6 text-lg/8 text-gray-600">
                  Buy your second hand cars at their actual market price.
                  </p>
                  <div className="mt-10 flex items-center gap-x-6">
                    <a
                      href="#"
                      className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                    >
                      About
                    </a>
                    <a href="#" className="text-sm/6 font-semibold text-gray-900">
                      Trending <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
        
        <div className='flex w-full items-center justify-center md:py-0 py-11 min-w-[600px]'>
            <div className="grid grid-cols-2 gap-7">
              <Card 
                imageUrl="./demo-cars/tesla-model-s.jpg"
                carMake="Tesla" 
                carModel="Model S" 
                carYear="2018"
                carMilage="180000"
                transmission="Automatic"
                gas="Electric"
                currentPrice="12'000"
                timeLeft={120000000}
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
                timeLeft={130000000}
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
                />
            </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  