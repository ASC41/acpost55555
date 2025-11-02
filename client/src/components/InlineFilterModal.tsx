import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

interface InlineFilterModalProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  onClose: () => void;
}

export default function InlineFilterModal({ activeFilter, onFilterChange, onClose }: InlineFilterModalProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filterOptions = [
    { value: "editing", label: "Editing" },
    { value: "motion-graphics", label: "Motion Graphics" },
    { value: "directing", label: "Directing" },
    { value: "vfx", label: "VFX" },
    { value: "color", label: "Color" },
    { value: "sound-design", label: "Sound Design" },
    { value: "shorts", label: "Short Films" },
    { value: "music-videos", label: "Music Videos" }
  ];

  const currentFilterLabel = filterOptions.find(opt => opt.value === activeFilter)?.label || activeFilter;

  const handleFilterSelect = (newFilter: string) => {
    onFilterChange(newFilter);
    setDropdownOpen(false);
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <span className="text-white font-semibold">Filtered by:</span>
        
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 bg-[#00FFFF] text-black px-4 py-2 rounded hover:bg-[#00CCCC] transition-colors"
            data-testid="filter-dropdown-button"
          >
            <span className="font-semibold">{currentFilterLabel}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50 min-w-[200px]">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterSelect(option.value)}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    option.value === activeFilter ? 'bg-gray-700 text-[#00FFFF]' : 'text-white'
                  }`}
                  data-testid={`filter-option-${option.value}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={onClose}
        className="p-2 hover:bg-gray-800 rounded-full transition-colors"
        data-testid="filter-close-button"
      >
        <X className="w-5 h-5 text-gray-400" />
      </button>
    </div>
  );
}