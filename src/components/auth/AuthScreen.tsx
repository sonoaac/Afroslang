import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AuthSplit } from './AuthSplit';

export const AuthScreen: React.FC = () => {
  const { setGuestMode } = useAuth();

  const handleGuestMode = () => {
    setGuestMode(true);
  };

  return <AuthSplit onGuestMode={handleGuestMode} />;
};
