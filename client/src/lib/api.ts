const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  BASE: API_BASE_URL,
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
  },
  PATIENTS: {
    BASE: `${API_BASE_URL}/api/patients`,
    BY_ID: (id: string | number) => `${API_BASE_URL}/api/patients/${id}`,
  },
};