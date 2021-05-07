import React from 'react';

import client from './client';
import FirebaseContext from './context';

const FirebaseWrapper: React.FC = ({ children }) => {
  return (
    <FirebaseContext.Provider value={client}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseWrapper;
