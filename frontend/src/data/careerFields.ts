import { CareerField } from '../types';

export const careerFields: CareerField[] = [
  {
    id: 'software',
    name: 'Software Development',
    roles: [
      {
        id: 'frontend',
        name: 'Frontend Developer',
        seniorityLevels: ['entry', 'mid', 'senior']
      },
      {
        id: 'backend',
        name: 'Backend Developer',
        seniorityLevels: ['entry', 'mid', 'senior']
      },
      {
        id: 'fullstack',
        name: 'Full Stack Developer',
        seniorityLevels: ['mid', 'senior']
      }
    ]
  },
  {
    id: 'data',
    name: 'Data Science',
    roles: [
      {
        id: 'data-scientist',
        name: 'Data Scientist',
        seniorityLevels: ['entry', 'mid', 'senior']
      },
      {
        id: 'data-engineer',
        name: 'Data Engineer',
        seniorityLevels: ['entry', 'mid', 'senior']
      }
    ]
  },
  {
    id: 'product',
    name: 'Product Management',
    roles: [
      {
        id: 'product-manager',
        name: 'Product Manager',
        seniorityLevels: ['entry', 'mid', 'senior']
      },
      {
        id: 'product-owner',
        name: 'Product Owner',
        seniorityLevels: ['mid', 'senior']
      }
    ]
  }
]; 