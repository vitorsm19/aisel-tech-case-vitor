import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Header from '../header';
import { useAuth } from '@/contexts/auth-context';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/contexts/auth-context', () => ({
  useAuth: jest.fn(),
}));

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({
  push: mockPush,
});

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display login button when not authenticated', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      token: null,
      isAuthenticated: false,
      login: jest.fn(),
      logout: jest.fn(),
    });

    render(<Header />);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('should display user info and logout button when authenticated', () => {
    const mockUser = { 
      id: '1', 
      username: 'test@example.com', 
      role: 'admin' 
    };
    
    mockUseAuth.mockReturnValue({
      user: mockUser,
      token: 'test-token',
      isAuthenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
    });

    render(<Header />);

    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getAllByText('admin').length).toBeGreaterThan(0);
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });

  it('should display user role correctly for regular user', () => {
    const mockUser = { 
      id: '1', 
      username: 'user@example.com', 
      role: 'user' 
    };
    
    mockUseAuth.mockReturnValue({
      user: mockUser,
      token: 'test-token',
      isAuthenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
    });

    render(<Header />);

    expect(screen.getByText('user@example.com')).toBeInTheDocument();
    expect(screen.getAllByText('user').length).toBeGreaterThan(0);
  });

  it('should navigate to login page when login button is clicked', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      token: null,
      isAuthenticated: false,
      login: jest.fn(),
      logout: jest.fn(),
    });

    render(<Header />);

    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);
    
    expect(mockPush).toHaveBeenCalledWith('/login');
  });

  it('should call logout function when logout button is clicked', () => {
    const mockLogout = jest.fn();
    const mockUser = { 
      id: '1', 
      username: 'test@example.com', 
      role: 'admin' 
    };

    mockUseAuth.mockReturnValue({
      user: mockUser,
      token: 'test-token',
      isAuthenticated: true,
      login: jest.fn(),
      logout: mockLogout,
    });

    render(<Header />);

    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    
    expect(mockLogout).toHaveBeenCalled();
  });

  it('should display Aisel Health title', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      token: null,
      isAuthenticated: false,
      login: jest.fn(),
      logout: jest.fn(),
    });

    render(<Header />);

    expect(screen.getByText('Aisel Health')).toBeInTheDocument();
  });

  it('should display Patient Management System subtitle on larger screens', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      token: null,
      isAuthenticated: false,
      login: jest.fn(),
      logout: jest.fn(),
    });

    render(<Header />);

    expect(screen.getByText('Patient Management System')).toBeInTheDocument();
  });
});