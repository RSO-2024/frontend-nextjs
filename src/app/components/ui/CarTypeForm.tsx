'use client'

import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Label } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import DragDropImageUpload from './DragDrop'
import YearSelectCombobox from './TimePicker'
import OptionPicker from './OptionPicker'
import SliderInputSync from './Slider'
import { Button } from '@/components/ui/button'

interface CarMake {
  make: string;
  make_id: string;
}

interface CarModel {
  model: string;
}

export default function CarMakeModelCombobox() {
  const [queryMake, setQueryMake] = useState('')
  const [queryModel, setQueryModel] = useState('')
  const [selectedMake, setSelectedMake] = useState<CarMake | null>(null)
  const [selectedModel, setSelectedModel] = useState<CarModel | null>(null)
  const [carMakes, setCarMakes] = useState<CarMake[]>([])
  const [carModels, setCarModels] = useState<CarModel[]>([])


  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxToggle = () => {
    setIsChecked((prev) => !prev);
  };

  const imageSource = isChecked
    ? "/path/to/checked-image.png" // Image source when checked
    : "/path/to/unchecked-image.png"; // Image source when unchecked

  // Load car makes from JSON
  useEffect(() => {
    import('../../../data/carData.json')
      .then((data) => {
        const carMakesDisplay = data.Makes.map((make: { make_display: string, make_id: string }) => ({
          make: make.make_display,
          make_id: make.make_id,
        }));
        setCarMakes(carMakesDisplay);
      })
      .catch((err) => {
        console.error('Error loading car makes:', err.message);
      });
  }, []);


  const filteredCarMakes =
    queryMake === ''
      ? carMakes
      : carMakes.filter((make) => make.make.toLowerCase().includes(queryMake.toLowerCase()));

  const filteredCarModels =
    queryModel === ''
      ? carModels
      : carModels.filter((model) => model.model.toLowerCase().includes(queryModel.toLowerCase()));

  return (
    <div className='flex w-full justify-between gap-12'>
    <div className="space-y-6 w-2/6 bg-white shadow-xl ring-1 ring-gray-200 p-6 rounded-lg">
      <form action="" >
      
      <div className='flex flex-col items-start gap-4 h-[500px]'>
      
      <div className='flex w-full gap-8 items-start'>
      <div className='flex flex-col w-3/6 gap-4 h-[240px]'>
      {/* Car Make Combobox */}
      <Combobox
        as="div"
        value={selectedMake}
        onChange={(make) => {
          setQueryMake('');
          setSelectedMake(make);
        }}
      >
        <Label className="block text-[20px] font-medium text-gray-900">Enter Car Data</Label>
        <div className="relative mt-2">
          <ComboboxInput
            className="block w-full rounded-md bg-white py-1.5 pr-12 pl-3 text-base text-gray-900 outline-1 border border-gray-200 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
            onChange={(event) => setQueryMake(event.target.value)}
            onBlur={() => setQueryMake('')}
            displayValue={(make: CarMake | null) => make?.make || ''}
            placeholder="Make"
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2">
            <ChevronUpDownIcon className="size-5 text-gray-400" aria-hidden="true" />
          </ComboboxButton>

          {filteredCarMakes.length > 0 && (
            <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-none sm:text-sm">
              {filteredCarMakes.map((make, index) => (
                <ComboboxOption
                  key={index}
                  value={make}
                  className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white"
                >
                  <span className="block truncate group-data-selected:font-semibold">{make.make}</span>

                  <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-focus:text-white group-data-selected:flex">
                    <CheckIcon className="size-5" aria-hidden="true" />
                  </span>
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </div>
      </Combobox>

      <Input placeholder="Model" className='rounded-1' />

      <YearSelectCombobox placeholder='Enter first registration year'/>

      <YearSelectCombobox placeholder='Enter manufacture year'/>

      
      </div>

      <div className='pt-[40px]'>
      <DragDropImageUpload/>
      </div>

      </div>

      <div className='flex w-full gap-4 justify-center'>
        <OptionPicker placeholder="Gas Type" options={['Gasoline', 'Diesel', 'Hybrid', 'Electric']} />
        <OptionPicker placeholder="Transmission" options={['Automatic', 'Manual']} />

      </div>

      <div className='flex w-full justify-between'>
      <div className='flex flex-col'>
        <h1></h1>
        <SliderInputSync/>
      </div>

      <div className="flex flex-col items-center space-y-4 pr-[40px]">
      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={!isChecked}
            onChange={handleCheckboxToggle}
            className="form-checkbox"
          />
          <span>Auction</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxToggle}
            className="form-checkbox"
          />
          <span>Listing</span>
        </label>
      </div>
    </div>
      </div>

      <Textarea placeholder='Enter a short description of your vehicle'/>

      </div>

      <div className='flex w-full justify-center'><Button type="submit" className="mt-4 w-[60%]">Submit</Button></div>
      
      
      </form>
    </div>

  <img src={isChecked? "/listing.webp" : "/auction.webp"} width={1200} alt="" className='rounded-tl-[60px] rounded-bl-[60px]' />

  </div>
  );
}
