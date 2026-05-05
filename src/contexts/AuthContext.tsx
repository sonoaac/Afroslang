import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
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
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user,     setUser]     = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isGuest,  setIsGuest]  = useState(false);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    // Restore guest session on hard refresh
    if (sessionStorage.getItem(GUEST_SESSION_KEY)) {
      setIsGuest(true);
      setUserData(loadGuestProgress() ?? createGuestUser());
      setLoading(false);
    }

    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session);
    });

    return () => subscription.unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSession = async (session: Session | null) => {
    if (session?.user) {
      setUser(session.user);
      setIsGuest(false);
      setLoading(false);
      initRevenueCat(session.user.id).catch(() => {});

      loadUserData(session.user.id).then(async (data) => {
        if (!data) {
          // Race condition on signup — retry once after 1.5s
          await new Promise(r => setTimeout(r, 1500));
          data = await loadUserData(session.user.id).catch(() => null);
          if (!data) {
            await supabase.auth.signOut();
            return;
          }
        }
        if (!data.subscription?.active) {
          const heartsStatus = await getCurrentHeartsStatus(session.user.id);
          setUserData({ ...data, hearts: heartsStatus.currentHearts, heartsData: heartsStatus });
        } else {
          setUserData(data);
        }
      }).catch(() => {});
    } else {
      setUser(null);
      setUserData(null);
      setLoading(false);
      if (!sessionStorage.getItem(GUEST_SESSION_KEY)) {
        setIsGuest(false);
      }
    }
  };

  const logout = async () => {
    try {
      await resetRevenueCat();
      sessionStorage.removeItem(GUEST_SESSION_KEY);
      await supabase.auth.signOut();
      setUser(null);
      setUserData(null);
      setIsGuest(false);
    } catch (error) {
      logger.error('Error signing out:', error);
    }
  };

  const handleSetUserData = (data: UserData) => {
    setUserData(data);
    if (isGuest) saveGuestProgress(data);
  };

  const refreshUserData = async () => {
    if (!user) return;
    const data = await loadUserData(user.id);
    if (!data) return;
    if (!data.subscription?.active) {
      const heartsStatus = await getCurrentHeartsStatus(user.id);
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
    const update = await equipCosmetic(user.id, itemId, type);
    handleSetUserData({ ...userData, ...update } as UserData);
  };

  return (
    <AuthContext.Provider value={{
      user, userData, isGuest, loading,
      logout,
      setUserData: handleSetUserData,
      setGuestMode: handleSetGuestMode,
      refreshUserData,
      equipItem,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
