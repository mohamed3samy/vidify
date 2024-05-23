import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';

import { getCurrentUser } from '../lib/appwrite';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const res = await getCurrentUser();
      if (res) {
        setIsLogged(true);
        setUser(res);
      } else {
        setIsLogged(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to fetch current user:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchCurrentUser().then(() => {
      if (isMounted) setLoading(false);
    });

    return () => (isMounted = false);
  }, [fetchCurrentUser]);

  const contextValue = useMemo(
    () => ({
      isLogged,
      setIsLogged,
      user,
      setUser,
      loading,
    }),
    [isLogged, user, loading],
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
