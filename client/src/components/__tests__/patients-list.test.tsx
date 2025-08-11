import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import PatientsList from '../patients-list';
import { useAuth } from '@/contexts/auth-context';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('@/contexts/auth-context', () => ({
  useAuth: jest.fn(),
}));

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({
  push: mockPush,
});

const mockPatients = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phoneNumber: '123-456-7890',
    dob: '1990-01-01',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    phoneNumber: '098-765-4321',
    dob: '1985-05-15',
  },
];

describe('PatientsList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios.get.mockResolvedValue({ data: mockPatients });
    mockedAxios.delete.mockResolvedValue({});
  });

  it('should show login message when not authenticated', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      token: null,
      isAuthenticated: false,
      login: jest.fn(),
      logout: jest.fn(),
    });

    render(<PatientsList />);

    expect(screen.getByText('Please log in to view patients')).toBeInTheDocument();
  });

  it('should display patients list when authenticated', async () => {
    const mockUser = { id: '1', username: 'test@example.com', role: 'user' };
    
    mockUseAuth.mockReturnValue({
      user: mockUser,
      token: 'test-token',
      isAuthenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
    });

    render(<PatientsList />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('Patients (2)')).toBeInTheDocument();
    });
  });

  it('should show Create New Patient button for admin users', async () => {
    const mockAdminUser = { id: '1', username: 'admin@example.com', role: 'admin' };
    
    mockUseAuth.mockReturnValue({
      user: mockAdminUser,
      token: 'test-token',
      isAuthenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
    });

    render(<PatientsList />);

    await waitFor(() => {
      expect(screen.getByText('Create New Patient')).toBeInTheDocument();
    });
  });

  it('should not show Create New Patient button for regular users', async () => {
    const mockUser = { id: '1', username: 'user@example.com', role: 'user' };
    
    mockUseAuth.mockReturnValue({
      user: mockUser,
      token: 'test-token',
      isAuthenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
    });

    render(<PatientsList />);

    await waitFor(() => {
      expect(screen.queryByText('Create New Patient')).not.toBeInTheDocument();
    });
  });

  it('should navigate to patient detail when clicking on patient card', async () => {
    const mockUser = { id: '1', username: 'test@example.com', role: 'user' };
    
    mockUseAuth.mockReturnValue({
      user: mockUser,
      token: 'test-token',
      isAuthenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
    });

    render(<PatientsList />);

    await waitFor(() => {
      const patientCard = screen.getByText('John Doe').closest('div');
      fireEvent.click(patientCard);
      expect(mockPush).toHaveBeenCalledWith('/patient/1');
    });
  });

  it('should show error message when API call fails', async () => {
    const mockUser = { id: '1', username: 'test@example.com', role: 'user' };
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));
    
    mockUseAuth.mockReturnValue({
      user: mockUser,
      token: 'test-token',
      isAuthenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
    });

    render(<PatientsList />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch patients/)).toBeInTheDocument();
    });
  });
});