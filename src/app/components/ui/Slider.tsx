"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { EuroIcon } from "lucide-react";

const SliderInputSync: React.FC = () => {
  const [sliderValue, setSliderValue] = useState<number>(10000);
 

  const formatNumber = (value: number): string => {
    // Manually format the number with a custom thousands separator
    return value
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, "'"); // Insert ' as thousands separator
  };

  const [inputValue, setInputValue] = useState<string>(formatNumber(10000));
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/[^0-9']/g, ""); // Remove everything except digits and ' for grouping
    // Remove unnecessary ' symbols, keeping the valid ones
    value = value.replace(/(?<=\d)'+(?=\d)/g, ""); // Remove extra ' between digits
    const numericValue = parseInt(value.replace(/'/g, ""), 10); // Remove all ' symbols to get a numeric value

    if (!isNaN(numericValue)) {
      const clampedValue = Math.min(500000, Math.max(10000, numericValue)); // Ensure the value is within the valid range
      setSliderValue(clampedValue);
      setInputValue(formatNumber(clampedValue)); // Format and update input field
    } else {
      setInputValue(value); // If it's not a valid number, just update the raw value in input
    }
  };

  const handleSliderChange = (value: number[]) => {
    const newValue = value[0];
    setSliderValue(newValue);
    setInputValue(formatNumber(newValue)); // Sync slider with input value
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Slider
          value={[sliderValue]} // Pass the value as an array
          min={5}
          max={200000}
          step={1000}
          onValueChange={handleSliderChange} // Handle slider change
          className="w-full"
        />
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            value={inputValue} // Update input value with formatted number
            onChange={handleInputChange} // Sync input with number
            className="w-full p-2 border rounded-md text-gray-900"
          />
          <span className="text-gray-500 text-lg">
            <EuroIcon />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SliderInputSync;


