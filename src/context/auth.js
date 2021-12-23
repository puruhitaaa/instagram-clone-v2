import { createContext, useEffect, useState, useContext } from 'react';
import { onIdTokenChanged } from 'firebase/auth';
import nookies from 'nookies';

import { auth } from '../lib/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return onIdTokenChanged(auth, async (user) => {
      setLoading(true);

      if (!user) {
        setUser(null);
        setLoading(false);
        nookies.set(undefined, 'token', '', { path: '/' });
      } else {
        const token = await user.getIdToken();
        setUser(user);
        setLoading(false);
        nookies.set(undefined, 'token', token, { path: '/' });
      }
    });
  }, []);

  // useEffect(() => {
  //   const handle = setInterval(async () => {
  //     const user = auth?.currentUser();
  //     if (user) await user.getIdToken(true);
  //   }, 10 * 60 * 1000);

  //   return () => clearInterval(handle);
  // }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
