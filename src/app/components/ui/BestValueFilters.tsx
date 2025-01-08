
import getBestValueFilters from '@/lib/getBestValueFilters';
import React from 'react';

// Definiraj tip za filtre
type Filters = {
    fuel: string[];
    location: string[];
    color: string[];
    engineSize: string[];
    transmission: string[];
};

export default async function BestValueFilters(){
    const filters = await getBestValueFilters();

    

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Best Value Filters</h2>
            <div className="grid grid-cols-2 gap-4">
                {Object.keys(filters).map((filterKey) => (
                    <div key={filterKey}>
                        <label className="block text-sm font-medium text-gray-700">{filterKey}</label>
                        <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            {filters[filterKey as keyof Filters].map((option: string, index: number) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};
