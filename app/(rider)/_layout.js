import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 75, 
          paddingTop: 0,
          paddingBottom: 20
        },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "home") {
            return <Ionicons name="home" size={20} color={color} />;
          } else if (route.name === "profile") {
            return <Ionicons name="person" size={20} color={color} />;
          } else if (route.name === "cart") {
            return <Ionicons name="cart" size={20} color={color} />;
          } else if (route.name === "search") {
            return <Ionicons name="search" size={20} color={color} />;
          } else if (route.name === "support") {
            return (
              <MaterialCommunityIcons name="headset" size={20} color={color} />
            );
          }
        },
        tabBarActiveTintColor: "#1E88E5", // active icon color
        tabBarInactiveTintColor: "#7C7C7C", // inactive icon color
      })}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="cart" />
      <Tabs.Screen name="support" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
