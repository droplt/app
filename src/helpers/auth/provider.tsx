import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import firebase from '../firebase';
// import { TokenContext, UserContext } from './contexts';
import { useAuthPopup } from './hooks';

const AuthProvider: React.FC = ({ children }) => {
  const {
    isLoading,
    isSignedIn,
    uiConfig,
    // authToken,
    // authUser,
  } = useAuthPopup();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!isSignedIn) {
    return (
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    );
  }

  return (
    <div>{children}</div>
    // <UserContext.Provider value={authUser}>
    //   <TokenContext.Provider value={authToken}>
    //     {children}
    //   </TokenContext.Provider>
    // </UserContext.Provider>
  );
};

export default AuthProvider;
