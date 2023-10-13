import { useEffect, useState } from 'react';

export function useAdminState() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const type = localStorage.getItem('type');

    if (type === 'admin') {
      setIsAdmin(true);
    } else if (type === 'user') {
      setIsAdmin(false);
    }
  }, []);

  return isAdmin;
}
