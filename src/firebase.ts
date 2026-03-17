import { initializeApp, getApps } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC9HA38JEoEVOWjGFqMgLmdcsChg7XzwaY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "afroslang.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "afroslang",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "afroslang.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "425906765569",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:425906765569:web:a827daa1060570126d6500",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-N63XE0SYQY"
};

// Debug Firebase configuration
console.log('Firebase Config:', {
  apiKey: firebaseConfig.apiKey ? 'Set' : 'Missing',
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  appId: firebaseConfig.appId ? 'Set' : 'Missing'
});

// Initialize Firebase
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics only in browser and if supported
let analytics;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}
export { analytics };

// Development emulator setup (optional)
if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  try {
    // Only connect to emulators if not already connected
    if (!auth.emulatorConfig) {
      connectAuthEmulator(auth, "http://localhost:9099");
    }
    if (!(db as any)._delegate._databaseId.projectId.includes('demo-')) {
      connectFirestoreEmulator(db, 'localhost', 8080);
    }
  } catch (error) {
    console.log('Firebase emulators not available:', error);
  }
}

export default app;
