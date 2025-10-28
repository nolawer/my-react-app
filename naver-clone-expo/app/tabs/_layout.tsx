import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs 
    screenOptions={{
        tabBarStyle: {
            backgroundColor: 'black',
            
        },
        tabBarActiveTintColor: 'white', 
         
        headerStyle: {
            backgroundColor: '#f4511e',
            },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            },
        headerTitleAlign: 'center',
        }}>
      <Tabs.Screen
        name="index"
        options={{
        headerShown: false,
        title: 'Home',
        tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
        )
        }}
      />
      <Tabs.Screen
        name="shopping"
        options={{
        headerShown: true,
        title: 'Shopping',
        tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'cart-sharp' : 'cart-outline'} color={color} size={24}/>
          ),
        }}
      />
    </Tabs>
  );
}
