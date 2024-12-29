"use client";

import { useState } from "react";
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption, Label } from "@headlessui/react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { list } from "postcss";

// Define the types for the props
interface YearSelectComboboxProps {
    placeholder: string;  // Optional string prop for the placeholder
  }
  
  const YearSelectCombobox: React.FC<YearSelectComboboxProps> = ({ placeholder = "Enter a year" }) => {
  const [queryYear, setQueryYear] = useState("");  // For searching/filtering years
  const [selectedYear, setSelectedYear] = useState<number | null>(null);  // For storing the selected year

  // Generate years from 2024 down to 1970
  const years = Array.from({ length: 55 }, (_, index) => 2024 - index);

  // Filter the years based on the query input
  const filteredYears = years.filter((year) => year.toString().includes(queryYear));

  return (
    <div className="space-y-4">
      <div className="relative mt-2">
        <Combobox
          value={selectedYear}
          onChange={(year) => {
            setQueryYear('');  // Clear the query when a year is selected
            setSelectedYear(year);
          }}
        >
          <ComboboxInput
            className="block w-full rounded-md bg-white py-1.5 pr-12 pl-3 text-base text-gray-900 outline-1 border border-gray-200 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
            onChange={(event) => setQueryYear(event.target.value)}  // Update query on input change
            onBlur={() => setQueryYear('')}  // Clear query on blur
            displayValue={(year: number | null) => year?.toString() || ''}
            placeholder={placeholder}
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2">
            <ChevronsUpDownIcon className="size-5 text-gray-400" aria-hidden="true" />
          </ComboboxButton>

          {filteredYears.length > 0 && (
            <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-none sm:text-sm">
              {filteredYears.map((year, index) => (
                <ComboboxOption
                  key={index}
                  value={year}
                  className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white"
                >
                  <span className="block truncate group-data-selected:font-semibold">{year}</span>

                  <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-focus:text-white group-data-selected:flex">
                    <CheckIcon className="size-5" aria-hidden="true" />
                  </span>
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </Combobox>
      </div>
    </div>
  );
};

export default YearSelectCombobox;
