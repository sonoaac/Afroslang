import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export interface HeartsData {
  currentHearts: number;
  lastResetTime: number; // timestamp
  maxHearts: number;
}

export const HEARTS_REFILL_HOURS = 5; // 1 heart every 5 hours (AfroSlang Plus style)
export const MAX_HEARTS = 5;

// Keep old export alias so existing callers don't break
export const HEARTS_RESET_HOURS = HEARTS_REFILL_HOURS;

/**
 * Calculate how many hearts should be restored based on time elapsed.
 * Returns the number of hearts to ADD (not the new total).
 * 1 heart per 5 hours, up to MAX_HEARTS.
 */
export const calculateHeartsFromTime = (lastResetTime: number, currentTime: number = Date.now()): number => {
  const timeElapsed = currentTime - lastResetTime;
  const hoursElapsed = timeElapsed / (1000 * 60 * 60);
  return Math.min(Math.floor(hoursElapsed / HEARTS_REFILL_HOURS), MAX_HEARTS);
};

/**
 * Get current hearts status for a user
 */
export const getCurrentHeartsStatus = async (userId: string): Promise<HeartsData> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const heartsData = userData.heartsData as HeartsData;
      
      if (heartsData) {
        const currentTime = Date.now();
        const heartsToRestore = calculateHeartsFromTime(heartsData.lastResetTime, currentTime);

        if (heartsToRestore > 0 && heartsData.currentHearts < MAX_HEARTS) {
          // Add hearts incrementally — 1 per 5 hours up to MAX
          const newHearts = Math.min(heartsData.currentHearts + heartsToRestore, MAX_HEARTS);
          const newHeartsData: HeartsData = {
            currentHearts: newHearts,
            lastResetTime: currentTime,
            maxHearts: MAX_HEARTS,
          };

          await updateDoc(userRef, {
            hearts: newHearts,
            heartsData: newHeartsData,
          });

          return newHeartsData;
        }

        return heartsData;
      }
    }
    
    // Initialize hearts data for new users (use setDoc merge so it works even
    // if the user doc doesn't exist yet or was just created)
    const initialHeartsData: HeartsData = {
      currentHearts: MAX_HEARTS,
      lastResetTime: Date.now(),
      maxHearts: MAX_HEARTS
    };

    await setDoc(userRef, {
      hearts: MAX_HEARTS,
      heartsData: initialHeartsData
    }, { merge: true });
    
    return initialHeartsData;
  } catch (error) {
    console.error('Error getting hearts status:', error);
    return {
      currentHearts: MAX_HEARTS,
      lastResetTime: Date.now(),
      maxHearts: MAX_HEARTS
    };
  }
};

/**
 * Update hearts when user loses hearts
 */
export const updateHearts = async (userId: string, heartsLost: number): Promise<HeartsData> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const heartsData = userData.heartsData as HeartsData || {
        currentHearts: MAX_HEARTS,
        lastResetTime: Date.now(),
        maxHearts: MAX_HEARTS
      };
      
      const newHearts = Math.max(0, heartsData.currentHearts - heartsLost);
      
      const updatedHeartsData: HeartsData = {
        ...heartsData,
        currentHearts: newHearts
      };
      
      await updateDoc(userRef, {
        hearts: newHearts,
        heartsData: updatedHeartsData
      });
      
      return updatedHeartsData;
    }
    
    return {
      currentHearts: MAX_HEARTS,
      lastResetTime: Date.now(),
      maxHearts: MAX_HEARTS
    };
  } catch (error) {
    console.error('Error updating hearts:', error);
    return {
      currentHearts: MAX_HEARTS,
      lastResetTime: Date.now(),
      maxHearts: MAX_HEARTS
    };
  }
};

/**
 * Get time (ms) until the NEXT single heart refill.
 * Each heart takes 5 hours. This shows the countdown to +1 heart.
 */
export const getTimeUntilNextReset = (lastResetTime: number): number => {
  const currentTime = Date.now();
  const timeElapsed = currentTime - lastResetTime;
  const hoursElapsed = timeElapsed / (1000 * 60 * 60);
  const heartsAlreadyRestored = Math.floor(hoursElapsed / HEARTS_REFILL_HOURS);
  // Time until the next heart arrives
  const msForNextHeart = ((heartsAlreadyRestored + 1) * HEARTS_REFILL_HOURS * 3_600_000) - timeElapsed;
  return Math.max(0, msForNextHeart);
};

/**
 * Format time remaining for display
 */
export const formatTimeRemaining = (milliseconds: number): string => {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
};

/**
 * Guest mode hearts management
 */
/** Parse and clamp localStorage guest hearts — prevents tampering (e.g. setting currentHearts: 999). */
function parseGuestHeartsData(raw: unknown): HeartsData {
  const now = Date.now();
  const obj = typeof raw === 'object' && raw !== null ? (raw as Record<string, unknown>) : {};
  return {
    currentHearts: Math.min(Math.max(0, Math.floor(Number(obj.currentHearts) || 0)), MAX_HEARTS),
    // Reject future timestamps — that's impossible legitimately and would grant free regen
    lastResetTime: typeof obj.lastResetTime === 'number' && obj.lastResetTime <= now
      ? obj.lastResetTime
      : now,
    maxHearts: MAX_HEARTS,
  };
}

export const getGuestHeartsStatus = (): HeartsData => {
  try {
    const saved = localStorage.getItem('afroslang_guest_hearts');
    if (saved) {
      const heartsData = parseGuestHeartsData(JSON.parse(saved));
      const now = Date.now();
      const heartsToRestore = calculateHeartsFromTime(heartsData.lastResetTime, now);

      if (heartsToRestore > 0 && heartsData.currentHearts < MAX_HEARTS) {
        const newHeartsData: HeartsData = {
          currentHearts: Math.min(heartsData.currentHearts + heartsToRestore, MAX_HEARTS),
          lastResetTime: now,
          maxHearts: MAX_HEARTS,
        };
        localStorage.setItem('afroslang_guest_hearts', JSON.stringify(newHeartsData));
        return newHeartsData;
      }

      // Write back sanitised data in case the stored value was tampered
      localStorage.setItem('afroslang_guest_hearts', JSON.stringify(heartsData));
      return heartsData;
    }
  } catch (error) {
    console.error('Error loading guest hearts:', error);
  }

  const initialHeartsData: HeartsData = {
    currentHearts: MAX_HEARTS,
    lastResetTime: Date.now(),
    maxHearts: MAX_HEARTS,
  };
  localStorage.setItem('afroslang_guest_hearts', JSON.stringify(initialHeartsData));
  return initialHeartsData;
};

export const updateGuestHearts = (heartsLost: number): HeartsData => {
  try {
    const saved = localStorage.getItem('afroslang_guest_hearts');
    const heartsData = saved
      ? parseGuestHeartsData(JSON.parse(saved))
      : { currentHearts: MAX_HEARTS, lastResetTime: Date.now(), maxHearts: MAX_HEARTS };

    const updatedHeartsData: HeartsData = {
      ...heartsData,
      currentHearts: Math.max(0, heartsData.currentHearts - heartsLost),
    };
    localStorage.setItem('afroslang_guest_hearts', JSON.stringify(updatedHeartsData));
    return updatedHeartsData;
  } catch (error) {
    console.error('Error updating guest hearts:', error);
    return { currentHearts: MAX_HEARTS, lastResetTime: Date.now(), maxHearts: MAX_HEARTS };
  }
};

