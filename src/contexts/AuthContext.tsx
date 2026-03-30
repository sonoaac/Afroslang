import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { UserData, loadUserData, createGuestUser, saveGuestProgress } from '../utils/userData';
import { getCurrentHeartsStatus } from '../utils/heartsTimer';

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  isGuest: boolean;
  loading: boolean;
  logout: () => Promise<void>;
  setUserData: (data: UserData) => void;
  setGuestMode: (isGuest: boolean) => void;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setIsGuest(false);
        
        // Load user data from Firestore
        const data = await loadUserData(user.uid);
        
        // Update hearts based on timer
        if (data && !data.subscription?.active) {
          const heartsStatus = await getCurrentHeartsStatus(user.uid);
          const updatedData = {
            ...data,
            hearts: heartsStatus.currentHearts,
            heartsData: heartsStatus
          };
          setUserData(updatedData);
        } else {
          setUserData(data);
        }
      } else {
        setUser(null);
        setUserData(null);
        setIsGuest(false);
        // Guest mode is not auto-restored on load — users always start from LandingPage
        // and must explicitly click "Try as Guest" each session.
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserData(null);
      setIsGuest(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSetUserData = (data: UserData) => {
    setUserData(data);
    if (isGuest) {
      saveGuestProgress(data);
    }
  };

  const refreshUserData = async () => {
    if (!user) return;
    const data = await loadUserData(user.uid);
    if (!data) return;
    if (!data.subscription?.active) {
      const heartsStatus = await getCurrentHeartsStatus(user.uid);
      setUserData({ ...data, hearts: heartsStatus.currentHearts, heartsData: heartsStatus });
    } else {
      setUserData(data);
    }
  };

  const handleSetGuestMode = (guestMode: boolean) => {
    setIsGuest(guestMode);
    if (guestMode) {
      const guestUser = createGuestUser();
      setUserData(guestUser);
      saveGuestProgress(guestUser);
    } else {
      setUserData(null);
    }
  };

  const value: AuthContextType = {
    user,
    userData,
    isGuest,
    loading,
    logout,
    setUserData: handleSetUserData,
    setGuestMode: handleSetGuestMode,
    refreshUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
