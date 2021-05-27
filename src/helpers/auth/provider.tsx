import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import firebase from '../../services/firebase';
import { AuthUserContext } from './contexts';
import { useAuthPopup } from './hooks';

const AuthProvider: React.FC = ({ children }) => {
  const { isLoading, isSignedIn, uiConfig, authUser } = useAuthPopup();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!isSignedIn) {
    return (
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    );
  }

  return (
    <AuthUserContext.Provider value={authUser}>
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthProvider;
