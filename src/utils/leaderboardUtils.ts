import { doc, setDoc, updateDoc, increment, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { logger } from "./logger";

// League system with 7 tiers
export const LEAGUES = ["Copper", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Stars"] as const;
export type League = typeof LEAGUES[number];

// League colors and icons
export const LEAGUE_CONFIG: Record<League, { color: string; icon: string; gradient: string }> = {
  Copper: { 
    color: "#CD7F32", 
    icon: "🥉", 
    gradient: "from-amber-600 to-orange-500" 
  },
  Bronze: { 
    color: "#CD7F32", 
    icon: "🥉", 
    gradient: "from-amber-500 to-yellow-600" 
  },
  Silver: { 
    color: "#C0C0C0", 
    icon: "🥈", 
    gradient: "from-gray-300 to-gray-400" 
  },
  Gold: { 
    color: "#FFD700", 
    icon: "🥇", 
    gradient: "from-yellow-400 to-yellow-500" 
  },
  Platinum: { 
    color: "#E5E4E2", 
    icon: "💎", 
    gradient: "from-gray-200 to-gray-300" 
  },
  Diamond: { 
    color: "#B9F2FF", 
    icon: "💎", 
    gradient: "from-blue-300 to-cyan-400" 
  },
  Stars: { 
    color: "#FFD700", 
    icon: "⭐", 
    gradient: "from-yellow-300 to-yellow-400" 
  }
};

// Week ID generation
export function getCurrentWeekId(): string {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${weekNumber}`;
}

export function getNextWeekId(): string {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7) + 1;
  return `${now.getFullYear()}-W${weekNumber}`;
}

// Leaderboard entry interface
export interface LeaderboardEntry {
  userId: string;
  username: string;
  xp: number;
  league: League;
  subscribed: boolean;
  multiplier: number;
  rank?: number;
  updatedAt: Date;
}

// Add XP to leaderboard
export async function addWeeklyXP(
  userId: string,
  league: League,
  username: string,
  gainedXP: number,
  isSubscribed: boolean,
  weekId: string
): Promise<void> {
  try {
    const multiplier = isSubscribed ? 1.42 : 1;
    const totalXP = Math.floor(gainedXP * multiplier);

    const ref = doc(db, "leaderboards", weekId, league, userId);

    await setDoc(
      ref,
      {
        userId,
        username,
        xp: increment(totalXP),
        league,
        subscribed: isSubscribed,
        multiplier,
        updatedAt: new Date(),
      },
      { merge: true }
    );
  } catch (error) {
    logger.error("Error adding weekly XP:", error);
    throw error;
  }
}

// Get current week ID from Firestore
export async function getCurrentWeekIdFromDB(): Promise<string> {
  try {
    const weekRef = doc(db, "leaderboards", "currentWeek");
    const weekSnap = await getDoc(weekRef);
    
    if (weekSnap.exists()) {
      return weekSnap.data().weekId;
    } else {
      // Initialize current week if it doesn't exist
      const currentWeek = getCurrentWeekId();
      await setDoc(weekRef, { weekId: currentWeek });
      return currentWeek;
    }
  } catch (error) {
    console.error("Error getting current week ID:", error);
    return getCurrentWeekId();
  }
}

// Get leaderboard for a specific league and week
export async function getLeaderboard(league: League, weekId: string): Promise<LeaderboardEntry[]> {
  try {
    const q = query(
      collection(db, "leaderboards", weekId, league),
      orderBy("xp", "desc")
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc, index) => ({
      ...doc.data(),
      rank: index + 1
    })) as LeaderboardEntry[];
    
    return data;
  } catch (error) {
    console.error("Error getting leaderboard:", error);
    return [];
  }
}

// Get user's current league
export async function getUserLeague(userId: string, weekId: string): Promise<League | null> {
  try {
    for (const league of LEAGUES) {
      const userRef = doc(db, "leaderboards", weekId, league, userId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return league;
      }
    }
    return null;
  } catch (error) {
    console.error("Error getting user league:", error);
    return null;
  }
}

// Get user's leaderboard entry
export async function getUserLeaderboardEntry(userId: string, weekId: string): Promise<LeaderboardEntry | null> {
  try {
    for (const league of LEAGUES) {
      const userRef = doc(db, "leaderboards", weekId, league, userId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const data = userSnap.data() as LeaderboardEntry;
        return data;
      }
    }
    return null;
  } catch (error) {
    console.error("Error getting user leaderboard entry:", error);
    return null;
  }
}

// Weekly reset function (for admin use)
export async function resetWeeklyLeaderboard(): Promise<void> {
  try {
    const leagues = LEAGUES;
    const currentWeek = await getCurrentWeekIdFromDB();
    const nextWeek = getNextWeekId();

    for (const league of leagues) {
      const snapshot = await getDocs(collection(db, "leaderboards", currentWeek, league));
      const users = snapshot.docs.map((d) => ({ id: d.id, league: league as string, ...d.data() }));
      const total = users.length;
      const top = 7;
      const bottom = Math.floor(total * 0.1);

      for (let i = 0; i < users.length; i++) {
        const u = users[i];
        let newLeague = u.league;
        
        // Promotion/demotion logic
        if (i < top && league !== "Stars") {
          const currentIndex = leagues.indexOf(league);
          newLeague = leagues[currentIndex + 1];
        } else if (i >= total - bottom && league !== "Copper") {
          const currentIndex = leagues.indexOf(league);
          newLeague = leagues[currentIndex - 1];
        }

        // Reset XP for new week
        await setDoc(doc(db, "leaderboards", nextWeek, newLeague, u.id), {
          ...u,
          xp: 0,
          league: newLeague,
          updatedAt: new Date(),
        });
      }
    }

    // Update currentWeek document
    await setDoc(doc(db, "leaderboards", "currentWeek"), { weekId: nextWeek });
  } catch (error) {
    console.error("Error resetting weekly leaderboard:", error);
    throw error;
  }
}
