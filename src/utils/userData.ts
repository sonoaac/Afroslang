import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { HeartsData } from "./heartsTimer";

export interface UserData {
  username: string;
  email: string;
  hearts: number;
  heartsData?: HeartsData;
  xp: number;
  gems?: number;
  sandbits?: number;
  xpBoostExpiry?: number; // ms timestamp — 2× XP boost active until this time
  subscription: {
    active: boolean;
    plan: string | null;
    stripeSubId?: string | null;
    renewsAt?: number | null;       // ms timestamp
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
  heartsLost: number
): Promise<void> => {
  try {
    const ref = doc(db, "users", uid);
    const snapshot = await getDoc(ref);
    
    if (snapshot.exists()) {
      const userData = snapshot.data() as UserData;
      const languageProgress = userData.languages[languageId] || {
        completedLessons: [],
        xp: 0,
        hearts: 5
      };

      // Update language progress
      if (!languageProgress.completedLessons.includes(lessonId)) {
        languageProgress.completedLessons.push(lessonId);
      }
      languageProgress.xp += xpGained;
      languageProgress.hearts = Math.max(0, languageProgress.hearts - heartsLost);

      // Update user data
      await updateDoc(ref, {
        xp: userData.xp + xpGained,
        hearts: Math.max(0, userData.hearts - heartsLost),
        [`languages.${languageId}`]: languageProgress
      });
    }
  } catch (error) {
    console.error("Error saving user progress:", error);
  }
};

// Guest mode functions
export const createGuestUser = (): UserData => ({
  username: "Guest",
  email: "",
  hearts: 5,
  xp: 0,
  subscription: { active: false, plan: null },
  createdAt: new Date().toISOString(),
  languages: {}
});

export const saveGuestProgress = (progress: UserData): void => {
  localStorage.setItem('afroslang_guest_progress', JSON.stringify(progress));
};

export const loadGuestProgress = (): UserData | null => {
  try {
    const saved = localStorage.getItem('afroslang_guest_progress');
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("Error loading guest progress:", error);
    return null;
  }
};
