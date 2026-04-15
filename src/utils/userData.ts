import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { HeartsData } from "./heartsTimer";

export interface UserData {
  username: string;
  email: string;
  hearts: number;
  heartsData?: HeartsData;
  xp: number;
  // ── Currencies ──────────────────────────────────────────────────────────
  sandbits?: number;    // in-game currency — earned via leaderboard or converted from diamonds
  diamonds?: number;    // premium currency — purchased with real money
  // ── Cosmetics ───────────────────────────────────────────────────────────
  ownedAvatars?: string[];      // list of owned avatar IDs
  ownedBackgrounds?: string[];  // list of owned background IDs
  equippedAvatar?: string;      // currently equipped avatar ID
  equippedBackground?: string;  // currently equipped background ID
  // ── Subscription ────────────────────────────────────────────────────────
  subscription: {
    active: boolean;
    plan: string | null;
    stripeSubId?: string | null;
    renewsAt?: number | null;
    stripeCustomerId?: string | null;
    pastDue?: boolean;
  };
  createdAt: string;
  languages: Record<string, {
    completedLessons: string[];
    xp: number;
    hearts: number;
  }>;
}

export const loadUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const ref = doc(db, "users", uid);
    const snapshot = await getDoc(ref);
    if (snapshot.exists()) {
      return snapshot.data() as UserData;
    }
    return null;
  } catch (error) {
    console.error("Error loading user data:", error);
    return null;
  }
};

export const updateUserData = async (uid: string, data: Partial<UserData>): Promise<void> => {
  try {
    const ref = doc(db, "users", uid);
    await updateDoc(ref, data);
  } catch (error) {
    console.error("Error updating user data:", error);
  }
};

export const saveUserProgress = async (
  uid: string,
  languageId: string,
  lessonId: string,
  xpGained: number,
  heartsLost: number,
): Promise<void> => {
  try {
    const ref = doc(db, "users", uid);
    const snapshot = await getDoc(ref);
    if (snapshot.exists()) {
      const userData = snapshot.data() as UserData;
      const languageProgress = userData.languages[languageId] || {
        completedLessons: [],
        xp: 0,
        hearts: 5,
      };
      if (!languageProgress.completedLessons.includes(lessonId)) {
        languageProgress.completedLessons.push(lessonId);
      }
      languageProgress.xp += xpGained;
      languageProgress.hearts = Math.max(0, languageProgress.hearts - heartsLost);
      await updateDoc(ref, {
        xp: userData.xp + xpGained,
        hearts: Math.max(0, userData.hearts - heartsLost),
        [`languages.${languageId}`]: languageProgress,
      });
    }
  } catch (error) {
    console.error("Error saving user progress:", error);
  }
};

export const createGuestUser = (): UserData => ({
  username: "Guest",
  email: "",
  hearts: 5,
  xp: 0,
  sandbits: 0,
  diamonds: 0,
  ownedAvatars: ['avatar_default'],
  ownedBackgrounds: ['bg_default'],
  equippedAvatar: 'avatar_default',
  equippedBackground: 'bg_default',
  subscription: { active: false, plan: null },
  createdAt: new Date().toISOString(),
  languages: {},
});

export const saveGuestProgress = (progress: UserData): void => {
  localStorage.setItem('afroslang_guest_progress', JSON.stringify(progress));
};

export const loadGuestProgress = (): UserData | null => {
  try {
    const saved = localStorage.getItem('afroslang_guest_progress');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};
