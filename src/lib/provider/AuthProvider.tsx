import React, { ReactChild, useEffect, useState } from 'react';
import { auth } from 'src/firebase';

interface ContextType {
  user : null | firebase.default.User;
  error : null | string;
  loadingAuthState : boolean;
}

export const firebaseAuth = React.createContext<ContextType>({} as ContextType);

interface Props {
  children : ReactChild
}

function AuthProvider({ children } : Props) {
  const [user, setUser] = useState<null | firebase.default.User>(null);
  const [loadingAuthState, setLoadingAuthState] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) setUser(user);
      setLoadingAuthState(false);
    });
  }, []);


  
  return (
    <firebaseAuth.Provider value={{
      user : user,
      error : error,
      loadingAuthState : loadingAuthState
    }}>
      {children}
    </firebaseAuth.Provider>
  );
}
export default AuthProvider;