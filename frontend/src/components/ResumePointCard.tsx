import { useState } from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useTheme } from '../context/ThemeContext';
import { ResumePoint } from '../types';

interface Props {
  point: ResumePoint;
}

const ResumePointCard = ({ point }: Props) => {
  const { darkMode } = useTheme();
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.includes(point.id);
  });
  const [currentText, setCurrentText] = useState(point.text);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const newFavorites = isFavorite
      ? favorites.filter((id: string) => id !== point.id)
      : [...favorites, point.id];
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const rephrase = (style: 'concise' | 'metrics' | 'technical') => {
    // Simple text transformation function
    const transformations: Record<string, (text: string) => string> = {
      concise: (text) => text.split(' ').slice(0, 10).join(' ') + '...',
      metrics: (text) => text.replace(/\d+/g, (n) => (parseInt(n) * 1.2).toFixed(0)),
      technical: (text) => text.replace(/using/g, 'implemented with').replace(/developed/g, 'engineered')
    };

    setCurrentText(transformations[style](point.text));
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`p-6 rounded-lg shadow-lg ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-wrap gap-2">
          {point.tags.map(tag => (
            <span
              key={tag}
              className={`px-2 py-1 text-xs rounded-full ${
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          onClick={toggleFavorite}
          className={`p-1 rounded-full ${
            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}
        >
          {isFavorite ? (
            <StarIconSolid className="h-5 w-5 text-yellow-400" />
          ) : (
            <StarIcon className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>

      <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {currentText}
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => rephrase('concise')}
          className={`px-3 py-1 text-sm rounded ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Concise
        </button>
        <button
          onClick={() => rephrase('metrics')}
          className={`px-3 py-1 text-sm rounded ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Metrics
        </button>
        <button
          onClick={() => rephrase('technical')}
          className={`px-3 py-1 text-sm rounded ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Technical
        </button>
      </div>
    </motion.div>
  );
};

export default ResumePointCard; 