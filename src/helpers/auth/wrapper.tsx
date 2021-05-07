import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import UserContext from './context';
import { useAuth } from './hooks';

const AuthWrapper: React.FC = ({ children }) => {
  const { user, isLoading, isSignedIn, uiConfig, firebase } = useAuth();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!isSignedIn) {
    return (
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    );
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default AuthWrapper;
