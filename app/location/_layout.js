import { Stack } from 'expo-router';

export default function LocationLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="manual" />
      <Stack.Screen name="confirm" />
    </Stack>
  );
}