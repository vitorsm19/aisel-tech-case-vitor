'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold">
        Aisel Health - Patient Management System
      </h1>
      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            <p>Welcome, {user?.username}</p>
            <p className="text-xs">Role: {user?.role}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <Button onClick={handleLoginRedirect}>
          Login
        </Button>
      )}
    </div>
  );
}