"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { EuroIcon } from "lucide-react";

const SliderInputSync: React.FC = () => {
  const [sliderValue, setSliderValue] = useState<number>(10000);


  const formatNumber = (value: number): string => {
    return value
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, "'"); // Format with ' as the thousands separator
  };

  const parseFormattedNumber = (value: string): number => {
    return parseInt(value.replace(/'/g, ""), 10) || 0; // Remove all ' and parse as number
  };

  const [inputValue, setInputValue] = useState<string>(formatNumber(sliderValue));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    setInputValue(rawValue); // Update input value immediately

    const numericValue = parseFormattedNumber(rawValue);

    if (!isNaN(numericValue)) {
      const clampedValue = Math.min(200000, Math.max(10000, numericValue));
      setSliderValue(clampedValue); // Sync slider with validated number
    }
  };

  const handleInputBlur = () => {
    const numericValue = parseFormattedNumber(inputValue);
    const clampedValue = Math.min(200000, Math.max(10000, numericValue));
    setInputValue(formatNumber(clampedValue)); // Ensure input is properly formatted
  };

  const handleSliderChange = (value: number[]) => {
    const newValue = value[0];
    setSliderValue(newValue);
    setInputValue(formatNumber(newValue)); // Sync input with slider
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Slider
          value={[sliderValue]} // Pass the value as an array
          min={5}
          max={200000}
          step={1}
          onValueChange={handleSliderChange} // Handle slider change
          className="w-full"
        />
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            value={inputValue} // Display formatted input value
            onChange={handleInputChange} // Update on user input
            onBlur={handleInputBlur} // Format input on blur
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
