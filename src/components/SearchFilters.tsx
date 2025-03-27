import { useState } from 'react';
import { Filter, initialFilter, genres, conditions } from '@/lib/data';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchFiltersProps {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  onSearch: () => void;
  isMobile?: boolean; // Add isMobile as an optional prop
}

const SearchFilters = ({ filter, setFilter, onSearch, isMobile = false }: SearchFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleReset = () => {
    setFilter(initialFilter);
  };
  
  const handleCheckboxChange = (key: 'genre' | 'condition', value: string) => {
    const currentValues = filter[key];
    
    if (Array.isArray(currentValues)) {
      if (currentValues.includes(value)) {
        setFilter({
          ...filter,
          [key]: currentValues.filter(item => item !== value)
        });
      } else {
        setFilter({
          ...filter,
          [key]: [...currentValues, value]
        });
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-smooth overflow-hidden">
      {/* Basic search */}
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-book-accent/20 focus:border-book-accent transition-all"
              value={filter.title}
              onChange={(e) => setFilter({ ...filter, title: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            />
          </div>
          
          <button 
            className={cn(
              "ml-3 p-2.5 rounded-md border transition-all",
              isOpen 
                ? "border-book-accent text-book-accent" 
                : "border-gray-200 text-gray-500 hover:border-gray-300"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {filter.condition.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {filter.condition.map(condition => (
                <Chip 
                  key={condition} 
                  label={condition} 
                  onRemove={() => handleCheckboxChange('condition', condition)} 
                />
              ))}
            </div>
          )}
          
          {filter.genre.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {filter.genre.map(genre => (
                <Chip 
                  key={genre} 
                  label={genre} 
                  onRemove={() => handleCheckboxChange('genre', genre)} 
                />
              ))}
            </div>
          )}
          
          {filter.isAuction !== null && (
            <Chip 
              label={filter.isAuction ? 'Auction Only' : 'Buy Now Only'} 
              onRemove={() => setFilter({ ...filter, isAuction: null })} 
            />
          )}
          
          {filter.minPrice > 0 || filter.maxPrice < 100 ? (
            <Chip 
              label={`Price: $${filter.minPrice} - $${filter.maxPrice}`} 
              onRemove={() => setFilter({ ...filter, minPrice: 0, maxPrice: 100 })} 
            />
          ) : null}
        </div>
      </div>
      
      {/* Advanced filters */}
      {isOpen && (
        <div className="border-t border-gray-100 p-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Author</h3>
              <input
                type="text"
                placeholder="Author name..."
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-book-accent/20 focus:border-book-accent transition-all"
                value={filter.author}
                onChange={(e) => setFilter({ ...filter, author: e.target.value })}
              />
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Listing Type</h3>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="listing-type"
                    checked={filter.isAuction === null}
                    onChange={() => setFilter({ ...filter, isAuction: null })}
                    className="w-4 h-4 text-book-accent focus:ring-book-accent/20"
                  />
                  <span className="text-sm">All</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="listing-type"
                    checked={filter.isAuction === true}
                    onChange={() => setFilter({ ...filter, isAuction: true })}
                    className="w-4 h-4 text-book-accent focus:ring-book-accent/20"
                  />
                  <span className="text-sm">Auction</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="listing-type"
                    checked={filter.isAuction === false}
                    onChange={() => setFilter({ ...filter, isAuction: false })}
                    className="w-4 h-4 text-book-accent focus:ring-book-accent/20"
                  />
                  <span className="text-sm">Buy Now</span>
                </label>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Price Range</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-book-accent/20 focus:border-book-accent transition-all"
                  value={filter.minPrice}
                  onChange={(e) => setFilter({ ...filter, minPrice: Number(e.target.value) })}
                />
                <span className="text-gray-400">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-book-accent/20 focus:border-book-accent transition-all"
                  value={filter.maxPrice}
                  onChange={(e) => setFilter({ ...filter, maxPrice: Number(e.target.value) })}
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Condition</h3>
              <div className="grid grid-cols-2 gap-2">
                {conditions.map(condition => (
                  <label key={condition} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filter.condition.includes(condition)}
                      onChange={() => handleCheckboxChange('condition', condition)}
                      className="w-4 h-4 text-book-accent rounded focus:ring-book-accent/20"
                    />
                    <span className="text-sm">{condition}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium mb-3">Genre</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {genres.map(genre => (
                  <label key={genre} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filter.genre.includes(genre)}
                      onChange={() => handleCheckboxChange('genre', genre)}
                      className="w-4 h-4 text-book-accent rounded focus:ring-book-accent/20"
                    />
                    <span className="text-sm">{genre}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <button
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              onClick={handleReset}
            >
              Reset all filters
            </button>
            
            <button
              className="px-4 py-2 bg-book-accent text-white rounded-md hover:bg-book-accent/90 transition-colors"
              onClick={() => {
                onSearch();
                setIsOpen(false);
              }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Chip = ({ label, onRemove }: { label: string; onRemove: () => void }) => {
  return (
    <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">
      <span>{label}</span>
      <button className="ml-1.5 text-gray-500 hover:text-gray-700" onClick={onRemove}>
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};

export default SearchFilters;
