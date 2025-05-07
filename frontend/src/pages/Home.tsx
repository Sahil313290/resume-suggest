import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { careerFields } from '../data/careerFields';
import { resumePoints } from '../data/resumePoints';
import ResumePointCard from '../components/ResumePointCard';
import FilterBar from '../components/FilterBar';
import { FilterOptions } from '../types';

const Home = () => {
  const { darkMode } = useTheme();
  const [selectedCareer, setSelectedCareer] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedSeniority, setSelectedSeniority] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    tags: [],
    style: [],
    seniority: []
  });

  const filteredPoints = resumePoints.filter(point => {
    if (selectedCareer && point.careerField !== selectedCareer) return false;
    if (selectedRole && point.role !== selectedRole) return false;
    if (selectedSeniority && point.seniority !== selectedSeniority) return false;
    if (filters.search && !point.text.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.tags.length && !filters.tags.some(tag => point.tags.includes(tag))) return false;
    if (filters.style.length && !filters.style.includes(point.style)) return false;
    if (filters.seniority.length && !filters.seniority.includes(point.seniority)) return false;
    return true;
  });

  return (
    <div className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Resume Points Suggestor</h1>
        <p className="text-lg opacity-80">
          Select your career path and get tailored resume points
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <select
          value={selectedCareer}
          onChange={(e) => {
            setSelectedCareer(e.target.value);
            setSelectedRole('');
            setSelectedSeniority('');
          }}
          className={`p-2 rounded-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
          }`}
        >
          <option value="">Select Career Field</option>
          {careerFields.map(field => (
            <option key={field.id} value={field.id}>{field.name}</option>
          ))}
        </select>

        <select
          value={selectedRole}
          onChange={(e) => {
            setSelectedRole(e.target.value);
            setSelectedSeniority('');
          }}
          className={`p-2 rounded-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
          }`}
          disabled={!selectedCareer}
        >
          <option value="">Select Role</option>
          {careerFields
            .find(field => field.id === selectedCareer)
            ?.roles.map(role => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
        </select>

        <select
          value={selectedSeniority}
          onChange={(e) => setSelectedSeniority(e.target.value)}
          className={`p-2 rounded-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
          }`}
          disabled={!selectedRole}
        >
          <option value="">Select Seniority</option>
          {careerFields
            .find(field => field.id === selectedCareer)
            ?.roles.find(role => role.id === selectedRole)
            ?.seniorityLevels.map(level => (
              <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
            ))}
        </select>
      </div>

      <FilterBar filters={filters} setFilters={setFilters} />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredPoints.map(point => (
          <ResumePointCard key={point.id} point={point} />
        ))}
      </motion.div>
    </div>
  );
};

export default Home; 