import { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../firebase';

export const useAuth = () => {
  const firebase = useContext(FirebaseContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({} || null);

  useEffect(() => {
    setIsLoading(true);
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsLoading(false);
        setUser(user);
        setIsSignedIn(!!user);
      });
    return () => unregisterAuthObserver();
  }, [firebase]);

  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  return {
    isLoading,
    isSignedIn,
    user,
    firebase,
    uiConfig,
  };
};
