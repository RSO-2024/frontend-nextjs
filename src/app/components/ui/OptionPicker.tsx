"use client";

import { useState } from "react";
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption, Label } from "@headlessui/react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

// Define the types for the props
interface DropdownComboboxProps {
  placeholder: string;  // Placeholder text
  options: string[];    // List of strings to display in the dropdown
}

const OptionPicker: React.FC<DropdownComboboxProps> = ({ placeholder = "Select an option", options }) => {
  const [query, setQuery] = useState("");  // For searching/filtering
  const [selectedOption, setSelectedOption] = useState<string | null>(null);  // For storing selected option

  // Filter the options based on the query input
  const filteredOptions = options.filter(option => option.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-4 w-full">
      <div className="relative mt-2">
        <Combobox
          value={selectedOption}
          onChange={(option) => {
            setQuery('');  // Clear the query when an option is selected
            setSelectedOption(option);
          }}
        >
          <ComboboxInput
            className="block w-full rounded-md bg-white py-1.5 pr-12 pl-3 text-base text-gray-900 outline-1 border border-gray-200 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
            onChange={(event) => setQuery(event.target.value)}  // Update query on input change
            onBlur={() => setQuery('')}  // Clear query on blur
            displayValue={(option: string | null) => option || ''}
            placeholder={placeholder}
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2">
            <ChevronsUpDownIcon className="size-5 text-gray-400" aria-hidden="true" />
          </ComboboxButton>

          {filteredOptions.length > 0 && (
            <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-none sm:text-sm">
              {filteredOptions.map((option, index) => (
                <ComboboxOption
                  key={index}
                  value={option}
                  className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white"
                >
                  <span className="block truncate group-data-selected:font-semibold">{option}</span>

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

export default OptionPicker;
