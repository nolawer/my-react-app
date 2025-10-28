import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack
        // initialRouteName="tabs"
        screenOptions={{
            headerShown: false,
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
        <Stack.Screen name="browser" options={{ headerShown: true, title: 'Browser' }} />
      </Stack>
    );
  }