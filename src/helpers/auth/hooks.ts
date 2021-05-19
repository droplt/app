import * as firebaseui from 'firebaseui';
import { useContext, useEffect, useState } from 'react';

import firebase, { AUTH_PERSISTENCE, AUTH_PROVIDER } from '../firebase';
import { TokenContext, UserContext } from './contexts';
import {
  checkSessionCookie,
  deleteSessionCookie,
  getSessionCookieFromToken,
} from './helpers';

/**
 * Internal hook to handle the login popup
 */
export const useAuthPopup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  // const [authUser, setAuthUser] = useState<Firebase.User | null>(null);
  // const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    setIsLoading(true);

    // Call the server to check authentication state
    checkSessionCookie().then((res) => {
      setIsSignedIn(res);
      setIsLoading(false);
    });

    // As we are using a custom auth token in a `httpOnly` cookie
    // we can turn off the auth persistence.
    firebase.auth().setPersistence(AUTH_PERSISTENCE.NONE);

    // Listen for firebase sign-in / sign-out events
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!!user) {
          const token = await user?.getIdToken();
          const res = await getSessionCookieFromToken(token);
          setIsSignedIn(res);
          setIsLoading(false);
        }
      });
    return () => unregisterAuthObserver();
  }, []);

  const uiConfig: firebaseui.auth.Config = {
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
    // authUser,
    // authToken,
    firebase,
    uiConfig,
  };
};

/**
 * Public hook that expose firebase auth
 */
export const useAuth = () => {
  const user = useContext(UserContext);
  const token = useContext(TokenContext);

  const signOut = async () => {
    await deleteSessionCookie();
    window.location.reload();
  };

  return {
    user,
    token,
    signOut,
  };
};
