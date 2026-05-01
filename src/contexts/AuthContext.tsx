import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { UserData, loadUserData, createGuestUser, saveGuestProgress, loadGuestProgress } from '../utils/userData';
import { getCurrentHeartsStatus } from '../utils/heartsTimer';
import { logger } from '../utils/logger';
import { equipCosmetic } from '../utils/currencyUtils';
import { initRevenueCat, resetRevenueCat } from '../utils/revenueCatUtils';

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  isGuest: boolean;
  loading: boolean;
  logout: () => Promise<void>;
  setUserData: (data: UserData) => void;
  setGuestMode: (isGuest: boolean) => void;
  refreshUserData: () => Promise<void>;
  equipItem: (itemId: string, type: 'avatar' | 'background') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const GUEST_SESSION_KEY = 'afro_guest_session';

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
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser) {
        setIsGuest(false);
        // Init RevenueCat for native platforms (no-op on web)
        initRevenueCat(firebaseUser.uid).catch(() => {});
        // Fetch Firestore data in the background — does NOT block loading screen
        loadUserData(firebaseUser.uid).then(async (data) => {
          if (!data) {
            // No Firestore doc found. Retry once after 1.5 s to handle the
            // signup race condition (setDoc is fire-and-forget in LandingPage).
            await new Promise(r => setTimeout(r, 1500));
            data = await loadUserData(firebaseUser.uid).catch(() => null);
            if (!data) {
              // Still no doc — orphaned Firebase Auth session (account deleted
              // or never fully created). Sign out so the user sees a clean state.
              await signOut(auth);
              return;
            }
          }
          if (!data.subscription?.active) {
            const heartsStatus = await getCurrentHeartsStatus(firebaseUser.uid);
            setUserData({ ...data, hearts: heartsStatus.currentHearts, heartsData: heartsStatus });
          } else {
            setUserData(data);
          }
        }).catch(() => {
          // Firestore unavailable — app still works, userData stays null
        });
      } else {
        setUserData(null);
        // Restore guest session if it was active in this browser tab before
        // the hard refresh — sessionStorage survives refresh but not tab close.
        if (sessionStorage.getItem(GUEST_SESSION_KEY)) {
          setIsGuest(true);
          setUserData(loadGuestProgress() ?? createGuestUser());
        } else {
          setIsGuest(false);
        }
      }
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await resetRevenueCat();
      sessionStorage.removeItem(GUEST_SESSION_KEY);
      await signOut(auth);
      setUser(null);
      setUserData(null);
      setIsGuest(false);
    } catch (error) {
      logger.error('Error signing out:', error);
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
      sessionStorage.setItem(GUEST_SESSION_KEY, '1');
      const guestUser = loadGuestProgress() ?? createGuestUser();
      setUserData(guestUser);
      saveGuestProgress(guestUser);
    } else {
      sessionStorage.removeItem(GUEST_SESSION_KEY);
      setUserData(null);
    }
  };

  const equipItem = async (itemId: string, type: 'avatar' | 'background') => {
    if (!user || !userData) return;
    const update = await equipCosmetic(user.uid, itemId, type);
    handleSetUserData({ ...userData, ...update } as UserData);
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
    equipItem,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
