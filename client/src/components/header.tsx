'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { User, LogOut, Heart } from 'lucide-react';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo and title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg">
              <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                Aisel Health
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                Patient Management System
              </p>
            </div>
          </div>

          {/* User section */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2 sm:gap-4">
              {/* User info - hidden on mobile, shown as dropdown on larger screens */}
              <div className="hidden md:flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user?.username}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>

              {/* Mobile user indicator */}
              <div className="md:hidden flex items-center gap-2 px-2 py-1 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-xs font-medium text-gray-900 capitalize">{user?.role}</span>
              </div>

              <Button 
                variant="outline" 
                onClick={handleLogout}
                size="sm"
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <Button onClick={handleLoginRedirect} size="sm" className="gap-2">
              <User className="w-4 h-4" />
              <span>Login</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}