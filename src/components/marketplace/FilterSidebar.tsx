import { useState, useEffect } from 'react';
import { SearchFilters } from '@/types/marketplace';
import { StarIcon } from '@heroicons/react/20/solid';

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

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterUpdate = (updates: Partial<SearchFilters>) => {
    const newFilters = { ...localFilters, ...updates };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Filters</h2>

      {/* Practice Areas */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Practice Areas</h3>
        <div className="space-y-2">
          {practiceAreas.map((area) => (
            <label key={area} className="flex items-center">
              <input
                type="checkbox"
                checked={localFilters.practiceArea === area}
                onChange={(e) =>
                  handleFilterUpdate({
                    practiceArea: e.target.checked ? area : undefined,
                  })
                }
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">{area}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Location</h3>
        <select
          value={localFilters.location || ''}
          onChange={(e) =>
            handleFilterUpdate({ location: e.target.value || undefined })
          }
          className="w-full p-2 border rounded-lg"
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Price Range ($/hr)</h3>
        <div className="flex space-x-4">
          <input
            type="number"
            placeholder="Min"
            value={localFilters.priceRange?.min || ''}
            onChange={(e) =>
              handleFilterUpdate({
                priceRange: {
                  ...localFilters.priceRange,
                  min: parseInt(e.target.value) || 0,
                },
              })
            }
            className="w-1/2 p-2 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Max"
            value={localFilters.priceRange?.max || ''}
            onChange={(e) =>
              handleFilterUpdate({
                priceRange: {
                  ...localFilters.priceRange,
                  max: parseInt(e.target.value) || 0,
                },
              })
            }
            className="w-1/2 p-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Minimum Rating</h3>
        <div className="flex space-x-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => handleFilterUpdate({ rating })}
              className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                localFilters.rating === rating
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <StarIcon className="h-6 w-6" />
            </button>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Minimum Experience (years)</h3>
        <input
          type="range"
          min="0"
          max="30"
          step="1"
          value={localFilters.experience || 0}
          onChange={(e) =>
            handleFilterUpdate({ experience: parseInt(e.target.value) })
          }
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>0</span>
          <span>{localFilters.experience || 0} years</span>
          <span>30+</span>
        </div>
      </div>

      {/* Reset Filters */}
      <button
        onClick={() => {
          setLocalFilters({});
          onFilterChange({});
        }}
        className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
      >
        Reset Filters
      </button>
    </div>
  );
}; 