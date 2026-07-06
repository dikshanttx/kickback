'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function AuthGuard({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setReady(true);
      return;
    }

    try {
      const publicPaths = ['/login', '/', '/_not-found', '/404'];
      const storedUser = localStorage.getItem('resumx-user');

      if (!storedUser && !publicPaths.includes(pathname)) {
        router.replace('/login');
        return;
      }
    } catch (error) {
      console.error('Auth guard error.', error);
    } finally {
      setReady(true);
    }
  }, [pathname, router]);

  return <>{children}</>;
}
