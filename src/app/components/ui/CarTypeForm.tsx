'use client'

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
} from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import DragDropImageUpload from './DragDrop'
import OptionPicker from './OptionPicker'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { postCarToServer, postAuctionToServer } from '@/lib/postCarToServer'
import { fetchToken, fetchUser } from '@/app/client'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { supabase } from '@/app/client'

interface CarMake {
  make: string
  make_id: string
}

interface UploadedFile {
  file: File
  preview: string
}

function formatDateWithOffset(date: Date): string {
  const pad = (num: number): string => String(num).padStart(2, '0')

  const year: number = date.getFullYear()
  const month: string = pad(date.getMonth() + 1)
  const day: string = pad(date.getDate())
  const hours: string = pad(date.getHours())
  const minutes: string = pad(date.getMinutes())
  const seconds: string = pad(date.getSeconds())

  const offset: number = -date.getTimezoneOffset()
  const offsetHours: string = pad(Math.floor(Math.abs(offset) / 60))
  const offsetMinutes: string = pad(Math.abs(offset) % 60)
  const offsetSign: string = offset >= 0 ? '+' : '-'

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`
}

export default function CarMakeModelCombobox() {
  const [queryMake, setQueryMake] = useState('')
  const [queryModel, setQueryModel] = useState('')
  const [selectedMake, setSelectedMake] = useState<CarMake | null>(null)
  const [carMakes, setCarMakes] = useState<CarMake[]>([])
  const [price, setPrice] = useState<string>('')
  const [description, setDescription] = useState('')
  const [milage, setMilage] = useState<string>('')
  const [firstRegistrationYear, setFirstRegistrationYear] = useState<string>('')
  const [manufactureYear, setManufactureYear] = useState<string>('')
  const [uploadedImages, setUploadedImages] = useState<UploadedFile[]>([])
  const [isAuction, setIsAuction] = useState(false)
  const [days, setDays] = useState(3)

  const router = useRouter()

  const handleDaysChange = (value: number[]) => {
    setDays(value[0])
  }

  const handleCheckboxChange = () => {
    setIsAuction((prev) => !prev)
  }

  const { toast } = useToast()

  useEffect(() => {
    import('../../../data/carData.json')
      .then((data) => {
        const carMakesDisplay = data.Makes.map(
          (make: { make_display: string; make_id: string }) => ({
            make: make.make_display,
            make_id: make.make_id,
          })
        )
        setCarMakes(carMakesDisplay)
      })
      .catch((err) => {
        console.error('Error loading car makes:', err.message)
      })
  }, [])

  const filteredCarMakes =
    queryMake === ''
      ? carMakes
      : carMakes.filter((make) =>
          make.make.toLowerCase().includes(queryMake.toLowerCase())
        )

  const handleFilesChange = (files: UploadedFile[]) => {
    setUploadedImages(files)
    console.log('Updated uploaded files:', files)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const user = await fetchUser()
    const fileName = `${Date.now()}-${uploadedImages[0].file.name}`

    const formData = {
      user_id: user!.id,
      title: selectedMake?.make + ' ' + queryModel,
      description: description,
      user_price: Number(price),
      seo_tag:
        'https://wunebpnwieaadhsethca.supabase.co/storage/v1/object/public/p2pImages/' +
        fileName,
      seo_desc: '',
      firstReg: '08/12/' + firstRegistrationYear,
      man_year: '08/12/' + manufactureYear,
      mileage: Number(milage),
      fuel: 'gasoline',
      transmission: 'manual',
      color: 'gray',
      kw: 0,
      engineSize: 1000,
      vin: '',
      ddv: true,
      location: '',
    }

    const token = await fetchToken()
    const result = await postCarToServer(formData, token!)

    const { data, error } = await supabase.storage
      .from('p2pImages')
      .upload(fileName, uploadedImages[0].file)

    if (error) {
      console.error('Upload error:', error.message)
      return null
    }

    console.log('Uploaded image path:', data.path)

    if (result.success) {
      if (isAuction) {
        const id = result.message.data.listing_id
        const now: Date = new Date()
        const nowFormatted: string = formatDateWithOffset(now)

        const later: Date = new Date(now)
        later.setDate(later.getDate() + days)
        const laterFormatted: string = formatDateWithOffset(later)

        const auctionFormData = {
          listing_id: id,
          start_time: nowFormatted,
          end_time: laterFormatted,
          minimal_price: Number(price),
        }

        const auctionResult = await postAuctionToServer(auctionFormData, token!)

        if (auctionResult.success) {
          toast({
            variant: 'default',
            title: 'Success',
            description: 'Auction submission successful',
          })
          router.push('/')
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Error submitting to server',
          })
        }
      } else {
        toast({
          variant: 'default',
          title: 'Success',
          description: 'Listing submission successful',
        })
        router.push('/')
        return
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Error submitting to server',
      })
    }
  }

  return (
    <div className="flex w-full justify-between gap-12">
      <div className="space-y-6 w-2/6 bg-white shadow-xl ring-1 ring-gray-200 p-6 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-start gap-4 h-[550px]">
            <div className="flex w-full gap-8 items-start">
              <div className="flex flex-col w-3/6 gap-4 h-[300px]">
                {/* 
                  IMPORTANT: `as="div"` ensures these data attributes
                  get rendered onto an actual <div> 
                */}
                <Combobox
                  as="div"
                  
                  value={selectedMake}
                  onChange={(make) => {
                    setQueryMake('')
                    setSelectedMake(make)
                  }}
                >
                  <label className="block text-[20px] font-medium text-gray-900">
                    Enter Car Data
                  </label>
                  <div className="relative mt-2">
                    <ComboboxInput
                      className="block w-full rounded-md bg-white py-1.5 pr-12 pl-3 text-base text-gray-900 outline-1 border border-gray-200 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                      onChange={(event) => setQueryMake(event.target.value)}
                      onBlur={() => setQueryMake('')}
                      displayValue={(make: CarMake | null) => make?.make || ''}
                      placeholder="Make"
                    />
                    <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2">
                      <ChevronUpDownIcon
                        className="size-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </ComboboxButton>

                    {filteredCarMakes.length > 0 && (
                      <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-none sm:text-sm">
                        {filteredCarMakes.map((make, index) => (
                          <ComboboxOption
                            key={index}
                            value={make}
                            className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white"
                          >
                            <span className="block truncate group-data-selected:font-semibold">
                              {make.make}
                            </span>
                            <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-focus:text-white group-data-selected:flex">
                              <CheckIcon className="size-5" aria-hidden="true" />
                            </span>
                          </ComboboxOption>
                        ))}
                      </ComboboxOptions>
                    )}
                  </div>
                </Combobox>

                <Input
                  placeholder="Model"
                  className="rounded-1"
                  type="text"
                  onChange={(e) => setQueryModel(e.target.value)}
                />

                <Input
                  placeholder="Price"
                  className="rounded-1"
                  type="text"
                  onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                  placeholder="Enter first registration year"
                  className="rounded-1"
                  type="text"
                  onChange={(e) => setFirstRegistrationYear(e.target.value)}
                />
                <Input
                  placeholder="Enter manufacture year"
                  className="rounded-1"
                  type="text"
                  onChange={(e) => setManufactureYear(e.target.value)}
                />
              </div>

              <div className="flex flex-col w-3/6 gap-4 h-[300px]">
                <div className="pt-[40px]">
                  <DragDropImageUpload onFilesChange={handleFilesChange} />
                </div>
                <Input
                  placeholder="Milage [km]"
                  className="rounded-1"
                  type="text"
                  onChange={(e) => setMilage(e.target.value)}
                />
              </div>
            </div>
            <div className="flex w-full gap-4 justify-center">
              <OptionPicker
                placeholder="Gas Type"
                options={['Gasoline', 'Diesel', 'Hybrid', 'Electric']}
              />
              <OptionPicker
                placeholder="Transmission"
                options={['Automatic', 'Manual']}
              />
            </div>
            <Textarea
              placeholder="Enter a short description of your vehicle"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isAuction}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="text-gray-700 text-sm font-medium">
                  Make an Auction From Listing?
                </span>
              </label>
              <span className="text-gray-500 text-sm">
                {isAuction ? 'Auction Enabled' : 'Listing Mode'}
              </span>
            </div>

            <div
              className={`flex flex-col align-baseline gap-5 ${
                !isAuction ? 'hidden' : ''
              }`}
            >
              <h4>Duration Of Auction : {days} Days</h4>
              <Slider
                defaultValue={[3]}
                max={14}
                step={1}
                onValueChange={handleDaysChange}
              />
            </div>
          </div>

          <div className="flex w-full justify-center ">
            <Button type="submit" className="mt-4 w-[60%]">
              Submit
            </Button>
          </div>
        </form>
      </div>
      <img
        src={!isAuction ? '/listing.webp' : '/auction.webp'}
        width={1200}
        alt=""
        className="rounded-tl-[60px] rounded-bl-[60px]"
      />
    </div>
  )
}
