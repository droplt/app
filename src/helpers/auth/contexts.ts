import Firebase from 'firebase';
import React from 'react';

export const UserContext = React.createContext<Firebase.User | null>(null);
export const TokenContext = React.createContext('');
