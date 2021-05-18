import Firebase from 'firebase';
import { useContext, useEffect, useState } from 'react';

import firebase, { AUTH_PROVIDER } from '../firebase';
import { TokenContext, UserContext } from './contexts';
import { getSessionCookie } from './helpers';

const TOKEN_KEY = 'token';

/**
 * Public hook that expose firebase auth
 */
export const useAuth = () => {
  const user = useContext(UserContext);
  const token = useContext(TokenContext);

  const signOut = () => {
    localStorage.removeItem(TOKEN_KEY);
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
          // get auth token from auth user
          const token = await user?.getIdToken();

          // save auth token to localStorage
          localStorage.setItem(TOKEN_KEY, token);

          // retrieve session cookie from server
          await getSessionCookie(token);

          // provide auth user to context
          setAuthUser(user);

          // provide auth token to context
          setAuthToken(token);
        }
        setIsSignedIn(!!user);
        setIsLoading(false);
      });

    // remove auth observer on component unmount
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
