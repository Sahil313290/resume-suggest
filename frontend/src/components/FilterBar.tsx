import { useTheme } from '../context/ThemeContext';
import { FilterOptions } from '../types';

interface Props {
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
}

const FilterBar = ({ filters, setFilters }: Props) => {
  const { darkMode } = useTheme();

  const allTags = ['leadership', 'technical', 'metrics', 'process', 'analytics', 'management'];
  const allStyles = ['concise', 'metrics', 'technical'];
  const allSeniority = ['entry', 'mid', 'senior'];

  const toggleFilter = (type: keyof FilterOptions, value: string) => {
    const currentValues = filters[type] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    setFilters({ ...filters, [type]: newValues });
  };

  return (
    <div className={`mb-8 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search resume points..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className={`w-full p-2 rounded-lg border ${
            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
          }`}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleFilter('tags', tag)}
                className={`px-2 py-1 text-xs rounded-full ${
                  filters.tags.includes(tag)
                    ? 'bg-blue-600 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Style
          </h3>
          <div className="flex flex-wrap gap-2">
            {allStyles.map(style => (
              <button
                key={style}
                onClick={() => toggleFilter('style', style)}
                className={`px-2 py-1 text-xs rounded-full ${
                  filters.style.includes(style)
                    ? 'bg-blue-600 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Seniority
          </h3>
          <div className="flex flex-wrap gap-2">
            {allSeniority.map(level => (
              <button
                key={level}
                onClick={() => toggleFilter('seniority', level)}
                className={`px-2 py-1 text-xs rounded-full ${
                  filters.seniority.includes(level)
                    ? 'bg-blue-600 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar; 