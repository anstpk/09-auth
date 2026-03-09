'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession } from '@/lib/api/clientApi';
import { usePathname, useRouter } from 'next/navigation';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, clearIsAuthenticated, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data } = await checkSession();
        if (data) {
          setUser(data);
        } else {
          clearIsAuthenticated();
        }
      } catch (error) {
        clearIsAuthenticated();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [setUser, clearIsAuthenticated]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
        <p>Loading session...</p> 
        {/* Тут може бути твій компонент Loader */}
      </div>
    );
  }

  return <>{children}</>;
}