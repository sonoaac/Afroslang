import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.afroslang.app',
  appName: 'Afroslang',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    // Remove the next line before building for production
    // url: 'http://192.168.x.x:5173',  // uncomment + set your IP for live-reload during dev
    cleartext: false,
  },
  android: {
    allowMixedContent: false,
    backgroundColor: '#000000',
  },
  ios: {
    backgroundColor: '#000000',
    contentInset: 'automatic',
    scrollEnabled: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,  // we handle our own splash
    },
  },
};

export default config;
