import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootNavigator } from './src/navigation/RootNavigator';
import { useAuthStore } from './src/store/authStore';

export default function App() {
  const { isAuthenticated } = useAuthStore();

  // Initialize auth on app load
  useEffect(() => {
    // Mock auto-login for development
    if (!isAuthenticated) {
      useAuthStore.getState().login('player@athlee.com', 'password');
    }
  }, [isAuthenticated]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootNavigator />
    </GestureHandlerRootView>
  );
}
