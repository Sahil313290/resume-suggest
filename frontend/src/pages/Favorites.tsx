import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { resumePoints } from '../data/resumePoints';
import ResumePointCard from '../components/ResumePointCard';
import { ResumePoint } from '../types';

const Favorites = () => {
  const { darkMode } = useTheme();
  const [favoritePoints, setFavoritePoints] = useState<ResumePoint[]>([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const points = resumePoints.filter(point => favorites.includes(point.id));
    setFavoritePoints(points);
  }, []);

  return (
    <div className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Favorite Resume Points</h1>
        <p className="text-lg opacity-80">
          Your saved resume points for quick access
        </p>
      </div>

      {favoritePoints.length === 0 ? (
        <div className={`text-center p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            No favorite points yet. Start adding some from the home page!
          </p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {favoritePoints.map(point => (
            <ResumePointCard key={point.id} point={point} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Favorites; 