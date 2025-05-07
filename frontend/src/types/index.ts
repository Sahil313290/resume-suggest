export interface ResumePoint {
  id: string;
  text: string;
  tags: string[];
  style: 'concise' | 'metrics' | 'technical';
  careerField: string;
  role: string;
  seniority: 'entry' | 'mid' | 'senior';
}

export interface CareerField {
  id: string;
  name: string;
  roles: Role[];
}

export interface Role {
  id: string;
  name: string;
  seniorityLevels: string[];
}

export interface FilterOptions {
  search: string;
  tags: string[];
  style: string[];
  seniority: string[];
} 