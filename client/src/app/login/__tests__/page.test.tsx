import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import LoginPage from '../page';
import { AuthProvider } from '@/contexts/auth-context';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({
  push: mockPush,
});

describe('LoginPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render login form elements', () => {
    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should show test accounts information', () => {
    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    expect(screen.getByText('Test accounts:')).toBeInTheDocument();
    expect(screen.getByText('jayanka@aisel.co / 123 (Admin)')).toBeInTheDocument();
    expect(screen.getByText('vitor@aisel.co / 123 (User)')).toBeInTheDocument();
  });

  it('should update input values when typing', () => {
    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('should show loading state during login', async () => {
    mockedAxios.post.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({
        data: { access_token: 'test-token', user: { id: '1', username: 'test@example.com', role: 'user' } }
      }), 100))
    );

    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Signing in...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('should handle successful login', async () => {
    const mockLoginResponse = {
      data: {
        access_token: 'test-token',
        user: { id: '1', username: 'test@example.com', role: 'user' }
      }
    };

    mockedAxios.post.mockResolvedValueOnce(mockLoginResponse);

    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:3001/api/auth/login',
        {
          username: 'test@example.com',
          password: 'password123',
        }
      );
      expect(mockPush).toHaveBeenCalledWith('/home');
    });
  });

  it('should handle login error', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Login failed'));

    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
    });
  });

  it('should require email and password fields', () => {
    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    expect(emailInput).toHaveAttribute('required');
    expect(passwordInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});