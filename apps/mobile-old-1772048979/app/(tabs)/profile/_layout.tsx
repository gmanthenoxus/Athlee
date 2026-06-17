import { Stack } from 'expo-router';

export default function ProfileStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackVisible: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Profile',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          title: 'Edit Profile',
          presentation: 'card',
        }}
      />
    </Stack>
  );
}
