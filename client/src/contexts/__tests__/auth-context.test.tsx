import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../auth-context';

const TestComponent = () => {
  const { user, token, isAuthenticated, login, logout } = useAuth();
  
  return (
    <div>
      <div data-testid="authenticated">{isAuthenticated ? 'true' : 'false'}</div>
      <div data-testid="token">{token || 'no-token'}</div>
      <div data-testid="user">{user?.username || 'no-user'}</div>
      <button 
        data-testid="login-btn" 
        onClick={() => login('test-token', { id: '1', username: 'test@example.com', role: 'user' })}
      >
        Login
      </button>
      <button data-testid="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should start with no authentication', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('token')).toHaveTextContent('no-token');
    expect(screen.getByTestId('user')).toHaveTextContent('no-user');
  });

  it('should login user and store token', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    act(() => {
      screen.getByTestId('login-btn').click();
    });

    expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
    expect(screen.getByTestId('token')).toHaveTextContent('test-token');
    expect(screen.getByTestId('user')).toHaveTextContent('test@example.com');
  });

  it('should logout user and clear storage', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    act(() => {
      screen.getByTestId('login-btn').click();
    });

    act(() => {
      screen.getByTestId('logout-btn').click();
    });

    expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('token')).toHaveTextContent('no-token');
    expect(screen.getByTestId('user')).toHaveTextContent('no-user');
  });
});