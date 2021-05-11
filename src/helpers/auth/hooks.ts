import Firebase from 'firebase';
import { useContext, useEffect, useState } from 'react';

import firebase, { AUTH_PROVIDER } from '../firebase';
import { TokenContext, UserContext } from './contexts';

/**
 * Public hook that expose firebase auth
 */
export const useAuth = () => {
  const user = useContext(UserContext);
  const token = useContext(TokenContext);

  const signOut = () => {
    return firebase.auth().signOut();
  };

  return {
    user,
    token,
    signOut,
  };
};

/**
 * Internal hook to handle the login popup
 */
export const useAuthPopup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [authUser, setAuthUser] = useState<Firebase.User | null>(null);
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!!user) {
          const token = await user?.getIdToken();
          setAuthUser(user);
          setAuthToken(token);
        }
        setIsSignedIn(!!user);
        setIsLoading(false);
      });
    return () => unregisterAuthObserver();
  }, []);

  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [AUTH_PROVIDER.EMAIL],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  return {
    isLoading,
    isSignedIn,
    authUser,
    authToken,
    firebase,
    uiConfig,
  };
};
