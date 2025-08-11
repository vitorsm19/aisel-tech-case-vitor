import { useAuth } from '@/contexts/auth-context';

export interface PermissionsHook {
  isAdmin: boolean;
  isUser: boolean;
  isAuthenticated: boolean;
}

export function usePermissions(): PermissionsHook {
  const { user, isAuthenticated } = useAuth();
  
  const userRole = user?.role?.toLowerCase();
  const isAdmin = isAuthenticated && userRole === 'admin';
  const isUser = isAuthenticated && userRole === 'user';
  
  return {
    isAdmin,
    isUser,
    isAuthenticated,
  };
}