import React, { useState } from 'react';
import { SearchFilters } from '@/types/marketplace';

interface FilterSidebarProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  practiceAreas: string[];
  locations: string[];
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  practiceAreas,
  locations,
}) => {
  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters);

  const handleFilterUpdate = (update: Partial<SearchFilters>) => {
    const newFilters = { ...localFilters, ...update };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-6">
      {/* Practice Areas */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Practice Areas</h3>
        <div className="space-y-2">
          {practiceAreas.map((area) => (
            <label key={area} className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                checked={localFilters?.practiceArea === area}
                onChange={(e) =>
                  handleFilterUpdate({
                    practiceArea: e.target.checked ? area : undefined,
                  })
                }
              />
              <span className="ml-2">{area}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            className="w-full"
            value={localFilters?.priceRange?.[1] ?? 1000}
            onChange={(e) =>
              handleFilterUpdate({
                priceRange: [0, parseInt(e.target.value)],
              })
            }
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>$0</span>
            <span>${localFilters?.priceRange?.[1] ?? 1000}</span>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Minimum Rating</h3>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              className={`p-2 rounded ${
                localFilters?.rating === rating
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100'
              }`}
              onClick={() => handleFilterUpdate({ rating })}
            >
              {rating}★
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Location</h3>
        <select
          className="w-full p-2 border rounded"
          value={localFilters?.location ?? ''}
          onChange={(e) => handleFilterUpdate({ location: e.target.value || undefined })}
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Experience */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Minimum Experience</h3>
        <select
          className="w-full p-2 border rounded"
          value={localFilters?.experience ?? ''}
          onChange={(e) =>
            handleFilterUpdate({
              experience: e.target.value ? parseInt(e.target.value) : undefined,
            })
          }
        >
          <option value="">Any Experience</option>
          <option value="1">1+ years</option>
          <option value="3">3+ years</option>
          <option value="5">5+ years</option>
          <option value="10">10+ years</option>
        </select>
      </div>
    </div>
  );
}; 